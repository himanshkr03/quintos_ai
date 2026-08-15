// File: E:\quintos_ai\components\dashboard\widgets\RecentActivity.tsx

const activities = [
  "Created a new AI project",
  "Generated an API key",
  "Updated billing information",
  "Started an AI chat session",
  "Uploaded a training dataset",
];

export default function RecentActivity() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-gray-900">
        Recent Activity
      </h2>

      <div className="space-y-5">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start gap-4"
          >
            <div className="mt-2 h-3 w-3 rounded-full bg-blue-600" />

            <div>
              <p className="font-medium text-gray-900">
                {activity}
              </p>

              <span className="text-sm text-gray-500">
                Just now
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}