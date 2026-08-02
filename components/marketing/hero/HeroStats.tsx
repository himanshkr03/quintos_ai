// File: E:\quintos_ai\components\marketing\hero\HeroStats.tsx

const stats = [
  {
    value: "50+",
    label: "AI Projects",
  },
  {
    value: "20+",
    label: "Research Works",
  },
  {
    value: "99%",
    label: "Client Satisfaction",
  },
  {
    value: "10+",
    label: "Enterprise Solutions",
  },
];

export default function HeroStats() {
  return (
    <div className="mt-16 grid w-full max-w-4xl grid-cols-2 gap-8 border-t border-gray-200 pt-10 md:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="text-center"
        >
          <h3 className="text-3xl font-bold text-blue-600 md:text-4xl">
            {stat.value}
          </h3>

          <p className="mt-2 text-sm text-gray-600">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}