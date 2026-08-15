import APIKeysTable from "@/components/dashboard/tables/APIKeysTable";

export const metadata = {
  title: "API Keys | Quintos AI",
  description: "Manage your API keys for Quintos AI services.",
};

export default function ApiKeysPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">API Keys</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage and generate secret API keys to authenticate requests to Quintos AI APIs.
        </p>
      </div>

      <APIKeysTable />
    </div>
  );
}