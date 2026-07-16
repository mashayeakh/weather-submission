# Weather 🌤️

**🚀 Live Demo (Client):** [https://weathersubmission.netlify.app](https://weathersubmission.netlify.app)
**⚙️ Live API (Server):** [https://weather-submission.onrender.com/health](https://weather-submission.onrender.com/health)

A live, multi-city weather dashboard built on the [WeatherAI API](https://weather-ai.co/docs).
Displays real-time current conditions, a 3-day forecast, wind speed/direction, and API usage quota — all in a modern glassmorphism dark-mode UI.

---

## Features

- **Live weather** for 6 global cities (Dhaka, London, New York, Tokyo, Nairobi, Sydney)
- **3-day daily forecast** with high/low temperatures per city
- **Wind speed & direction** indicator
- **Day/Night badge** per city based on local sun position
- **API usage bar** showing monthly quota consumption and plan tier
- **Animated skeletons** while data loads
- **Refresh button** for on-demand updates
- **AI summaries** shown when available (Pro/Scale plan)
- Fully responsive, dark-mode glassmorphism design

---

## Architecture

```
client/   ← Next.js 14 (App Router) frontend
server/   ← Express.js API proxy + data normalizer
```

The server acts as a secure proxy: it holds the WeatherAI API key server-side and normalizes the API response into a clean shape the client consumes. This avoids exposing the API key in the browser.

---

## Setup

### Prerequisites

- Node.js 18+
- A WeatherAI API key from [weather-ai.co](https://weather-ai.co)

---

### 1. Server

```bash
cd server
npm install
```

Create `.env` (already present, update your key if needed):

```env
PORT=5000
WEATHER_AI_KEY=wai_your_key_here
WEATHER_AI_BASE_URL=https://api.weather-ai.co
CLIENT_ORIGIN=http://localhost:3000
```

Start in development mode:

```bash
npm run dev
```

The server runs at `http://localhost:5000`.

---

### 2. Client

```bash
cd client
npm install
```

Create `.env.local` (copy from the example):

```bash
cp .env.local.example .env.local
```

`.env.local` contents:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

Start in development mode:

```bash
npm run dev
```

The client runs at `http://localhost:3000`.

---

## API Endpoints (Server)

| Method | Path               | Description                          |
|--------|--------------------|--------------------------------------|
| GET    | `/health`          | Server health check                  |
| GET    | `/api/cities`      | List all tracked cities              |
| GET    | `/api/weather`     | Current weather for all cities       |
| GET    | `/api/weather/:id` | Weather for a specific city by ID    |
| GET    | `/api/usage`       | WeatherAI API quota usage            |

---

## WeatherAI API Endpoints Used

| Endpoint          | Purpose                              |
|-------------------|--------------------------------------|
| `GET /v1/weather` | Current + daily forecast by lat/lon  |
| `GET /v1/usage`   | Monthly request quota and plan info  |

---

## Deployment

**Server** → Deploy to [Render](https://render.com) using the provided `render.yaml` Blueprint. Set environment variables via the platform dashboard.

**Client** → Deploy to [Netlify](https://netlify.com) using the provided `netlify.toml`. Set `NEXT_PUBLIC_API_BASE_URL` to your deployed server URL.

---

## Tech Stack

| Layer    | Technology                |
|----------|---------------------------|
| Frontend | Next.js 14, React 18, TailwindCSS 3 |
| Backend  | Node.js, Express 4, TypeScript |
| API      | WeatherAI REST API        |
| Fonts    | Inter, Outfit (Google Fonts) |
