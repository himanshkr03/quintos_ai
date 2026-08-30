// File: E:\quintos_ai\app\loading.tsx

import { Loader2, Sparkles, Brain } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center space-y-4">
        {/* Animated Brand Logo Icon */}
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 shadow-xl backdrop-blur-md animate-pulse">
          <Brain className="h-7 w-7 text-blue-400" />
        </div>

        {/* Loading Text */}
        <div className="space-y-1.5">
          <h2 className="text-base font-bold text-white font-mono tracking-tight">
            Quintos AI
          </h2>
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-400" />
            <span>Initializing sovereign compute runtime...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
