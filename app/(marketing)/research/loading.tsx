// File: E:\quintos_ai\app\(marketing)\research\loading.tsx

export default function ResearchLoading() {
  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-pulse">
      {/* Header Skeleton */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="h-6 w-36 rounded-full bg-slate-200 mx-auto" />
        <div className="h-10 w-96 rounded-xl bg-slate-200 mx-auto" />
        <div className="h-4 w-full max-w-md rounded-lg bg-slate-100 mx-auto" />
      </div>

      {/* Trajectories Grid Skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4"
          >
            <div className="h-8 w-8 rounded-xl bg-blue-100" />
            <div className="h-6 w-48 rounded bg-slate-200" />
            <div className="h-16 w-full rounded bg-slate-50" />
          </div>
        ))}
      </div>
    </div>
  );
}
