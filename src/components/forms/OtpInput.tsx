import {
  forwardRef,
  useRef,
  useState,
  type CSSProperties,
  type ClipboardEvent,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";

export type OtpInputProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "className" | "style" | "onChange"
> & {
  length?: number;
  value?: string;
  defaultValue?: string;
  label?: ReactNode;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  className?: string;
  style?: CSSProperties;
};

export const OtpInput = forwardRef<HTMLDivElement, OtpInputProps>(
  (
    {
      length = 6,
      value,
      defaultValue = "",
      label,
      disabled = false,
      onChange,
      onComplete,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const [internal, setInternal] = useState(defaultValue);
    const current = (value ?? internal).slice(0, length);
    const boxes = useRef<(HTMLInputElement | null)[]>([]);

    const commit = (next: string) => {
      if (value === undefined) setInternal(next);
      onChange?.(next);
      if (next.length === length) onComplete?.(next);
    };

    const setDigit = (index: number, digit: string) => {
      const chars = current.split("");
      chars[index] = digit;
      commit(chars.join("").slice(0, length));
    };

    const focusBox = (index: number) => {
      boxes.current[index]?.focus();
      boxes.current[index]?.select();
    };

    const onKeyDown = (index: number) => (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== "Backspace") return;
      if (current[index]) {
        setDigit(index, "");
      } else if (index > 0) {
        const chars = current.split("");
        chars[index - 1] = "";
        commit(chars.join(""));
        focusBox(index - 1);
      }
    };

    const onPaste = (event: ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault();
      const pasted = event.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, length);
      if (!pasted) return;
      commit(pasted);
      focusBox(Math.min(pasted.length, length - 1));
    };

    return (
      <div ref={ref} className={cn("space-y-1.5", className)} style={style} {...props}>
        {label ? (
          <span className="block text-sm font-medium text-foreground">{label}</span>
        ) : null}
        <div role="group" aria-label={typeof label === "string" ? label : "One-time code"} className="flex gap-2">
          {Array.from({ length }, (_, index) => (
            <input
              key={index}
              ref={(node) => {
                boxes.current[index] = node;
              }}
              type="text"
              inputMode="numeric"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              maxLength={1}
              aria-label={`Digit ${index + 1}`}
              disabled={disabled}
              value={current[index] ?? ""}
              onChange={(event) => {
                const digit = event.target.value.replace(/\D/g, "").slice(-1);
                if (!digit) {
                  setDigit(index, "");
                  return;
                }
                setDigit(index, digit);
                if (index < length - 1) focusBox(index + 1);
              }}
              onKeyDown={onKeyDown(index)}
              onPaste={onPaste}
              className="h-10 w-10 rounded-md border border-border bg-surface text-center text-sm text-foreground shadow-sm focus-visible:border-focus focus-visible:ring-2 focus-visible:ring-focus/40 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
          ))}
        </div>
      </div>
    );
  },
);

OtpInput.displayName = "OtpInput";
