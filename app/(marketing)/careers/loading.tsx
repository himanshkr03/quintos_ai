// File: E:\quintos_ai\app\(marketing)\careers\loading.tsx

export default function CareersLoading() {
  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-pulse">
      {/* Header Skeleton */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="h-6 w-32 rounded-full bg-slate-200 mx-auto" />
        <div className="h-10 w-80 rounded-xl bg-slate-200 mx-auto" />
        <div className="h-4 w-96 rounded-lg bg-slate-100 mx-auto" />
      </div>

      {/* Roles List Skeleton */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex justify-between items-center"
          >
            <div className="space-y-2">
              <div className="h-6 w-56 rounded bg-slate-200" />
              <div className="h-4 w-40 rounded bg-slate-100" />
            </div>
            <div className="h-9 w-28 rounded-xl bg-slate-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
