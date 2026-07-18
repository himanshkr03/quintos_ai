import { cn } from "@/utils/cn";
import { ReactNode } from "react";

interface MaxWidthProps {
  children: ReactNode;
  className?: string;
}

export default function MaxWidth({
  children,
  className,
}: MaxWidthProps) {
  return (
    <div
      className={cn(
        "max-w-4xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}