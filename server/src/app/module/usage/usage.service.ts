export async function fetchUsage() {
  const baseUrl = process.env.WEATHER_AI_BASE_URL || "https://api.weather-ai.co";
  const apiKey = process.env.WEATHER_AI_KEY || "";

  if (!apiKey) {
    throw new Error("MISSING_API_KEY");
  }

  const response = await fetch(`${baseUrl}/v1/usage`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!response.ok) {
    const err = new Error("UPSTREAM_ERROR") as Error & { status: number };
    err.status = response.status;
    throw err;
  }

  const data = await response.json();

  return {
    plan: data.plan ?? "free",
    requests_used: data.used ?? data.requests_used ?? 0,
    requests_limit: data.limit ?? data.requests_limit ?? 0,
    remaining: data.remaining ?? 0,
    unlimited: data.unlimited ?? false,
    ai_requests_used: data.ai_used ?? data.ai_requests_used ?? 0,
    ai_requests_limit: data.ai_limit ?? data.ai_requests_limit ?? 0,
    ...data,
  };
}
