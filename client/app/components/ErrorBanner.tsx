export default function ErrorBanner({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="glass-card p-5 border-rose-500/20 flex items-start gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
        <svg className="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-rose-300 mb-1">Failed to load weather data</p>
        <p className="text-sm text-slate-400">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex-shrink-0 text-xs text-accent hover:text-white transition-colors font-medium px-3 py-1.5 rounded-lg bg-accent/10 hover:bg-accent/20 border border-accent/20"
        >
          Retry
        </button>
      )}
    </div>
  );
}
