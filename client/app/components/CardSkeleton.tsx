export default function CardSkeleton() {
  return (
    <div className="glass-card p-6 h-[320px] relative">
      <div className="card-highlight" />
      {/* City name */}
      <div className="skeleton h-5 w-28 mb-2 rounded-lg" />
      {/* Country */}
      <div className="skeleton h-3 w-20 mb-6 rounded-lg" />
      {/* Temperature */}
      <div className="skeleton h-14 w-24 mb-4 rounded-xl" />
      {/* Condition */}
      <div className="skeleton h-4 w-32 mb-6 rounded-lg" />
      {/* Divider */}
      <div className="border-t border-white/5 mb-4" />
      {/* Forecast row */}
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton flex-1 h-16 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
