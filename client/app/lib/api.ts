import { ApiError, UsageResponse, WeatherApiResponse } from "../types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as Partial<ApiError>;
    throw {
      code: body.code || "UNKNOWN_ERROR",
      message: body.message || `API error: ${response.status}`,
    } as ApiError;
  }
  return response.json();
}

export async function getWeatherForAllCities(): Promise<WeatherApiResponse> {
  const response = await fetch(`${API_BASE_URL}/api/weather`);
  return handleResponse<WeatherApiResponse>(response);
}

export async function getUsage(): Promise<UsageResponse> {
  const response = await fetch(`${API_BASE_URL}/api/usage`);
  return handleResponse<UsageResponse>(response);
}
