"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";
import { ButtonProps, ButtonAsLink } from "./Button.types";
import { buttonBaseStyles, buttonVariants, buttonSizes } from "./Button.styles";

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    const {
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      className,
      children,
      ...rest
    } = props;

    const classes = cn(
      buttonBaseStyles,
      buttonVariants[variant],
      buttonSizes[size],
      loading && "pointer-events-none opacity-80",
      className
    );

    const content = (
      <>
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        {children && <span>{children}</span>}
        {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </>
    );

    if ("href" in props && props.href !== undefined) {
      const { href, ...linkRest } = rest as ButtonAsLink;
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...linkRest}
        >
          {content}
        </Link>
      );
    }

    const { disabled, type = "button", ...buttonRest } = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={disabled || loading}
        className={classes}
        {...buttonRest}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;