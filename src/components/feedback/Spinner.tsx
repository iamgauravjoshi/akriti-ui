import { cn } from "../../lib/cn";
import type { Size } from "../../types/common";

export type SpinnerProps = {
  size?: Size;
  label?: string;
  className?: string;
};

const sizeClasses: Record<Size, string> = {
  xs: "h-3 w-3 border",
  sm: "h-3.5 w-3.5 border-2",
  md: "h-4 w-4 border-2",
  lg: "h-5 w-5 border-2",
  xl: "h-8 w-8 border-[3px]",
};

export function Spinner({
  size = "md",
  label = "Loading",
  className,
}: SpinnerProps) {
  return (
    <span className={cn("inline-flex items-center justify-center", className)}>
      <span
        className={cn(
          "animate-spin rounded-full border-current border-t-transparent",
          sizeClasses[size],
        )}
        aria-hidden
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}

export const RingSpinner = (props: SpinnerProps) => (
  <Spinner size="xl" {...props} />
);
