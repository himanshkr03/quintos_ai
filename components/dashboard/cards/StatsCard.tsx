import { LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";

export interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  className?: string;
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  change,
  className,
}: StatsCardProps) {
  const isPositive = change?.startsWith("+");
  const isNegative = change?.startsWith("-");

  return (
    <div
      className={cn(
        "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <span className="text-3xl font-bold tracking-tight text-gray-900">
          {value}
        </span>
        {change && (
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
              isPositive && "bg-emerald-50 text-emerald-700",
              isNegative && "bg-rose-50 text-rose-700",
              !isPositive && !isNegative && "bg-gray-100 text-gray-700"
            )}
          >
            {change}
          </span>
        )}
      </div>
    </div>
  );
}
