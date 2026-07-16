export interface City {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export interface DailyForecast {
  date: string;
  temp_max: number;
  temp_min: number;
  precipitation: number;
  weathercode: number;
  condition: string;
  icon: string;
}

export interface CurrentWeather {
  temp_c?: number;
  temperature?: number;
  condition?: string;
  icon?: string;
  weathercode?: number;
  windspeed?: number;
  winddirection?: number;
  is_day?: number;
  time?: string;
  humidity?: number;
  [key: string]: unknown;
}

export interface WeatherResult {
  city: City;
  weather: {
    current?: CurrentWeather;
    daily?: DailyForecast[];
    ai_summary?: string | null;
    lat?: number;
    lon?: number;
    units?: string;
    [key: string]: unknown;
  };
}

export interface WeatherApiResponse {
  results: WeatherResult[];
  failedCount: number;
}

export interface UsageResponse {
  plan?: string;
  requests_used?: number;
  requests_limit?: number;
  remaining?: number;
  unlimited?: boolean;
  ai_requests_used?: number;
  ai_requests_limit?: number;
  [key: string]: unknown;
}

export interface ApiError {
  code: string;
  message: string;
}
