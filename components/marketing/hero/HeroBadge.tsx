import { Sparkles } from "lucide-react";

export default function HeroBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700 shadow-sm backdrop-blur-md">
      <span className="flex h-1.5 w-1.5 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-600" />
      </span>
      <span className="flex items-center gap-1.5">
        <Sparkles className="h-3 w-3 text-blue-600" />
        AI Research Laboratory & Applied Computing
      </span>
    </div>
  );
}