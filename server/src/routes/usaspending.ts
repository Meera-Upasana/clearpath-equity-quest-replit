import { Router } from "express";
import axios from "axios";
import NodeCache from "node-cache";

const router = Router();
const TTL = parseInt(process.env.USASPENDING_CACHE_TTL_HOURS || "6") * 3600;
const cache = new NodeCache({ stdTTL: TTL });

function validateZip(zip: string): boolean {
  return /^\d{5}$/.test(zip);
}

async function fetchGrantsForZip(zipcode: string) {
  const cacheKey = `usaspending_${zipcode}`;
  const cached = cache.get<any>(cacheKey);
  if (cached) return cached;

  const body = {
    scope: "place_of_performance",
    geo_layer: "zip",
    filters: {
      keywords: ["healthcare", "mobile clinic", "diabetes", "chronic disease"],
      time_period: [{ start_date: "2022-01-01", end_date: "2024-12-31" }],
      place_of_performance_locations: [{ country: "USA", zip: zipcode }],
    },
  };

  const { data } = await axios.post(
    "https://api.usaspending.gov/api/v2/search/spending_by_geography/",
    body,
    { timeout: 20000 }
  );

  const results = data.results || [];
  const zipResult = results.find((r: any) => r.shape_code === zipcode) || results[0];

  const totalAmount = zipResult?.aggregated_amount || 0;
  const totalAwards = zipResult?.display_name ? 1 : 0;

  const result = {
    zip: zipcode,
    total_awards: totalAwards,
    total_amount: totalAmount,
    top_recipients: [],
    source: "live",
  };

  cache.set(cacheKey, result);
  return result;
}

router.get("/grants/:zipcode", async (req, res) => {
  const { zipcode } = req.params;
  if (!validateZip(zipcode)) return res.status(400).json({ error: "Invalid ZIP code" });

  try {
    const result = await fetchGrantsForZip(zipcode);
    return res.json(result);
  } catch (err) {
    console.warn("[USAspending] API error:", (err as Error).message);
    return res.json({
      zip: zipcode,
      total_awards: null,
      total_amount: null,
      top_recipients: [],
      source: "unavailable",
      message: "Funding data unavailable",
    });
  }
});

router.post("/compare", async (req, res) => {
  const { zipcodes } = req.body as { zipcodes: string[] };
  if (!Array.isArray(zipcodes) || zipcodes.some((z) => !validateZip(z))) {
    return res.status(400).json({ error: "Invalid ZIP codes array" });
  }

  try {
    const results = await Promise.all(
      zipcodes.map((zip) => fetchGrantsForZip(zip).catch(() => ({
        zip,
        total_awards: null,
        total_amount: null,
        top_recipients: [],
        source: "unavailable",
      })))
    );
    results.sort((a, b) => (b.total_amount || 0) - (a.total_amount || 0));
    return res.json(results);
  } catch (err) {
    return res.status(500).json({ error: "Comparison failed" });
  }
});

export { fetchGrantsForZip };
export default router;
