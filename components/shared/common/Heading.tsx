import { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface HeadingProps {
  children: ReactNode;
  className?: string;
}

export default function Heading({
  children,
  className,
}: HeadingProps) {
  return (
    <h2
      className={cn(
        "font-heading text-4xl font-bold tracking-tight",
        className
      )}
    >
      {children}
    </h2>
  );
}