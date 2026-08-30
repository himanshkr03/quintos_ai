// File: E:\quintos_ai\app\(marketing)\blog\loading.tsx

export default function BlogLoading() {
  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-pulse">
      {/* Header Skeleton */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="h-6 w-32 rounded-full bg-slate-200 mx-auto" />
        <div className="h-10 w-80 rounded-xl bg-slate-200 mx-auto" />
        <div className="h-4 w-96 rounded-lg bg-slate-100 mx-auto" />
      </div>

      {/* Featured Card Skeleton */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm h-80 flex flex-col justify-end space-y-3">
        <div className="h-5 w-28 rounded bg-blue-100" />
        <div className="h-8 w-3/4 rounded-xl bg-slate-200" />
        <div className="h-4 w-1/2 rounded bg-slate-100" />
      </div>

      {/* Grid Skeletons */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4"
          >
            <div className="h-40 rounded-xl bg-slate-100" />
            <div className="h-6 w-3/4 rounded bg-slate-200" />
            <div className="h-4 w-full rounded bg-slate-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
