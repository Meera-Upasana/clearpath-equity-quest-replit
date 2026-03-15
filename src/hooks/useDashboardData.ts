import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";

interface CDCStateRow {
  locationabbr: string;
  locationdesc: string;
  value: number;
  year: string;
}

interface CDCResponse {
  data: CDCStateRow[];
  source: "live" | "cache" | "fallback";
}

const HIGH_RISK_DIABETES_THRESHOLD = 14.5;

async function fetchMetric(metric: string): Promise<CDCResponse> {
  const res = await fetch(`/api/cdc-places/states?metric=${metric}`);
  if (!res.ok) throw new Error(`CDC ${metric} fetch failed`);
  return res.json();
}

export function useDashboardData() {
  const results = useQueries({
    queries: [
      {
        queryKey: ["/api/cdc-places/states", "diabetes"],
        queryFn: () => fetchMetric("diabetes"),
        staleTime: 1000 * 60 * 60 * 12,
        retry: 1,
      },
      {
        queryKey: ["/api/cdc-places/states", "obesity"],
        queryFn: () => fetchMetric("obesity"),
        staleTime: 1000 * 60 * 60 * 12,
        retry: 1,
      },
    ],
  });

  const [diabetesQuery, obesityQuery] = results;

  const isLoading = results.some((r) => r.isLoading);
  const source = diabetesQuery.data?.source ?? null;

  const kpis = useMemo(() => {
    const diabetesData = diabetesQuery.data?.data ?? [];
    if (!diabetesData.length) return null;

    const sorted = [...diabetesData].sort((a, b) => b.value - a.value);
    const highRisk = sorted.filter((s) => s.value >= HIGH_RISK_DIABETES_THRESHOLD);
    const avgRate = diabetesData.reduce((sum, s) => sum + s.value, 0) / diabetesData.length;
    const topState = sorted[0];

    return {
      highRiskCount: highRisk.length,
      avgDiabetesRate: avgRate.toFixed(1),
      topStateName: topState?.locationdesc ?? "—",
      topStateRate: topState?.value ?? 0,
    };
  }, [diabetesQuery.data]);

  const barChartData = useMemo(() => {
    const diabetesData = diabetesQuery.data?.data ?? [];
    const obesityData = obesityQuery.data?.data ?? [];

    if (!diabetesData.length) return [];

    const obesityMap = new Map(obesityData.map((d) => [d.locationabbr, d.value]));

    return [...diabetesData]
      .sort((a, b) => b.value - a.value)
      .slice(0, 10)
      .map((d) => ({
        state: d.locationabbr,
        stateName: d.locationdesc,
        diabetes: d.value,
        obesity: obesityMap.get(d.locationabbr) ?? 0,
        tier:
          d.value >= 16 ? "critical" : d.value >= 14.5 ? "high" : "moderate",
      }));
  }, [diabetesQuery.data, obesityQuery.data]);

  const scatterData = useMemo(() => {
    const diabetesData = diabetesQuery.data?.data ?? [];
    const obesityData = obesityQuery.data?.data ?? [];

    if (!diabetesData.length || !obesityData.length) return { highRisk: [], lowerRisk: [] };

    const obesityMap = new Map(obesityData.map((d) => [d.locationabbr, d.value]));

    const points = diabetesData
      .filter((d) => obesityMap.has(d.locationabbr))
      .map((d) => ({
        x: d.value,
        y: obesityMap.get(d.locationabbr)!,
        state: d.locationabbr,
        stateName: d.locationdesc,
      }));

    return {
      highRisk: points.filter((p) => p.x >= HIGH_RISK_DIABETES_THRESHOLD),
      lowerRisk: points.filter((p) => p.x < HIGH_RISK_DIABETES_THRESHOLD),
    };
  }, [diabetesQuery.data, obesityQuery.data]);

  const activityLog = useMemo(() => {
    const entries: string[] = [];
    const now = new Date();
    const fmt = (offsetMs: number) => {
      const d = new Date(now.getTime() - offsetMs);
      return d.toTimeString().slice(0, 8);
    };

    const diabetesData = diabetesQuery.data?.data ?? [];
    const obesityData = obesityQuery.data?.data ?? [];
    const src = diabetesQuery.data?.source;

    if (diabetesData.length) {
      entries.push(
        `[${fmt(8000)}] CDC PLACES API → ${diabetesData.length} states ingested. Diabetes prevalence data loaded (${diabetesQuery.data?.data[0]?.year ?? "2023"}).`
      );
    }
    if (obesityData.length) {
      entries.push(
        `[${fmt(6000)}] CDC PLACES API → Obesity metric loaded. ${obesityData.length} state records.`
      );
    }
    if (kpis) {
      entries.push(
        `[${fmt(4000)}] Risk threshold applied (≥${HIGH_RISK_DIABETES_THRESHOLD}% diabetes). ${kpis.highRiskCount} high-risk states identified.`
      );
      entries.push(
        `[${fmt(2500)}] National average diabetes rate: ${kpis.avgDiabetesRate}%. Highest: ${kpis.topStateName} at ${kpis.topStateRate}%.`
      );
    }
    if (src === "live") {
      entries.push(`[${fmt(1000)}] Live data confirmed. Choropleth and dashboard updated.`);
    } else if (src === "fallback") {
      entries.push(`[${fmt(1000)}] Live CDC API unreachable — serving cached static dataset.`);
    }

    return entries;
  }, [diabetesQuery.data, obesityQuery.data, kpis]);

  return { isLoading, kpis, barChartData, scatterData, activityLog, source };
}
