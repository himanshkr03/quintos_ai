// File: E:\quintos_ai\app\(dashboard)\loading.tsx

export default function DashboardLoading() {
  return (
    <div className="space-y-8 max-w-7xl animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-5 w-36 rounded-full bg-slate-200" />
          <div className="h-8 w-64 rounded-xl bg-slate-200" />
          <div className="h-4 w-96 rounded-lg bg-slate-200" />
        </div>
        <div className="h-9 w-44 rounded-xl bg-slate-200" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-24 rounded bg-slate-200" />
              <div className="h-8 w-8 rounded-xl bg-slate-100" />
            </div>
            <div className="h-8 w-28 rounded-lg bg-slate-200" />
          </div>
        ))}
      </div>

      {/* Main Workspace Skeleton */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm h-96 flex flex-col justify-center items-center space-y-4">
        <div className="h-10 w-10 rounded-2xl bg-blue-100 animate-pulse" />
        <div className="h-4 w-48 rounded bg-slate-200" />
      </div>
    </div>
  );
}
