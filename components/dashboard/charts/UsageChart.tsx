// File: E:\quintos_ai\components\dashboard\charts\UsageChart.tsx

export default function UsageChart() {
  const data = [35, 55, 45, 70, 60, 85, 75];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-xl font-semibold text-gray-900">
        AI Usage
      </h3>

      <div className="flex h-64 items-end justify-between gap-3">
        {data.map((value, index) => (
          <div
            key={index}
            className="flex-1 rounded-t-xl bg-blue-600 transition-all hover:bg-blue-700"
            style={{
              height: `${value}%`,
            }}
          />
        ))}
      </div>

      <div className="mt-4 flex justify-between text-sm text-gray-500">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>
    </div>
  );
}