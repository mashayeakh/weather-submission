"use client";

import { WeatherResult, DailyForecast } from "../types";

// Weather icon SVG paths
function WeatherIcon({ icon, className = "" }: { icon: string; className?: string }) {
  const base = "w-full h-full";
  switch (icon) {
    case "sunny":
      return (
        <svg className={`${base} ${className}`} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="4.5" fill="#fbbf24" />
          <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "partly_cloudy":
      return (
        <svg className={`${base} ${className}`} viewBox="0 0 24 24" fill="none">
          <circle cx="10" cy="10" r="3.5" fill="#fbbf24" />
          <path d="M10 3v1.5M10 17v1.5M3 10h1.5M17 10h1.5" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M7 15a4 4 0 0 1 4-4h1a4 4 0 0 1 0 8H8a3 3 0 0 1-1-5.83" fill="#94a3b8" />
        </svg>
      );
    case "cloudy":
      return (
        <svg className={`${base} ${className}`} viewBox="0 0 24 24" fill="none">
          <path d="M6 18a5 5 0 0 1 0-10 5.5 5.5 0 0 1 10.74-1.5A4 4 0 0 1 19 14.5V15a3 3 0 0 1-3 3H6Z" fill="#94a3b8" />
        </svg>
      );
    case "rainy_light":
    case "rainy":
    case "rainy_heavy":
      return (
        <svg className={`${base} ${className}`} viewBox="0 0 24 24" fill="none">
          <path d="M6 16a5 5 0 0 1 0-10 5.5 5.5 0 0 1 10.74-1.5A4 4 0 0 1 19 12.5V13a3 3 0 0 1-3 3H6Z" fill="#94a3b8" />
          <path d={icon === "rainy_heavy" ? "M8 19l-1 3M12 19l-1 3M16 19l-1 3" : "M8 20l-0.5 2M12 20l-0.5 2M16 20l-0.5 2"} stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "snowy_light":
    case "snowy":
    case "snowy_heavy":
      return (
        <svg className={`${base} ${className}`} viewBox="0 0 24 24" fill="none">
          <path d="M6 15a5 5 0 0 1 0-10 5.5 5.5 0 0 1 10.74-1.5A4 4 0 0 1 19 11.5V12a3 3 0 0 1-3 3H6Z" fill="#94a3b8" />
          <circle cx="8" cy="20" r="1" fill="#e2e8f0" />
          <circle cx="12" cy="19" r="1" fill="#e2e8f0" />
          <circle cx="16" cy="20" r="1" fill="#e2e8f0" />
        </svg>
      );
    case "foggy":
      return (
        <svg className={`${base} ${className}`} viewBox="0 0 24 24" fill="none">
          <path d="M4 12h16M4 16h16M4 8h16" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "thunderstorm":
      return (
        <svg className={`${base} ${className}`} viewBox="0 0 24 24" fill="none">
          <path d="M6 14a5 5 0 0 1 0-10 5.5 5.5 0 0 1 10.74-1.5A4 4 0 0 1 19 10.5V11a3 3 0 0 1-3 3H6Z" fill="#94a3b8" />
          <path d="M13 14l-2 4h3l-2 4" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg className={`${base} ${className}`} viewBox="0 0 24 24" fill="none">
          <path d="M6 18a5 5 0 0 1 0-10 5.5 5.5 0 0 1 10.74-1.5A4 4 0 0 1 19 14.5V15a3 3 0 0 1-3 3H6Z" fill="#94a3b8" />
        </svg>
      );
  }
}

function getTempClass(temp: number): string {
  if (temp >= 30) return "temp-hot";
  if (temp <= 10) return "temp-cold";
  return "temp-mild";
}

function getWindDirection(degrees: number | undefined): string {
  if (degrees === undefined) return "—";
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(degrees / 45) % 8];
}

function formatDate(dateStr: string): { day: string; short: string } {
  try {
    const d = new Date(dateStr + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = Math.round((d.getTime() - today.getTime()) / 86400000);
    if (diff === 0) return { day: "Today", short: "T" };
    if (diff === 1) return { day: "Tomorrow", short: "Tm" };
    return {
      day: d.toLocaleDateString("en-US", { weekday: "short" }),
      short: d.toLocaleDateString("en-US", { weekday: "narrow" }),
    };
  } catch {
    return { day: dateStr, short: dateStr };
  }
}

function MiniWeatherIcon({ icon }: { icon: string }) {
  return (
    <div className="w-6 h-6 flex-shrink-0">
      <WeatherIcon icon={icon} />
    </div>
  );
}

export default function CityCard({ result, index = 0 }: { result: WeatherResult; index?: number }) {
  const { city, weather } = result;
  const current = weather.current;
  const temperature = current?.temp_c ?? (current?.temperature as number | undefined);
  const condition = current?.condition ?? "—";
  const icon = current?.icon ?? "partly_cloudy";
  const windspeed = current?.windspeed as number | undefined;
  const winddirection = current?.winddirection as number | undefined;
  const isDay = current?.is_day !== 0;
  const daily = (weather.daily ?? []) as DailyForecast[];

  const delayClass = `fade-in-delay-${Math.min(index + 1, 6)}`;

  return (
    <div
      className={`glass-card p-6 flex flex-col gap-0 cursor-default fade-in ${delayClass} group`}
      role="article"
      aria-label={`Weather for ${city.name}`}
      id={`city-card-${city.id}`}
    >
      <div className="card-highlight" />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight leading-tight">{city.name}</h3>
          <p className="text-xs text-slate-500 mt-0.5">{city.country}</p>
        </div>
        <div className={`badge ${isDay ? "badge-amber" : "badge-violet"}`}>
          {isDay ? (
            <>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
              Day
            </>
          ) : (
            <>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
              Night
            </>
          )}
        </div>
      </div>

      {/* Temperature & Icon */}
      <div className="flex items-end gap-3 mb-3">
        <div className="w-16 h-16 flex-shrink-0">
          <WeatherIcon icon={icon} />
        </div>
        <div>
          {temperature !== undefined ? (
            <div className={`text-5xl font-black leading-none ${getTempClass(temperature)}`}>
              {Math.round(temperature)}
              <span className="text-2xl font-bold">°C</span>
            </div>
          ) : (
            <div className="text-5xl font-black leading-none text-slate-600">—°C</div>
          )}
          <p className="text-sm text-slate-400 mt-1 font-medium">{condition}</p>
        </div>
      </div>

      {/* Wind info */}
      {windspeed !== undefined && (
        <div className="flex items-center gap-4 mb-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-accent/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span>
              <span className="text-slate-300 font-medium">{windspeed}</span> km/h
              {winddirection !== undefined && (
                <span className="ml-1 text-accent/70">{getWindDirection(winddirection)}</span>
              )}
            </span>
          </div>
          {city.lat !== undefined && (
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-accent/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              <span className="text-slate-500">{Math.abs(city.lat).toFixed(1)}{city.lat >= 0 ? "°N" : "°S"}</span>
            </div>
          )}
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-white/5 mb-4" />

      {/* Daily forecast */}
      {daily.length > 0 ? (
        <div>
          <p className="text-xs text-slate-600 font-medium uppercase tracking-wider mb-2">Forecast</p>
          <div className="flex gap-2">
            {daily.slice(0, 3).map((day) => {
              const { day: dayLabel } = formatDate(day.date);
              return (
                <div key={day.date} className="forecast-pill flex-1 text-center">
                  <p className="text-xs text-slate-500 mb-1.5 font-medium">{dayLabel}</p>
                  <div className="w-6 h-6 mx-auto mb-1.5">
                    <MiniWeatherIcon icon={day.icon} />
                  </div>
                  <p className="text-xs font-bold text-white">{Math.round(day.temp_max)}°</p>
                  <p className="text-xs text-slate-600">{Math.round(day.temp_min)}°</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="text-xs text-slate-600 text-center">No forecast data</p>
      )}

      {/* AI Summary */}
      {weather.ai_summary && (
        <div className="mt-4 pt-3 border-t border-white/5">
          <div className="flex items-center gap-1.5 mb-2">
            <svg className="w-3.5 h-3.5 text-violet" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
            </svg>
            <span className="text-xs text-violet font-semibold uppercase tracking-wider">AI Summary</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">{weather.ai_summary}</p>
        </div>
      )}
    </div>
  );
}
