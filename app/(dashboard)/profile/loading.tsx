// File: E:\quintos_ai\app\(dashboard)\profile\loading.tsx

export default function ProfileLoading() {
  return (
    <div className="space-y-8 max-w-5xl animate-pulse">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-8 w-60 rounded-xl bg-slate-200" />
        <div className="h-4 w-96 rounded-lg bg-slate-200" />
      </div>

      {/* Profile Card Skeleton */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-5 border-b border-slate-100 pb-6">
          <div className="h-16 w-16 rounded-2xl bg-slate-200" />
          <div className="space-y-2">
            <div className="h-6 w-48 rounded-lg bg-slate-200" />
            <div className="h-4 w-32 rounded bg-slate-100" />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="h-11 rounded-xl bg-slate-100" />
          <div className="h-11 rounded-xl bg-slate-100" />
          <div className="h-11 rounded-xl bg-slate-100" />
          <div className="h-11 rounded-xl bg-slate-100" />
        </div>
      </div>
    </div>
  );
}
