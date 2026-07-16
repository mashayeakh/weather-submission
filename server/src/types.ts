export interface ApiErrorShape {
  status: number;
  code: string;
  message: string;
}

export interface WeatherAiError {
  error?: string;
  message?: string;
}
