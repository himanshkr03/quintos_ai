"use client";

import { forwardRef } from "react";

import { cn } from "@/utils/cn";

import { InputProps } from "./Input.types";
import { inputStyles } from "./Input.styles";

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium">
            {label}
          </label>
        )}

        <input
          ref={ref}
          className={cn(
            inputStyles.base,
            inputStyles.focus,
            error && inputStyles.error,
            className
          )}
          {...props}
        />

        {helperText && !error && (
          <p className="text-xs text-slate-500">
            {helperText}
          </p>
        )}

        {error && (
          <p className="text-xs text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;