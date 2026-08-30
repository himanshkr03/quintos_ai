// File: E:\quintos_ai\app\(marketing)\pricing\loading.tsx

export default function PricingLoading() {
  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-pulse">
      {/* Header Skeleton */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="h-6 w-32 rounded-full bg-slate-200 mx-auto" />
        <div className="h-10 w-80 rounded-xl bg-slate-200 mx-auto" />
        <div className="h-4 w-96 rounded-lg bg-slate-100 mx-auto" />
      </div>

      {/* Pricing Tier Cards */}
      <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm space-y-6"
          >
            <div className="h-6 w-32 rounded bg-slate-200" />
            <div className="h-10 w-24 rounded-lg bg-slate-200" />
            <div className="space-y-2 pt-4 border-t border-slate-100">
              <div className="h-4 w-full rounded bg-slate-100" />
              <div className="h-4 w-3/4 rounded bg-slate-100" />
              <div className="h-4 w-5/6 rounded bg-slate-100" />
            </div>
            <div className="h-11 w-full rounded-xl bg-slate-100 pt-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
