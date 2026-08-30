// File: E:\quintos_ai\app\(dashboard)\profile\error.tsx

"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import Button from "@/components/shared/ui/Button";

export default function ProfileError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Profile Route Error]:", error);
  }, [error]);

  return (
    <div className="rounded-2xl border border-red-200 bg-red-50/50 p-8 text-center space-y-4 max-w-xl mx-auto my-8">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600 mx-auto">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <h2 className="text-lg font-bold text-slate-900">Failed to Load Profile</h2>
      <p className="text-xs text-slate-600 max-w-md mx-auto">
        Unable to resolve your research profile credentials from the database.
      </p>
      <div className="pt-2">
        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={() => reset()}
          leftIcon={<RotateCcw className="h-4 w-4" />}
        >
          Retry Profile
        </Button>
      </div>
    </div>
  );
}
