// File: E:\quintos_ai\app\(dashboard)\billing\loading.tsx

export default function BillingLoading() {
  return (
    <div className="space-y-8 max-w-6xl animate-pulse">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-8 w-64 rounded-xl bg-slate-200" />
        <div className="h-4 w-96 rounded-lg bg-slate-200" />
      </div>

      {/* Plan Card Skeleton */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm space-y-4">
        <div className="h-6 w-48 rounded bg-slate-200" />
        <div className="h-10 w-36 rounded-lg bg-slate-200" />
        <div className="h-4 w-72 rounded bg-slate-100" />
      </div>

      {/* Grid Cards */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="h-48 rounded-2xl border border-slate-200 bg-white p-6" />
        <div className="h-48 rounded-2xl border border-slate-200 bg-white p-6" />
      </div>
    </div>
  );
}
