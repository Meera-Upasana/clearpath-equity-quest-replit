import { Router } from "express";
import axios from "axios";
import NodeCache from "node-cache";
import { zipCentroids, haversineDistance } from "../zipCentroids";

const router = Router();
const TTL = parseInt(process.env.HRSA_CACHE_TTL_HOURS || "12") * 3600;
const cache = new NodeCache({ stdTTL: TTL });

function validateZip(zip: string): boolean {
  return /^\d{5}$/.test(zip);
}

router.get("/fqhcs/:zipcode", async (req, res) => {
  const { zipcode } = req.params;
  if (!validateZip(zipcode)) return res.status(400).json({ error: "Invalid ZIP code" });

  const cacheKey = `hrsa_fqhcs_${zipcode}`;
  const cached = cache.get(cacheKey);
  if (cached) return res.json({ data: cached, source: "cache" });

  const centroid = zipCentroids[zipcode];

  try {
    const { data } = await axios.get(
      "https://data.hrsa.gov/api/download?fileNm=FQHC_SITES&fileType=json",
      { timeout: 15000 }
    );

    const sites = Array.isArray(data) ? data : data.data || [];
    const nearby = sites
      .filter((s: any) => {
        if (!centroid || !s.Geocodable_Latitude || !s.Geocodable_Longitude) return true;
        const dist = haversineDistance(
          centroid.lat,
          centroid.lng,
          parseFloat(s.Geocodable_Latitude),
          parseFloat(s.Geocodable_Longitude)
        );
        return dist <= 10;
      })
      .map((s: any) => ({
        site_name: s.Site_Name || s.Health_Center_Name,
        address: s.Site_Address,
        city: s.Site_City,
        state: s.Site_State_Abbreviation,
        zip: s.Site_Postal_Code,
        lat: parseFloat(s.Geocodable_Latitude) || null,
        lng: parseFloat(s.Geocodable_Longitude) || null,
        health_center_type: s.Health_Center_Type,
      }));

    cache.set(cacheKey, nearby);
    return res.json({ data: nearby, source: "live" });
  } catch (err) {
    console.warn("[HRSA] API unavailable:", (err as Error).message);
    return res.json({ data: null, source: "unavailable", message: "Live data unavailable" });
  }
});

router.get("/coverage-summary/:zipcode", async (req, res) => {
  const { zipcode } = req.params;
  if (!validateZip(zipcode)) return res.status(400).json({ error: "Invalid ZIP code" });

  const cacheKey = `hrsa_coverage_${zipcode}`;
  const cached = cache.get(cacheKey);
  if (cached) return res.json(cached);

  const centroid = zipCentroids[zipcode];

  try {
    const { data } = await axios.get(
      "https://data.hrsa.gov/api/download?fileNm=FQHC_SITES&fileType=json",
      { timeout: 15000 }
    );

    const sites = Array.isArray(data) ? data : data.data || [];

    let fqhcCount = 0;
    let nearestMiles = Infinity;

    for (const s of sites) {
      if (!centroid || !s.Geocodable_Latitude || !s.Geocodable_Longitude) {
        fqhcCount++;
        continue;
      }
      const dist = haversineDistance(
        centroid.lat,
        centroid.lng,
        parseFloat(s.Geocodable_Latitude),
        parseFloat(s.Geocodable_Longitude)
      );
      if (dist < nearestMiles) nearestMiles = dist;
      if (dist <= 10) fqhcCount++;
    }

    const coverage_tier =
      fqhcCount === 0 ? "desert" : fqhcCount <= 2 ? "limited" : "adequate";

    const result = {
      zip: zipcode,
      fqhc_count: fqhcCount,
      nearest_fqhc_miles: nearestMiles === Infinity ? null : Math.round(nearestMiles * 10) / 10,
      coverage_tier,
    };

    cache.set(cacheKey, result);
    return res.json(result);
  } catch (err) {
    console.warn("[HRSA] Coverage summary unavailable:", (err as Error).message);
    return res.json({
      zip: zipcode,
      fqhc_count: null,
      nearest_fqhc_miles: null,
      coverage_tier: "unknown",
      message: "Live data unavailable",
    });
  }
});

export default router;
