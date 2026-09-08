import { forwardRef, type ReactNode, type TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { fieldChrome } from "../../lib/variants";
import { useFormField } from "./FormFieldContext";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: boolean;
  leftIcon?: ReactNode;
  fullWidth?: boolean;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      error,
      disabled,
      leftIcon,
      fullWidth = true,
      className,
      id,
      rows = 4,
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
          <span className="pointer-events-none absolute top-3 left-3 text-muted-foreground">
            {leftIcon}
          </span>
        ) : null}
        <textarea
          ref={ref}
          id={inputId}
          disabled={disabled}
          rows={rows}
          aria-invalid={invalid || undefined}
          aria-describedby={
            field?.error ? field.errorId : field?.descriptionId
          }
          className={cn(
            fieldChrome(invalid),
            "min-h-24 px-3 py-2 text-sm",
            leftIcon && "pl-10",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
