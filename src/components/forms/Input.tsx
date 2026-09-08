import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { fieldChrome, fieldSizeClasses } from "../../lib/variants";
import type { Size } from "../../types/common";
import { useFormField } from "./FormFieldContext";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  size?: Size;
  error?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = "md",
      error,
      disabled,
      leftIcon,
      rightIcon,
      fullWidth = true,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const field = useFormField();
    const invalid = error ?? Boolean(field?.error);
    const inputId = id ?? field?.id;

    return (
      <div className={cn("relative", fullWidth && "w-full")}>
        {leftIcon ? (
          <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground">
            {leftIcon}
          </span>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-describedby={
            field?.error ? field.errorId : field?.descriptionId
          }
          className={cn(
            fieldChrome(invalid),
            fieldSizeClasses[size],
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            className,
          )}
          {...props}
        />
        {rightIcon ? (
          <span className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground">
            {rightIcon}
          </span>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";
