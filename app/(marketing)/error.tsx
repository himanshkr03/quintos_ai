// File: E:\quintos_ai\app\(marketing)\error.tsx

"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import Button from "@/components/shared/ui/Button";

export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Marketing Page Error]:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-5">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 border border-red-100 shadow-sm">
        <AlertTriangle className="h-7 w-7" />
      </div>

      <div className="space-y-2 max-w-md">
        <h1 className="text-2xl font-bold text-slate-900">
          Page Rendering Error
        </h1>
        <p className="text-xs text-slate-600 leading-relaxed">
          We encountered an issue preparing this page. You can attempt to reload or return to the main portal.
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
          Try Again
        </Button>

        <Link href="/">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            leftIcon={<Home className="h-4 w-4" />}
          >
            Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
}
