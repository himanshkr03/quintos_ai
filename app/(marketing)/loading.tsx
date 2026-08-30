// File: E:\quintos_ai\app\(marketing)\loading.tsx

import { Brain, Loader2 } from "lucide-react";

export default function MarketingLoading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 space-y-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-sm animate-pulse border border-blue-100">
        <Brain className="h-6 w-6" />
      </div>
      <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
        <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-600" />
        <span>Loading Quintos AI...</span>
      </div>
    </div>
  );
}
