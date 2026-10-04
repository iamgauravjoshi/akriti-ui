import { forwardRef, type ReactNode } from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "../../lib/cn";
import { resolveIntent } from "../../lib/variants";
import type { SemanticIntent, Size } from "../../types/common";
import { Spinner } from "../feedback/Spinner";

export type SwitchSize = Extract<Size, "sm" | "md" | "lg">;

export type SwitchProps = SwitchPrimitive.SwitchProps & {
  label?: ReactNode;
  labelPosition?: "left" | "right";
  size?: SwitchSize;
  intent?: SemanticIntent;
  color?: SemanticIntent;
  loading?: boolean;
};

const sizeClasses: Record<
  SwitchSize,
  { root: string; thumb: string; translate: string }
> = {
  sm: {
    root: "h-5 w-9",
    thumb: "h-4 w-4",
    translate: "data-[state=checked]:translate-x-4",
  },
  md: {
    root: "h-6 w-11",
    thumb: "h-5 w-5",
    translate: "data-[state=checked]:translate-x-5",
  },
  lg: {
    root: "h-7 w-12",
    thumb: "h-6 w-6",
    translate: "data-[state=checked]:translate-x-5",
  },
};

const checkedTone: Record<Exclude<SemanticIntent, "error">, string> = {
  default: "data-[state=checked]:bg-primary",
  success: "data-[state=checked]:bg-success",
  warning: "data-[state=checked]:bg-warning",
  danger: "data-[state=checked]:bg-danger",
  info: "data-[state=checked]:bg-info",
};

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      label,
      labelPosition = "right",
      size = "md",
      intent,
      color,
      loading = false,
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    const resolved = resolveIntent(intent ?? color ?? "default");
    const sizes = sizeClasses[size];
    const isDisabled = disabled || loading;

    return (
      <label
        className={cn(
          "inline-flex items-center gap-2 text-sm text-foreground",
          labelPosition === "left" && "flex-row-reverse",
          isDisabled && "cursor-not-allowed opacity-50",
          className,
        )}
      >
        <SwitchPrimitive.Root
          ref={ref}
          disabled={isDisabled}
          className={cn(
            "relative inline-flex shrink-0 cursor-pointer rounded-full border border-transparent bg-muted transition-colors",
            "focus-visible:ring-2 focus-visible:ring-focus/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
            "disabled:cursor-not-allowed",
            sizes.root,
            checkedTone[resolved],
          )}
          {...props}
        >
          <SwitchPrimitive.Thumb
            className={cn(
              "pointer-events-none block translate-x-0.5 rounded-full bg-surface shadow-sm ring-0 transition-transform",
              sizes.thumb,
              sizes.translate,
              "flex items-center justify-center",
            )}
          >
            {loading ? <Spinner size="xs" label="" /> : null}
          </SwitchPrimitive.Thumb>
        </SwitchPrimitive.Root>
        {label ? <span>{label}</span> : null}
      </label>
    );
  },
);

Switch.displayName = "Switch";

/** @deprecated Use Switch */
export const Toggle = Switch;
export const ToggleButton = Switch;
