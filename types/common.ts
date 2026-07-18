// types/common.ts

import { ReactNode } from "react";

export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

export interface ButtonProps extends BaseComponentProps {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "destructive";

  size?:
    | "sm"
    | "md"
    | "lg";

  disabled?: boolean;
}