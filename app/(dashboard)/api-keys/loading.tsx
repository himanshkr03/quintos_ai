// File: E:\quintos_ai\app\(dashboard)\api-keys\loading.tsx

export default function APIKeysLoading() {
  return (
    <div className="space-y-8 max-w-6xl animate-pulse">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-8 w-56 rounded-xl bg-slate-200" />
        <div className="h-4 w-96 rounded-lg bg-slate-200" />
      </div>

      {/* Table Card Skeleton */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-slate-100">
          <div className="space-y-1.5">
            <div className="h-5 w-40 rounded bg-slate-200" />
            <div className="h-3 w-64 rounded bg-slate-200" />
          </div>
          <div className="h-9 w-36 rounded-xl bg-slate-200" />
        </div>

        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 w-full rounded-xl bg-slate-50" />
          ))}
        </div>
      </div>
    </div>
  );
}
