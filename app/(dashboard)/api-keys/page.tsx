// File: E:\quintos_ai\app\(dashboard)\api-keys\page.tsx

import APIKeysTable from "@/components/dashboard/tables/APIKeysTable";

export const metadata = {
  title: "API Keys | Quintos AI Research Workspace",
  description: "Manage programmatic authentication keys and SDK access tokens.",
};

export default function ApiKeysPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          API Keys & Credentials
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-600">
          Generate and manage access tokens for authenticating requests to Quintos AI research models and sovereign runtime endpoints.
        </p>
      </div>

      <APIKeysTable />
    </div>
  );
}