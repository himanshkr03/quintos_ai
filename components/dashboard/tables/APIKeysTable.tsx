// File: E:\quintos_ai\components\dashboard\tables\APIKeysTable.tsx

const apiKeys = [
  {
    name: "Production Key",
    key: "sk_live_xxxxxxxxxxxx",
    created: "01 Aug 2026",
    status: "Active",
  },
  {
    name: "Development Key",
    key: "sk_test_xxxxxxxxxxxx",
    created: "20 Jul 2026",
    status: "Active",
  },
];

export default function APIKeysTable() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-gray-900">
        API Keys
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b">
            <tr>
              <th className="py-3 text-left">Name</th>
              <th className="py-3 text-left">API Key</th>
              <th className="py-3 text-left">Created</th>
              <th className="py-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {apiKeys.map((key) => (
              <tr
                key={key.name}
                className="border-b last:border-none"
              >
                <td className="py-4">{key.name}</td>
                <td className="py-4 font-mono text-sm">
                  {key.key}
                </td>
                <td className="py-4">{key.created}</td>
                <td className="py-4">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                    {key.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}