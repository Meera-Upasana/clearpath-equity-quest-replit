import { Router } from "express";
import axios from "axios";
import { fetchGrantsForZip } from "./usaspending";
import { getNearestZips, zipCentroids } from "../zipCentroids";

const router = Router();

const SERVER_URL = `http://localhost:${process.env.PORT || 3001}`;
const HF_API_URL = `https://api-inference.huggingface.co/models/${process.env.HF_MODEL || "mistralai/Mistral-7B-Instruct-v0.3"}`;

function validateZip(zip: string): boolean {
  return /^\d{5}$/.test(zip);
}

async function getHrsaCoverage(zip: string) {
  try {
    const { data } = await axios.get(`${SERVER_URL}/api/hrsa/coverage-summary/${zip}`, { timeout: 20000 });
    return data;
  } catch {
    return { zip, fqhc_count: null, nearest_fqhc_miles: null, coverage_tier: "unknown" };
  }
}

function getComparisonZips(targetZip: string): string[] {
  const nearest = getNearestZips(targetZip, 3);
  if (nearest.length >= 3) return nearest;

  const targetState = zipCentroids[targetZip]?.state;
  const sameState = targetState
    ? Object.entries(zipCentroids)
        .filter(([z, c]) => z !== targetZip && c.state === targetState)
        .map(([z]) => z)
    : [];

  const combined = [...new Set([...nearest, ...sameState])];
  if (combined.length >= 3) return combined.slice(0, 3);

  const targetNum = parseInt(targetZip, 10);
  const byProximity = Object.keys(zipCentroids)
    .filter((z) => z !== targetZip && !combined.includes(z))
    .sort((a, b) => Math.abs(parseInt(a, 10) - targetNum) - Math.abs(parseInt(b, 10) - targetNum));

  return [...new Set([...combined, ...byProximity])].slice(0, 3);
}

async function getCDCStateMetrics(targetZip: string) {
  const centroid = zipCentroids[targetZip];
  if (!centroid) return null;
  const { state } = centroid;
  try {
    const [diabetesRes, obesityRes] = await Promise.all([
      axios.get(`${SERVER_URL}/api/cdc-places/states?metric=diabetes`, { timeout: 10000 }),
      axios.get(`${SERVER_URL}/api/cdc-places/states?metric=obesity`, { timeout: 10000 }),
    ]);
    const diabetesEntry = (diabetesRes.data.data as any[])?.find((d) => d.locationabbr === state);
    const obesityEntry = (obesityRes.data.data as any[])?.find((d) => d.locationabbr === state);
    return {
      state,
      state_name: diabetesEntry?.locationdesc || state,
      diabetes_rate: diabetesEntry?.value ?? null,
      obesity_rate: obesityEntry?.value ?? null,
    };
  } catch {
    return null;
  }
}

function buildFallbackInsights(
  targetZip: string,
  targetHrsa: any,
  targetFunding: any,
  cdcState: any,
  recommendationTier: string
) {
  const fqhcCount = targetHrsa?.fqhc_count ?? "unknown";
  const coverageTier = targetHrsa?.coverage_tier ?? "unknown";
  const nearestMiles = targetHrsa?.nearest_fqhc_miles != null
    ? `${Math.round(targetHrsa.nearest_fqhc_miles * 10) / 10} miles`
    : "unknown distance";
  const fundingAmount = (targetFunding?.total_amount || 0).toLocaleString();
  const stateContext = cdcState
    ? ` ${cdcState.state_name} has a ${cdcState.diabetes_rate}% diabetes rate and ${cdcState.obesity_rate}% obesity rate.`
    : "";

  return {
    fqhc_insight: `ZIP ${targetZip} has ${fqhcCount} FQHCs within 10 miles (nearest: ${nearestMiles}), classified as "${coverageTier}" coverage.${stateContext}`,
    grants_insight: `Federal healthcare funding for ZIP ${targetZip} totals $${fundingAmount} over the past 24 months via USAspending.gov. ${
      !targetFunding?.total_amount
        ? "No active awards detected — this area may qualify for first-time HRSA funding."
        : "Existing awards indicate prior federal recognition of community health needs."
    }`,
    recommendation: `ZIP ${targetZip} is rated ${recommendationTier.replace("_", " ").toUpperCase()}. ${
      recommendationTier === "priority_1"
        ? "Immediate action recommended: apply for HRSA Community Health Centers Fund given confirmed healthcare desert status and zero federal funding."
        : recommendationTier === "priority_2"
        ? "Moderate priority: prepare grant application targeting coverage or funding gaps identified in this area."
        : "Coverage appears adequate. Continue monitoring for shifts in FQHC availability or federal funding patterns."
    }`,
  };
}

