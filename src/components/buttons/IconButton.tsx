import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import { Button, type ButtonProps } from "./Button";

const iconSizeClasses = {
  xs: "h-7 w-7 p-0",
  sm: "h-8 w-8 p-0",
  md: "h-10 w-10 p-0",
  lg: "h-11 w-11 p-0",
  xl: "h-12 w-12 p-0",
} as const;

export type IconButtonProps = Omit<ButtonProps, "leftIcon" | "rightIcon" | "fullWidth"> & {
  "aria-label": string;
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ size = "md", className, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        size={size}
        className={cn(iconSizeClasses[size], className)}
        {...props}
      >
        {children}
      </Button>
    );
  },
);

IconButton.displayName = "IconButton";
