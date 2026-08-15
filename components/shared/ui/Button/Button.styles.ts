import { ButtonVariant, ButtonSize } from "./Button.types";

export const buttonBaseStyles =
  "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 select-none cursor-pointer";

export const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm",
  secondary: "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 shadow-sm",
  outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100 shadow-sm",
  ghost: "text-gray-700 hover:bg-gray-100 active:bg-gray-200",
  destructive: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm",
  white: "bg-white text-blue-600 hover:bg-gray-100 active:bg-gray-200 shadow-sm",
};

export const buttonSizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-xs gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-12 px-7 text-base gap-2.5",
};