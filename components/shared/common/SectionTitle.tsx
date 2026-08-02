interface SectionTitleProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionTitle({
  badge,
  title,
  description,
  align = "center",
}: SectionTitleProps) {
  const alignment =
    align === "center"
      ? "items-center text-center"
      : "items-start text-left";

  return (
    <div className={`mb-16 flex flex-col ${alignment}`}>
      {/* Badge */}
      {badge && (
        <span className="mb-4 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-sm font-semibold text-blue-700">
          {badge}
        </span>
      )}

      {/* Heading */}
      <h2 className="max-w-4xl text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
          {description}
        </p>
      )}
    </div>
  );
}