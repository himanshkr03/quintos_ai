// File: E:\quintos_ai\components\dashboard\charts\ActivityChart.tsx

export default function ActivityChart() {
  const activities = [
    40,
    65,
    55,
    80,
    60,
    75,
    95,
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-xl font-semibold text-gray-900">
        User Activity
      </h3>

      <div className="flex h-64 items-end justify-between gap-3">
        {activities.map((value, index) => (
          <div
            key={index}
            className="flex-1 rounded-t-xl bg-violet-600 transition hover:bg-violet-700"
            style={{
              height: `${value}%`,
            }}
          />
        ))}
      </div>

      <div className="mt-4 flex justify-between text-sm text-gray-500">
        <span>1</span>
        <span>5</span>
        <span>10</span>
        <span>15</span>
        <span>20</span>
        <span>25</span>
        <span>30</span>
      </div>
    </div>
  );
}