import { Activity } from "lucide-react";
import { cn } from "@/utils/cn";

export interface ActivityCardProps {
  title: string;
  description: string;
  time: string;
  className?: string;
}

export default function ActivityCard({
  title,
  description,
  time,
  className,
}: ActivityCardProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm",
        className
      )}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        <Activity className="h-5 w-5" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-base font-semibold text-gray-900 truncate">
            {title}
          </h4>
          <span className="text-xs text-gray-400 shrink-0">{time}</span>
        </div>
        <p className="mt-1 text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
