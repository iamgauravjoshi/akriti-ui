import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { useFormField } from "./FormFieldContext";

export type RadioOption = {
  label: ReactNode;
  value: string;
  disabled?: boolean;
};

export type RadioGroupProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "size"
> & {
  options: RadioOption[];
  legend?: ReactNode;
};

export const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  (
    { options, legend, className, name, disabled, id, value, defaultValue, ...props },
    ref,
  ) => {
    const field = useFormField();
    const groupName = name ?? field?.name;
    const groupId = id ?? field?.id;

    return (
      <fieldset
        className={cn("space-y-2", className)}
        id={groupId}
        aria-invalid={field?.error ? true : undefined}
        aria-describedby={field?.error ? field.errorId : field?.descriptionId}
      >
        {legend ? (
          <legend className="text-sm font-medium text-foreground">{legend}</legend>
        ) : null}
        <div className="space-y-2" role="radiogroup">
          {options.map((option, index) => (
            <label
              key={option.value}
              className={cn(
                "flex items-center gap-2 text-sm text-foreground",
                (disabled || option.disabled) && "cursor-not-allowed opacity-50",
              )}
            >
              <input
                ref={index === 0 ? ref : undefined}
                type="radio"
                name={groupName}
                value={option.value}
                checked={value !== undefined ? value === option.value : undefined}
                defaultChecked={
                  defaultValue !== undefined ? defaultValue === option.value : undefined
                }
                disabled={disabled || option.disabled}
                className="h-4 w-4 border-border text-primary accent-primary focus-visible:ring-2 focus-visible:ring-focus/40"
                {...props}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
    );
  },
);

RadioGroup.displayName = "RadioGroup";
