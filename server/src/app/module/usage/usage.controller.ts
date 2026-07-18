import { Request, Response } from "express";
import { fetchUsage } from "./usage.service";

export async function getUsage(_req: Request, res: Response): Promise<void> {
  if (!process.env.WEATHER_AI_KEY) {
    res.status(500).json({ code: "MISSING_API_KEY", message: "Weather AI API key is not configured" });
    return;
  }

  try {
    const data = await fetchUsage();
    res.json(data);
  } catch (error) {
    const err = error as Error & { status?: number };

    if (err.message === "MISSING_API_KEY") {
      res.status(500).json({ code: "MISSING_API_KEY", message: "Weather AI API key is not configured" });
      return;
    }

    if (err.status) {
      res.status(err.status).json({ code: "UPSTREAM_ERROR", message: "Could not fetch usage data" });
      return;
    }

    res.status(500).json({ code: "INTERNAL_ERROR", message: "Something went wrong fetching usage data" });
  }
}
