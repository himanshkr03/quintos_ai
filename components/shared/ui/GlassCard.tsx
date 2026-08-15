import { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export default function GlassCard({
  children,
  className,
  hoverEffect = true,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-slate-200/80 bg-white/90 p-6 md:p-8 backdrop-blur-sm shadow-[0_1px_3px_rgba(0,0,0,0.04)]",
        hoverEffect &&
          "transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_12px_30px_-10px_rgba(37,99,235,0.12)]",
        className
      )}
    >
      {children}
    </div>
  );
}