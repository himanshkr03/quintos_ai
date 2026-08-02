// File: E:\quintos_ai\app\(dashboard)\dashboard\error.tsx

"use client";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({
  error,
  reset,
}: ErrorProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <h1 className="text-4xl font-bold text-red-600">
        Something went wrong
      </h1>

      <p className="mt-4 max-w-lg text-gray-600">
        {error.message}
      </p>

      <button
        onClick={reset}
        className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Try Again
      </button>
    </div>
  );
}