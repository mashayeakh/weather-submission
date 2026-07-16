# WeatherScope Server

Express + TypeScript API that proxies the WeatherAI API. Keeps the WeatherAI API key server-side and exposes clean, scoped endpoints for the WeatherScope client.

## Setup

```bash
npm install
cp .env.example .env
```

Fill in `.env`:

```
PORT=5000
WEATHER_AI_KEY=wai_your_key_here
WEATHER_AI_BASE_URL=https://api.weather-ai.co
CLIENT_ORIGIN=http://localhost:3000
```

Run in development:

```bash
npm run dev
```

Build and run in production:

```bash
npm run build
npm start
```

## Endpoints

| Method | Route | Description |
|---|---|---|
| GET | `/health` | Health check |
| GET | `/api/cities` | List of supported cities |
| GET | `/api/weather` | Weather for all supported cities |
| GET | `/api/weather/:cityId` | Weather for a single city |
| GET | `/api/usage` | Current WeatherAI plan usage/quota |

## Notes

- Cities are a fixed list (`src/cities.ts`) since the WeatherAI API takes lat/lon rather than city names.
- WeatherAI error codes (401/403/429/500/503) are mapped to a consistent JSON error shape: `{ code, message }`.
- `Promise.allSettled` is used when fetching all cities so one failing request doesn't take down the whole dashboard.
