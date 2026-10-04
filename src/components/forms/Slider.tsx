import {
  forwardRef,
  useId,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";

export type SliderProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "size" | "value" | "defaultValue" | "onChange"
> & {
  label?: ReactNode;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
  showValue?: boolean;
};

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      label,
      value,
      defaultValue = 50,
      min = 0,
      max = 100,
      step = 1,
      onValueChange,
      showValue = true,
      disabled,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const [internal, setInternal] = useState(defaultValue);
    const current = value ?? internal;
    const reactId = useId();
    const inputId = id ?? reactId;

    return (
      <div className={cn("space-y-1.5", className)}>
        {label || showValue ? (
          <div className="flex items-center justify-between gap-2 text-sm">
            {label ? (
              <label htmlFor={inputId} className="font-medium text-foreground">
                {label}
              </label>
            ) : (
              <span />
            )}
            {showValue ? (
              <span className="text-muted-foreground">{current}</span>
            ) : null}
          </div>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          type="range"
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          value={current}
          onChange={(event) => {
            const next = Number(event.target.value);
            if (value === undefined) setInternal(next);
            onValueChange?.(next);
          }}
          className="w-full accent-primary disabled:cursor-not-allowed disabled:opacity-50"
          {...props}
        />
      </div>
    );
  },
);

Slider.displayName = "Slider";
