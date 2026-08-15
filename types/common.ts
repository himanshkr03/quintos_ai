// types/common.ts

import { ReactNode } from "react";

export interface ChildrenProps {
  children: ReactNode;
}

export interface SectionTitleProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export interface ButtonProps {
  children: ReactNode;
}

export interface CardProps {
  title: string;
  description: string;
}