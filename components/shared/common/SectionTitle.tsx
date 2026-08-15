import { cn } from "@/utils/cn";

interface SectionTitleProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionTitle({
  badge,
  title,
  description,
  align = "center",
  className,
}: SectionTitleProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "mb-14 md:mb-16 flex flex-col",
        isCenter ? "items-center text-center mx-auto max-w-3xl" : "items-start text-left max-w-2xl",
        className
      )}
    >
      {/* Eyebrow Badge */}
      {badge && (
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700 shadow-sm backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
          <span>{badge}</span>
        </div>
      )}

      {/* Heading */}
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-[1.15]">
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
          {description}
        </p>
      )}
    </div>
  );
}