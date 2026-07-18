export default function HeroStats() {
  const stats = [
    {
      number: "50+",
      label: "AI Solutions",
    },
    {
      number: "20+",
      label: "Research Projects",
    },
    {
      number: "100%",
      label: "Innovation",
    },
  ];

  return (
    <div className="mt-14 grid grid-cols-3 gap-8">
      {stats.map((item) => (
        <div key={item.label}>
          <h3 className="text-3xl font-bold">
            {item.number}
          </h3>

          <p className="text-gray-500">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}