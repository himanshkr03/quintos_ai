import { cn } from "@/utils/cn";

export interface UsageCardProps {
  title: string;
  used: number;
  total: number;
  unit?: string;
  className?: string;
}

export default function UsageCard({
  title,
  used,
  total,
  unit = "%",
  className,
}: UsageCardProps) {
  const percentage = total > 0 ? Math.min(Math.round((used / total) * 100), 100) : 0;

  return (
    <div
      className={cn(
        "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        <span className="text-sm font-medium text-gray-500">
          {used} / {total} {unit}
        </span>
      </div>

      <div className="mt-4">
        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              percentage >= 90
                ? "bg-rose-500"
                : percentage >= 75
                ? "bg-amber-500"
                : "bg-blue-600"
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
        <span>{percentage}% utilized</span>
        <span>{100 - percentage}% remaining</span>
      </div>
    </div>
  );
}
