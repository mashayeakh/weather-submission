import { Request, Response } from "express";
import { CITIES } from "../../../cities";
import { ApiErrorShape } from "../../../types";
import { fetchWeather } from "./weather.service";


// GET /api/cities
export async function getCities(_req: Request, res: Response): Promise<void> {
  res.json({ cities: CITIES });
}

// GET /api/weather/:cityId
export async function getCityWeather(req: Request, res: Response): Promise<void> {
  const city = CITIES.find((c) => c.id === req.params.cityId);

  if (!city) {
    res.status(404).json({ code: "CITY_NOT_FOUND", message: "Unknown city id" });
    return;
  }

  try {
    const data = await fetchWeather(city.lat, city.lon);
    res.json({ city, weather: data });
  } catch (error) {
    const shape = (error as Error & { shape?: ApiErrorShape }).shape;
    if (shape) {
      res.status(shape.status).json({ code: shape.code, message: shape.message });
      return;
    }
    res.status(500).json({ code: "INTERNAL_ERROR", message: "Something went wrong fetching weather data" });
  }
}

// GET /api/weather
export async function getAllWeather(_req: Request, res: Response): Promise<void> {
  const results = await Promise.allSettled(
    CITIES.map(async (city) => {
      const data = await fetchWeather(city.lat, city.lon);
      return { city, weather: data };
    })
  );

  const fulfilled = results
    .filter((r): r is PromiseFulfilledResult<{ city: typeof CITIES[number]; weather: any }> =>
      r.status === "fulfilled"
    )
    .map((r) => r.value);

  const failed = results.filter((r) => r.status === "rejected").length;

  if (fulfilled.length === 0 && failed > 0) {
    res.status(502).json({
      code: "UPSTREAM_ERROR",
      message: "Unable to fetch weather data for any city",
      failedCount: failed,
    });
    return;
  }

  res.json({ results: fulfilled, failedCount: failed });
}
