"use client";

import { useCallback, useEffect, useState } from "react";
import { getUsage, getWeatherForAllCities } from "./lib/api";
import { ApiError, UsageResponse, WeatherResult } from "./types";
import CityCard from "./components/CityCard";
import UsageBar from "./components/UsageBar";
import ErrorBanner from "./components/ErrorBanner";
import CardSkeleton from "./components/CardSkeleton";

function RefreshIcon({ spinning }: { spinning: boolean }) {
  return (
    <svg
      className={`w-4 h-4 ${spinning ? "animate-spin" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  );
}

export default function Home() {
  const [results, setResults] = useState<WeatherResult[]>([]);
  const [usage, setUsage] = useState<UsageResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const load = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const [weatherData, usageData] = await Promise.allSettled([
        getWeatherForAllCities(),
        getUsage(),
      ]);

      if (weatherData.status === "fulfilled") {
        setResults(weatherData.value.results);
        setLastUpdated(new Date());
      } else {
        setError(weatherData.reason as ApiError);
      }

      if (usageData.status === "fulfilled") {
        setUsage(usageData.value);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const formatLastUpdated = (date: Date): string => {
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <main className="min-h-screen px-4 py-8 md:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-10 fade-in">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              {/* Logo */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-violet flex items-center justify-center shadow-glow-sm">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-black text-white tracking-tight font-display">
                  Weather<span className="text-accent">Scope</span>
                </h1>
                <p className="text-xs text-slate-500 -mt-0.5">Powered by WeatherAI</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 max-w-md">
              Real-time weather conditions across major world cities — updated live from the WeatherAI API.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {lastUpdated && (
              <span className="text-xs text-slate-600 hidden sm:block">
                Updated {formatLastUpdated(lastUpdated)}
              </span>
            )}
            <button
              id="refresh-button"
              onClick={() => load(true)}
              disabled={loading || refreshing}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/8 hover:border-accent/30 text-sm text-slate-300 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshIcon spinning={refreshing} />
              {refreshing ? "Refreshing…" : "Refresh"}
            </button>
          </div>
        </div>

        <div className="header-line" />
      </header>

      {/* Usage Bar */}
      {usage && (
        <div className="mb-8 fade-in fade-in-delay-1">
          <UsageBar usage={usage} />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-8 fade-in">
          <ErrorBanner message={error.message} onRetry={() => load()} />
        </div>
      )}

      {/* Stats row */}
      {!loading && results.length > 0 && (
        <div className="flex items-center justify-between mb-6 fade-in fade-in-delay-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">{results.length} Cities</span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-slate-500">Live conditions</span>
          </div>
          {lastUpdated && (
            <span className="text-xs text-slate-600 sm:hidden">
              Updated {formatLastUpdated(lastUpdated)}
            </span>
          )}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {loading &&
          Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}

        {!loading &&
          results.map((result, i) => (
            <CityCard key={result.city.id} result={result} index={i} />
          ))}
      </div>

      {/* Empty state */}
      {!loading && results.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center py-24 text-center fade-in">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
            </svg>
          </div>
          <p className="text-slate-400 font-medium mb-1">No weather data available</p>
          <p className="text-sm text-slate-600 mb-4">Check your API key configuration</p>
          <button
            onClick={() => load()}
            className="text-sm text-accent hover:text-white transition-colors"
          >
            Try again →
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-16 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
        <span>WeatherScope · Built with WeatherAI API</span>
        <a
          href="https://weather-ai.co/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-600 hover:text-accent transition-colors"
        >
          API Docs →
        </a>
      </footer>
    </main>
  );
}