async function generateIntelInsights(
  targetZip: string,
  targetHrsa: any,
  targetFunding: any,
  cdcState: any,
  compHrsa: any[],
  compFunding: any[],
  recommendationTier: string
): Promise<{ fqhc_insight: string; grants_insight: string; recommendation: string }> {
  const hfToken = process.env.HF_TOKEN;
  if (!hfToken) {
    return buildFallbackInsights(targetZip, targetHrsa, targetFunding, cdcState, recommendationTier);
  }

  const compSummary = compHrsa.map((h, i) => {
    const f = compFunding[i];
    return `ZIP ${h.zip}: ${h.fqhc_count ?? "unknown"} FQHCs (${h.coverage_tier}), $${(f?.total_amount || 0).toLocaleString()} in federal awards`;
  }).join("; ");

  const prompt = `<s>[INST] You are a healthcare equity analyst for a community health intelligence platform. Based on the live data below, generate exactly 3 analytical insights as a JSON object. Each insight must be 1–2 sentences, specific, data-driven, and actionable. Do NOT add any explanation, markdown, or text outside the JSON.

TARGET ZIP: ${targetZip}${cdcState ? ` (${cdcState.state_name})` : ""}

HRSA FQHC COVERAGE:
- FQHCs within 10 miles: ${targetHrsa?.fqhc_count ?? "unknown"}
- Nearest FQHC: ${targetHrsa?.nearest_fqhc_miles != null ? `${Math.round(targetHrsa.nearest_fqhc_miles * 10) / 10} miles` : "unknown"}
- Coverage tier: ${targetHrsa?.coverage_tier ?? "unknown"}

FEDERAL FUNDING (past 24 months, USAspending.gov):
- Total awarded: $${(targetFunding?.total_amount || 0).toLocaleString()}
- Total awards: ${targetFunding?.total_awards ?? 0}

CDC STATE METRICS${cdcState ? ` (${cdcState.state_name})` : ""}:
- Diabetes prevalence: ${cdcState?.diabetes_rate ?? "unavailable"}%
- Obesity prevalence: ${cdcState?.obesity_rate ?? "unavailable"}%

COMPARISON ZIPS: ${compSummary || "none available"}

RECOMMENDATION TIER: ${recommendationTier}

Respond ONLY with this JSON (no other text, no markdown):
{"fqhc_insight":"...","grants_insight":"...","recommendation":"..."} [/INST]`;

  try {
    const hfResponse = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${hfToken}`,
        "Content-Type": "application/json",
        "X-Wait-For-Model": "true",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 400,
          temperature: 0.3,
          top_p: 0.9,
          do_sample: true,
          return_full_text: false,
        },
        stream: false,
      }),
    });

    if (!hfResponse.ok) {
      throw new Error(`HF API error ${hfResponse.status}`);
    }

    const result = await hfResponse.json() as any;
    const generatedText: string = Array.isArray(result)
      ? (result[0]?.generated_text ?? "")
      : (result?.generated_text ?? "");

    const jsonMatch = generatedText.match(/\{[\s\S]*"fqhc_insight"[\s\S]*"grants_insight"[\s\S]*"recommendation"[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No valid JSON in LLM response");

    const parsed = JSON.parse(jsonMatch[0]);
    if (!parsed.fqhc_insight || !parsed.grants_insight || !parsed.recommendation) {
      throw new Error("Incomplete JSON fields");
    }

    return {
      fqhc_insight: parsed.fqhc_insight.trim(),
      grants_insight: parsed.grants_insight.trim(),
      recommendation: parsed.recommendation.trim(),
    };
  } catch (err) {
    console.warn("[Competitive] LLM insight generation failed, using fallback:", (err as Error).message);
    return buildFallbackInsights(targetZip, targetHrsa, targetFunding, cdcState, recommendationTier);
  }
}

router.post("/analyze", async (req, res) => {
  const { target_zip, comparison_zips } = req.body as {
    target_zip: string;
    comparison_zips?: string[];
  };

  if (!validateZip(target_zip)) {
    return res.status(400).json({ error: "Invalid target ZIP code" });
  }

  const providedComps = (comparison_zips || []).filter(validateZip).slice(0, 5);
  const resolvedComps = providedComps.length > 0 ? providedComps : getComparisonZips(target_zip);

  try {
    const allZips = [target_zip, ...resolvedComps];

    const [hrsaResults, fundingResults, cdcState] = await Promise.all([
      Promise.all(allZips.map(getHrsaCoverage)),
      Promise.all(
        allZips.map((zip) =>
          fetchGrantsForZip(zip).catch(() => ({
            zip,
            total_awards: null,
            total_amount: null,
            top_recipients: [],
          }))
        )
      ),
      getCDCStateMetrics(target_zip),
    ]);

    const targetHrsa = hrsaResults[0];
    const targetFunding = fundingResults[0];

    const fqhcGaps = hrsaResults
      .filter((h) => h.coverage_tier === "desert" || h.coverage_tier === "limited")
      .map((h) => `ZIP ${h.zip}: ${h.fqhc_count ?? "unknown"} FQHCs (${h.coverage_tier})`);

    const fundingGaps = fundingResults
      .filter((f) => !f.total_amount || f.total_amount === 0)
      .map((f) => `ZIP ${f.zip}: $0 awarded in past 24 months`);

    const isDesert = targetHrsa.coverage_tier === "desert";
    const hasNoFunding = !targetFunding.total_amount || targetFunding.total_amount === 0;

    const cdcContext =
      cdcState?.diabetes_rate != null
        ? `${cdcState.state_name} state diabetes rate: ${cdcState.diabetes_rate}% · obesity: ${cdcState.obesity_rate ?? "N/A"}% (CDC PLACES 2023)`
        : null;

    let recommendationTier: string;
    let reasoning: string[];

    if (isDesert && hasNoFunding) {
      recommendationTier = "priority_1";
      reasoning = [
        `ZIP ${target_zip} is a confirmed healthcare desert with no FQHCs within 10 miles`,
        `Zero federal healthcare funding awarded in the past 24 months`,
        `Nearest FQHC is ${targetHrsa.nearest_fqhc_miles != null ? `${Math.round(targetHrsa.nearest_fqhc_miles * 10) / 10} miles` : "unknown distance"} away`,
        ...(cdcContext ? [cdcContext] : []),
        "Immediate grant application recommended: HRSA Community Health Centers Fund",
      ];
    } else if (isDesert || hasNoFunding) {
      recommendationTier = "priority_2";
      reasoning = [
        `ZIP ${target_zip} shows ${isDesert ? "limited FQHC coverage" : "funding gaps"} relative to comparison ZIPs`,
        `FQHC count: ${targetHrsa.fqhc_count ?? "unknown"} within 10-mile radius`,
        `Federal funding (24mo): $${(targetFunding.total_amount || 0).toLocaleString()}`,
        ...(cdcContext ? [cdcContext] : []),
        "Moderate priority — recommend monitoring and preparing grant application",
      ];
    } else {
      recommendationTier = "monitor";
      reasoning = [
        `ZIP ${target_zip} has adequate coverage relative to comparison ZIPs`,
        `${targetHrsa.fqhc_count} FQHCs within 10 miles`,
        `$${(targetFunding.total_amount || 0).toLocaleString()} in federal healthcare awards (24mo)`,
        ...(cdcContext ? [cdcContext] : []),
        "Continue monitoring for changes in coverage or funding patterns",
      ];
    }

    const compFundingArr = fundingResults.slice(1).sort((a, b) => (b.total_amount || 0) - (a.total_amount || 0));
    const winnerZip =
      compFundingArr.length > 0 && (compFundingArr[0].total_amount || 0) > (targetFunding.total_amount || 0)
        ? compFundingArr[0].zip
        : target_zip;

    const intelInsights = await generateIntelInsights(
      target_zip,
      targetHrsa,
      targetFunding,
      cdcState,
      hrsaResults.slice(1),
      fundingResults.slice(1),
      recommendationTier
    );

    return res.json({
      target_zip,
      comparison_zips: resolvedComps,
      winner_zip: winnerZip,
      reasoning_factors: reasoning,
      fqhc_gaps: fqhcGaps,
      funding_gaps: fundingGaps,
      recommendation_tier: recommendationTier,
      hrsa_data: Object.fromEntries(hrsaResults.map((h) => [h.zip, h])),
      funding_data: Object.fromEntries(fundingResults.map((f) => [f.zip, f])),
      cdc_state_data: cdcState,
      intel_insights: intelInsights,
    });
  } catch (err) {
    console.error("[Competitive] Analysis error:", err);
    return res.status(500).json({ error: "Analysis failed", details: (err as Error).message });
  }
});

export default router;
