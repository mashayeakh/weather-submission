import path from "path";
import dotenv from "dotenv";

// Load .env before anything else
const envPath = path.resolve(__dirname, "../.env");
const dotenvResult = dotenv.config({ path: envPath });

if (dotenvResult.error) {
  console.warn(
    `Warning: could not load .env from ${envPath}. Falling back to environment variables.`
  );
}

import { createApp } from "./app";

const PORT = process.env.PORT || 5000;

if (!process.env.WEATHER_AI_KEY) {
  console.error(
    "WeatherScope server startup error: WEATHER_AI_KEY is not configured. Check .env or your environment variables."
  );
}

const app = createApp();

app.listen(PORT, () => {
  console.log(`WeatherScope server running on port ${PORT}`);
});
