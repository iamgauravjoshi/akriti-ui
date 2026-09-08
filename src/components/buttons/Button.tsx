import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { resolveIntent } from "../../lib/variants";
import type { SemanticIntent, Size } from "../../types/common";
import { Spinner } from "../feedback/Spinner";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "text"
  | "link";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  intent?: SemanticIntent;
  color?: SemanticIntent;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loadingText?: string;
};

const sizeClasses: Record<Size, string> = {
  xs: "h-7 px-2 text-xs gap-1",
  sm: "h-8 px-3 text-sm gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-11 px-5 text-base gap-2",
  xl: "h-12 px-6 text-lg gap-2.5",
};

function variantClasses(
  variant: ButtonVariant,
  intent: Exclude<SemanticIntent, "error">,
): string {
  const tone = {
    default: {
      solid: "bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:ring-focus",
      subtle: "bg-secondary text-secondary-foreground hover:bg-muted",
      outline:
        "border border-border text-foreground hover:bg-muted",
      ghost: "text-foreground hover:bg-muted",
      text: "text-foreground hover:underline",
      link: "text-primary hover:underline",
    },
    success: {
      solid: "bg-success text-success-foreground hover:opacity-90 focus-visible:ring-success",
      subtle: "bg-success-subtle text-success hover:opacity-90",
      outline: "border border-success text-success hover:bg-success-subtle",
      ghost: "text-success hover:bg-success-subtle",
      text: "text-success hover:underline",
      link: "text-success hover:underline",
    },
    warning: {
      solid: "bg-warning text-warning-foreground hover:opacity-90 focus-visible:ring-warning",
      subtle: "bg-warning-subtle text-warning hover:opacity-90",
      outline: "border border-warning text-warning hover:bg-warning-subtle",
      ghost: "text-warning hover:bg-warning-subtle",
      text: "text-warning hover:underline",
      link: "text-warning hover:underline",
    },
    danger: {
      solid: "bg-danger text-danger-foreground hover:opacity-90 focus-visible:ring-danger",
      subtle: "bg-danger-subtle text-danger hover:opacity-90",
      outline: "border border-danger text-danger hover:bg-danger-subtle",
      ghost: "text-danger hover:bg-danger-subtle",
      text: "text-danger hover:underline",
      link: "text-danger hover:underline",
    },
    info: {
      solid: "bg-info text-info-foreground hover:opacity-90 focus-visible:ring-info",
      subtle: "bg-info-subtle text-info hover:opacity-90",
      outline: "border border-info text-info hover:bg-info-subtle",
      ghost: "text-info hover:bg-info-subtle",
      text: "text-info hover:underline",
      link: "text-info hover:underline",
    },
  }[intent];

  switch (variant) {
    case "primary":
      return tone.solid;
    case "secondary":
      return tone.subtle;
    case "outline":
      return tone.outline;
    case "ghost":
      return tone.ghost;
    case "text":
      return tone.text;
    case "link":
      return cn(tone.link, "h-auto px-0");
    default:
      return tone.solid;
  }
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      intent,
      color,
      size = "md",
      loading = false,
      disabled = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      children,
      loadingText,
      className,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const resolved = resolveIntent(intent ?? color ?? "default");
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors",
          "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
          "disabled:pointer-events-none disabled:opacity-50",
          sizeClasses[size],
          variantClasses(variant, resolved),
          fullWidth && "w-full",
          className,
        )}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        aria-disabled={isDisabled || undefined}
        {...props}
      >
        {loading ? (
          <>
            <Spinner size={size === "xs" ? "xs" : "sm"} />
            {loadingText ?? children}
          </>
        ) : (
          <>
            {leftIcon ? <span className="inline-flex shrink-0">{leftIcon}</span> : null}
            {children}
            {rightIcon ? (
              <span className="inline-flex shrink-0">{rightIcon}</span>
            ) : null}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
