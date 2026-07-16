import { ApiErrorShape, WeatherAiError } from "../types";

// ─── Lookup tables ────────────────────────────────────────────────────────────

export const WEATHER_CODE_LABELS: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  80: "Slight showers",
  81: "Moderate showers",
  82: "Violent showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm + hail",
  99: "Thunderstorm + heavy hail",
};

export const WEATHER_CODE_ICONS: Record<number, string> = {
  0: "sunny",
  1: "sunny",
  2: "partly_cloudy",
  3: "cloudy",
  45: "foggy",
  48: "foggy",
  51: "rainy_light",
  53: "rainy",
  55: "rainy",
  61: "rainy_light",
  63: "rainy",
  65: "rainy_heavy",
  66: "rainy_heavy",
  67: "rainy_heavy",
  71: "snowy_light",
  73: "snowy",
  75: "snowy_heavy",
  80: "rainy",
  81: "rainy",
  82: "rainy_heavy",
  85: "snowy",
  86: "snowy_heavy",
  95: "thunderstorm",
  96: "thunderstorm",
  99: "thunderstorm",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getCondition(weathercode: number | undefined): string {
  if (weathercode === undefined) return "Unknown";
  return WEATHER_CODE_LABELS[weathercode] ?? `Weather code ${weathercode}`;
}

export function getIcon(weathercode: number | undefined): string {
  if (weathercode === undefined) return "partly_cloudy";
  return WEATHER_CODE_ICONS[weathercode] ?? "partly_cloudy";
}

function mapWeatherAiStatus(status: number): ApiErrorShape {
  switch (status) {
    case 401:
      return { status: 401, code: "UNAUTHORIZED", message: "Weather provider rejected the API key" };
    case 403:
      return { status: 403, code: "FORBIDDEN", message: "This feature is not available on the current plan" };
    case 429:
      return { status: 429, code: "QUOTA_EXCEEDED", message: "Monthly request quota has been exceeded" };
    case 400:
      return { status: 400, code: "BAD_REQUEST", message: "Missing or invalid parameters" };
    case 503:
      return { status: 503, code: "UPSTREAM_UNAVAILABLE", message: "Weather provider is temporarily unavailable" };
    default:
      return { status: 500, code: "UPSTREAM_ERROR", message: "Weather provider returned an unexpected error" };
  }
}

// ─── Normalizer ───────────────────────────────────────────────────────────────

function normalizeWeatherData(data: any) {
  const current = data?.current ?? {};
  const weathercode =
    typeof current.weathercode === "number" ? current.weathercode : undefined;

  const temp_c = current.temp_c ?? current.temperature ?? current.temp ?? undefined;
  const condition = current.condition ?? getCondition(weathercode);
  const icon = getIcon(weathercode);

  const daily: any[] = (data?.daily ?? []).map((day: any) => ({
    ...day,
    condition: getCondition(day.weathercode),
    icon: getIcon(day.weathercode),
  }));

  return {
    lat: data?.lat,
    lon: data?.lon,
    units: data?.units ?? "metric",
    current: {
      temp_c,
      condition,
      icon,
      weathercode,
      windspeed: current.windspeed,
      winddirection: current.winddirection,
      is_day: current.is_day,
      time: current.time,
    },
    daily,
    ai_summary: data?.ai_summary ?? null,
  };
}

// ─── Public service function ──────────────────────────────────────────────────

export async function fetchWeather(lat: number, lon: number, days = 3) {
  const baseUrl = process.env.WEATHER_AI_BASE_URL || "https://api.weather-ai.co";
  const apiKey = process.env.WEATHER_AI_KEY || "";

  if (!apiKey) {
    const err = new Error("Weather AI API key is not configured") as Error & {
      shape?: ApiErrorShape;
    };
    err.shape = {
      status: 500,
      code: "MISSING_API_KEY",
      message: "Weather AI API key is not configured",
    };
    throw err;
  }

  // ai=false preserves AI quota on the free plan
  const url = `${baseUrl}/v1/weather?lat=${lat}&lon=${lon}&days=${days}&ai=false`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as WeatherAiError;
    const mapped = mapWeatherAiStatus(response.status);
    const err = new Error(
      body.message || body.error || mapped.message
    ) as Error & { shape: ApiErrorShape };
    err.shape = mapped;
    throw err;
  }

  const raw = await response.json();
  return normalizeWeatherData(raw);
}
