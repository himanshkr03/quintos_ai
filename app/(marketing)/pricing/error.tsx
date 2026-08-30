// File: E:\quintos_ai\app\(marketing)\pricing\error.tsx

"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import Button from "@/components/shared/ui/Button";

export default function PricingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Pricing Route Error]:", error);
  }, [error]);

  return (
    <div className="py-24 max-w-xl mx-auto px-4 text-center space-y-5">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600 mx-auto">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <h1 className="text-xl font-bold text-slate-900">Pricing Information Unavailable</h1>
      <p className="text-xs text-slate-600">
        We encountered an error loading compute pricing plans and sovereign quotas.
      </p>
      <div className="flex items-center justify-center gap-3">
        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={() => reset()}
          leftIcon={<RotateCcw className="h-4 w-4" />}
        >
          Retry
        </Button>
        <Link href="/">
          <Button type="button" variant="secondary" size="sm" leftIcon={<Home className="h-4 w-4" />}>
            Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
