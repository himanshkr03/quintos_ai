import { ReactNode } from "react";
import clsx from "clsx";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({
  children,
  className,
}: GlassCardProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300",
        "hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl",
        className
      )}
    >
      {children}
    </div>
  );
}