import express, { Application, Request, Response } from "express";
import cors from "cors";
import weatherRoutes from "./app/module/weather/weather.routes";
import usageRoutes from "./app/module/usage/usage.routes";

export function createApp(): Application {
  const app = express();

  const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3000";

  // ─── Middleware ─────────────────────────────────────────────────────────────
  app.use(cors({ origin: CLIENT_ORIGIN }));
  app.use(express.json());

  // ─── Health check ───────────────────────────────────────────────────────────
  app.get("/health", (_req: Request, res: Response) => {
    res.json({ status: "ok" });
  });

  // ─── API routes ─────────────────────────────────────────────────────────────
  app.use("/api", weatherRoutes);
  app.use("/api", usageRoutes);

  // ─── 404 fallback ───────────────────────────────────────────────────────────
  app.use((_req: Request, res: Response) => {
    res.status(404).json({ code: "NOT_FOUND", message: "Route not found" });
  });

  return app;
}
