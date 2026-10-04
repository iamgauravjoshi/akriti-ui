import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { useFormField } from "./FormFieldContext";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> & {
  label?: ReactNode;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, disabled, ...props }, ref) => {
    const field = useFormField();
    const inputId = id ?? field?.id;

    return (
      <label
        className={cn(
          "inline-flex items-start gap-2 text-sm text-foreground",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
      >
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          disabled={disabled}
          aria-invalid={field?.error ? true : undefined}
          aria-describedby={field?.error ? field.errorId : field?.descriptionId}
          className="mt-0.5 h-4 w-4 rounded border-border text-primary accent-primary focus-visible:ring-2 focus-visible:ring-focus/40 focus-visible:outline-none"
          {...props}
        />
        {label ? <span>{label}</span> : null}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";
