import { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface BadgeProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "neutral" | "success" | "outline";
  size?: "sm" | "md";
  className?: string;
}

export default function Badge({
  children,
  variant = "primary",
  size = "md",
  className,
}: BadgeProps) {
  const variantStyles = {
    primary: "border-blue-200 bg-blue-50 text-blue-700",
    secondary: "border-purple-200 bg-purple-50 text-purple-700",
    neutral: "border-slate-200 bg-slate-100 text-slate-700",
    success: "border-emerald-200 bg-emerald-50 text-emerald-700",
    outline: "border-slate-300 bg-transparent text-slate-700",
  };

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3 py-1 text-xs",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}