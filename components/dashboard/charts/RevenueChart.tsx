// File: E:\quintos_ai\components\dashboard\charts\RevenueChart.tsx

export default function RevenueChart() {
  const revenue = [20, 35, 45, 55, 70, 90];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-xl font-semibold text-gray-900">
        Revenue
      </h3>

      <div className="flex h-64 items-end justify-between gap-4">
        {revenue.map((item, index) => (
          <div
            key={index}
            className="flex-1 rounded-t-xl bg-green-500 transition hover:bg-green-600"
            style={{
              height: `${item}%`,
            }}
          />
        ))}
      </div>

      <div className="mt-4 flex justify-between text-sm text-gray-500">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
      </div>
    </div>
  );
}