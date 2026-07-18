import { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export default function Badge({
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700",
        className
      )}
    >
      {children}
    </span>
  );
}