import { Router } from "express";
import axios from "axios";
import NodeCache from "node-cache";
import { cdcStaticData, staticByMetric } from "../fallback/cdc-static";

const router = Router();
const TTL = parseInt(process.env.CDC_CACHE_TTL_HOURS || "24") * 3600;
const cache = new NodeCache({ stdTTL: TTL });

const CDC_BASE = "https://chronicdata.cdc.gov/resource/swc5-untb.json";

const measureIdMap: Record<string, string> = {
  diabetes: "DIABETES",
  obesity: "OBESITY",
  smoking: "CSMOKING",
  hypertension: "BPHIGH",
  mentalHealth: "MHLTH",
  noCheckup: "CHECKUP",
};

router.get("/states", async (req, res) => {
  const metric = (req.query.metric as string) || "diabetes";
  const cacheKey = `cdc_states_${metric}`;
  const cached = cache.get(cacheKey);
  if (cached) return res.json({ data: cached, source: "cache" });

  const measureId = measureIdMap[metric];
  if (!measureId) {
    return res.json({ data: buildFallback(metric), source: "fallback" });
  }

  try {
    const { data } = await axios.get(CDC_BASE, {
      params: {
        $select: "stateabbr,statedesc,avg(data_value) as avg_val",
        $where: `measureid='${measureId}' AND datavaluetypeid='CrdPrv'`,
        $group: "stateabbr,statedesc",
        $limit: 60,
      },
      timeout: 12000,
    });

    const result = (data as any[])
      .filter((r) => r.avg_val != null && r.stateabbr)
      .map((r) => ({
        locationabbr: r.stateabbr,
        locationdesc: r.statedesc,
        value: Math.round(parseFloat(r.avg_val) * 10) / 10,
        year: "2023",
      }));

    if (result.length < 30) throw new Error(`Insufficient CDC data: only ${result.length} states`);

    cache.set(cacheKey, result);
    return res.json({ data: result, source: "live" });
  } catch (err) {
    console.warn("[CDC] Falling back to static data:", (err as Error).message);
    return res.json({ data: buildFallback(metric), source: "fallback" });
  }
});

function buildFallback(metric: string) {
  const byState = staticByMetric[metric] || staticByMetric.diabetes;
  return Object.entries(byState).map(([abbr, value]) => ({
    locationabbr: abbr,
    locationdesc: cdcStaticData.find((d) => d.locationabbr === abbr)?.locationdesc || abbr,
    value,
    year: "2023",
  }));
}

export default router;
