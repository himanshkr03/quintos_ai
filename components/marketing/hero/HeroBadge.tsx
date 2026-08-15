import { Sparkles } from "lucide-react";

export default function HeroBadge() {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-blue-200/80 bg-blue-50/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700 shadow-sm backdrop-blur-md">
      <span className="flex h-2 w-2 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
      </span>
      <span className="flex items-center gap-1.5">
        <Sparkles className="h-3.5 w-3.5 text-blue-600" />
        Advanced AI Research & Enterprise Intelligence
      </span>
    </div>
  );
}