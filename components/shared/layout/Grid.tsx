import { cn } from "@/utils/cn";
import { ReactNode } from "react";

interface GridProps {
  children: ReactNode;
  className?: string;
}

export default function Grid({
  children,
  className,
}: GridProps) {
  return (
    <div
      className={cn(
        "grid gap-6",
        className
      )}
    >
      {children}
    </div>
  );
}