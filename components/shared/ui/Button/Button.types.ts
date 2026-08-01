import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "destructive";

  size?: "sm" | "md" | "lg";

  loading?: boolean;

  leftIcon?: ReactNode;

  rightIcon?: ReactNode;
}