// File: E:\quintos_ai\app\(dashboard)\settings\loading.tsx

export default function SettingsLoading() {
  return (
    <div className="space-y-8 max-w-5xl animate-pulse">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-8 w-72 rounded-xl bg-slate-200" />
        <div className="h-4 w-96 rounded-lg bg-slate-200" />
      </div>

      {/* Settings Card 1 Skeleton */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <div className="h-6 w-52 rounded bg-slate-200 border-b border-slate-100 pb-2" />
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="h-11 rounded-xl bg-slate-100" />
          <div className="h-11 rounded-xl bg-slate-100" />
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="h-20 rounded-xl bg-slate-100" />
          <div className="h-20 rounded-xl bg-slate-100" />
          <div className="h-20 rounded-xl bg-slate-100" />
        </div>
      </div>

      {/* Settings Card 2 Skeleton */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm space-y-4">
        <div className="h-6 w-52 rounded bg-slate-200 border-b border-slate-100 pb-2" />
        <div className="space-y-3">
          <div className="h-8 rounded-lg bg-slate-100" />
          <div className="h-8 rounded-lg bg-slate-100" />
          <div className="h-8 rounded-lg bg-slate-100" />
        </div>
      </div>
    </div>
  );
}
