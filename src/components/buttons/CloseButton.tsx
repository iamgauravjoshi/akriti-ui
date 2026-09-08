import { forwardRef } from "react";
import { X } from "lucide-react";
import { IconButton, type IconButtonProps } from "./IconButton";

export type CloseButtonProps = Omit<IconButtonProps, "aria-label" | "children"> & {
  onClose?: () => void;
  ariaLabel?: string;
};

const iconPx = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
} as const;

export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(
  (
    {
      onClose,
      onClick,
      ariaLabel = "Close",
      size = "sm",
      variant = "ghost",
      ...props
    },
    ref,
  ) => {
    return (
      <IconButton
        ref={ref}
        aria-label={ariaLabel}
        size={size}
        variant={variant}
        onClick={onClose ?? onClick}
        {...props}
      >
        <X size={iconPx[size]} />
      </IconButton>
    );
  },
);

CloseButton.displayName = "CloseButton";
