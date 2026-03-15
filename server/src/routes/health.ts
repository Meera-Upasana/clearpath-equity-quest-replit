import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/", async (_req, res) => {
  const start = Date.now();

  const check = async (url: string, method: "get" | "post" = "get", body?: any) => {
    const t0 = Date.now();
    try {
      if (method === "post") {
        await axios.post(url, body, { timeout: 8000 });
      } else {
        await axios.get(url, { timeout: 8000 });
      }
      return { status: "ok" as const, ms: Date.now() - t0 };
    } catch {
      return { status: "error" as const, ms: Date.now() - t0 };
    }
  };

  const hfKeyExists = !!process.env.HF_TOKEN;

  const [cdc, hrsa, usaspending] = await Promise.all([
    check("https://chronicdata.cdc.gov/resource/swc5-untb.json?$limit=1"),
    check("https://data.hrsa.gov/api/download?fileNm=FQHC_SITES&fileType=json"),
    check("https://api.usaspending.gov/api/v2/agency/012/"),
  ]);

  return res.json({
    cdc: cdc.status,
    cdc_ms: cdc.ms,
    hrsa: hrsa.status,
    hrsa_ms: hrsa.ms,
    usaspending: usaspending.status,
    usaspending_ms: usaspending.ms,
    anthropic: hfKeyExists ? "ok" : "error",
    anthropic_ms: 0,
    timestamp: new Date().toISOString(),
    total_ms: Date.now() - start,
  });
});

export default router;
