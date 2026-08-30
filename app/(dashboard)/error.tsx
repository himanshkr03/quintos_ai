// File: E:\quintos_ai\app\(dashboard)\error.tsx

"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home, LayoutDashboard } from "lucide-react";
import Button from "@/components/shared/ui/Button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Dashboard Route Error]:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] p-6 text-center space-y-5">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 shadow-sm border border-red-100">
        <AlertTriangle className="h-7 w-7" />
      </div>

      <div className="space-y-2 max-w-md">
        <h2 className="text-xl font-bold text-slate-900">
          Dashboard View Exception
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          An error occurred while rendering this workspace view. You can reload the component or navigate back to the overview.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={() => reset()}
          leftIcon={<RotateCcw className="h-4 w-4" />}
        >
          Retry View
        </Button>

        <Link href="/dashboard">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            leftIcon={<LayoutDashboard className="h-4 w-4" />}
          >
            Dashboard Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
