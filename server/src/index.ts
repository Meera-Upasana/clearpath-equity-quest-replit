import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import path from "path";
import fs from "fs";
import cdcRoutes from "./routes/cdc";
import hrsaRoutes from "./routes/hrsa";
import usaspendingRoutes from "./routes/usaspending";
import competitiveRoutes from "./routes/competitive";
import grantRoutes from "./routes/grants";
import healthRoutes from "./routes/health";

const app = express();
const PORT = process.env.PORT || 3001;
const IS_PRODUCTION = process.env.NODE_ENV === "production";

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", limiter);

app.get("/ping", (_req, res) => {
  res.json({ status: "ok", ts: Date.now() });
});

app.use("/api/cdc-places", cdcRoutes);
app.use("/api/hrsa", hrsaRoutes);
app.use("/api/usaspending", usaspendingRoutes);
app.use("/api/competitive-intelligence", competitiveRoutes);
app.use("/api/grant-proposal", grantRoutes);
app.use("/api/health", healthRoutes);

if (IS_PRODUCTION) {
  const frontendDist = path.join(__dirname, "../../dist");
  if (fs.existsSync(frontendDist)) {
    app.use(express.static(frontendDist));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(frontendDist, "index.html"));
    });
  }
}

app.listen(PORT, () => {
  console.log(`[server] ClearPath Health API running on port ${PORT}`);
});

export default app;
