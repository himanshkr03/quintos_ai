import { Cpu } from "lucide-react";
import { cn } from "@/utils/cn";

export interface ModelCardProps {
  name: string;
  provider: string;
  description: string;
  status?: "active" | "standby" | "deprecated";
  className?: string;
}

export default function ModelCard({
  name,
  provider,
  description,
  status = "active",
  className,
}: ModelCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-blue-500 hover:shadow-md",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <Cpu className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-gray-900">{name}</h4>
            <span className="text-xs text-gray-500">{provider}</span>
          </div>
        </div>

        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize",
            status === "active" && "bg-emerald-50 text-emerald-700",
            status === "standby" && "bg-amber-50 text-amber-700",
            status === "deprecated" && "bg-gray-100 text-gray-700"
          )}
        >
          {status}
        </span>
      </div>

      <p className="mt-4 text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
