// File: E:\quintos_ai\app\error.tsx

"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  RotateCcw,
  Home,
  LayoutDashboard,
  ShieldAlert,
} from "lucide-react";
import Button from "@/components/shared/ui/Button";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log exception to telemetry monitoring in production
    console.error("[Global App Error]:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Ambient error glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full text-center space-y-6">
        {/* Error Status Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/50 px-3.5 py-1 text-xs font-mono text-red-400 backdrop-blur-md">
          <ShieldAlert className="h-4 w-4 text-red-400" />
          <span>Application Runtime Exception</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            An Unexpected Error Occurred
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
            The neural runtime encountered an unhandled exception during rendering. You can attempt to reset the application state or navigate back to safety.
          </p>
        </div>

        {/* Error Digest Box (Safe identifier for support) */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 text-left font-mono text-xs text-slate-300 space-y-1">
          <div className="flex items-center justify-between text-[11px] text-slate-500 pb-1 border-b border-slate-800">
            <span>Diagnostics</span>
            {error.digest && <span>Digest: {error.digest}</span>}
          </div>
          <p className="text-red-400 font-semibold break-all pt-1">
            {error.message || "An unknown runtime failure occurred."}
          </p>
        </div>

        {/* Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={() => reset()}
            leftIcon={<RotateCcw className="h-4 w-4" />}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20"
          >
            Try Again
          </Button>

          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button
              type="button"
              variant="secondary"
              size="md"
              leftIcon={<LayoutDashboard className="h-4 w-4" />}
              className="w-full sm:w-auto border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800"
            >
              Dashboard
            </Button>
          </Link>

          <Link href="/" className="w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              size="md"
              leftIcon={<Home className="h-4 w-4" />}
              className="w-full sm:w-auto border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900"
            >
              Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
