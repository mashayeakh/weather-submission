import { UsageResponse } from "../types";

const PLAN_COLORS: Record<string, string> = {
  free: "badge-emerald",
  pro: "badge-blue",
  scale: "badge-violet",
};

export default function UsageBar({ usage }: { usage: UsageResponse }) {
  const used = usage.requests_used ?? 0;
  const limit = usage.requests_limit ?? 0;
  const remaining = usage.remaining ?? (limit - used);
  const pct = limit > 0 ? Math.min(100, Math.round((used / limit) * 100)) : 0;
  const plan = (usage.plan ?? "free").toLowerCase();

  const pctColor =
    pct >= 90 ? "from-rose-400 to-red-500" :
    pct >= 70 ? "from-amber-400 to-orange-500" :
    "from-accent to-violet";

  return (
    <div className="glass-card p-5">
      <div className="card-highlight" />
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="icon-bg">
            <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">API Usage</p>
            <p className="text-xs text-slate-500">30-day rolling period</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`badge ${PLAN_COLORS[plan] ?? "badge-blue"}`}>
            {plan}
          </span>
          <span className="text-xs text-slate-400 font-medium">
            {used.toLocaleString()} / {limit > 0 ? limit.toLocaleString() : "∞"}
          </span>
        </div>
      </div>

      <div className="progress-track">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${pctColor} transition-all duration-1000 ease-out relative`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="flex items-center justify-between mt-3">
        <span className="text-xs text-slate-500">
          <span className={pct >= 90 ? "text-rose-400 font-semibold" : "text-slate-400"}>
            {pct}%
          </span>{" "}
          used
        </span>
        <span className="text-xs text-slate-500">
          <span className="text-emerald font-medium">{remaining.toLocaleString()}</span> remaining
        </span>
      </div>
    </div>
  );
}
