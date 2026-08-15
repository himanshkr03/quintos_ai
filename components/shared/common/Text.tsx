import { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface TextProps {
  children: ReactNode;
  className?: string;
}

export default function Text({
  children,
  className,
}: TextProps) {
  return (
    <p
      className={cn(
        "text-gray-600 leading-7",
        className
      )}
    >
      {children}
    </p>
  );
}