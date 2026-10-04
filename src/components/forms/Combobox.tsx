import {
  forwardRef,
  useId,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "../../lib/cn";
import { fieldChrome } from "../../lib/variants";
import { useFormField } from "./FormFieldContext";

export type ComboboxOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type ComboboxProps = {
  options?: ComboboxOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  label?: ReactNode;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  error?: string | boolean | null;
  touched?: boolean;
  name?: string;
  id?: string;
  className?: string;
  style?: CSSProperties;
};

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(
  (
    {
      options = [],
      value,
      defaultValue = "",
      onChange,
      label,
      required,
      placeholder = "Type to search...",
      disabled = false,
      clearable = false,
      error,
      touched,
      name,
      id,
      className,
      style,
    },
    ref,
  ) => {
    const field = useFormField();
    const reactId = useId();
    const inputId = id ?? field?.id ?? reactId;
    const listboxId = `${inputId}-listbox`;
    const invalid = Boolean(error) && (touched ?? true);

    const [internal, setInternal] = useState(defaultValue);
    const current = value ?? internal;
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [highlighted, setHighlighted] = useState(-1);

    const selected = options.find((option) => option.value === current);
    const shown = open ? query : (selected?.label ?? "");
    const filtered = options.filter((option) =>
      option.label.toLowerCase().includes(query.toLowerCase()),
    );

    const commit = (next: string) => {
      if (value === undefined) setInternal(next);
      onChange?.(next);
    };

    const choose = (option: ComboboxOption) => {
      if (option.disabled) return;
      commit(option.value);
      setQuery("");
      setHighlighted(-1);
      setOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        if (!open) {
          setOpen(true);
        } else {
          setHighlighted((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
        }
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        if (open) {
          setHighlighted((prev) =>
            prev > 0 ? prev - 1 : filtered.length - 1,
          );
        }
      } else if (event.key === "Enter") {
        if (open && highlighted >= 0 && filtered[highlighted]) {
          event.preventDefault();
          choose(filtered[highlighted]);
        }
      } else if (event.key === "Escape") {
        setOpen(false);
        setQuery("");
        setHighlighted(-1);
      }
    };

    const errorText = typeof error === "string" ? error : undefined;

    return (
      <div className={cn("space-y-1.5", className)} style={style}>
        {label ? (
          <label htmlFor={inputId} className="block text-sm font-medium text-foreground">
            {label}
            {required ? (
              <span className="ml-0.5 text-danger" aria-hidden>
                *
              </span>
            ) : null}
          </label>
        ) : null}
        <div
          className="relative"
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) {
              setOpen(false);
              setQuery("");
              setHighlighted(-1);
            }
          }}
        >
          <input
            ref={ref}
            id={inputId}
            role="combobox"
            aria-expanded={open}
            aria-controls={listboxId}
            aria-activedescendant={
              open && highlighted >= 0
                ? `${listboxId}-option-${highlighted}`
                : undefined
            }
            aria-autocomplete="list"
            aria-invalid={invalid || undefined}
            data-name={name ?? field?.name}
            disabled={disabled}
            placeholder={placeholder}
            value={shown}
            onChange={(event) => {
              setQuery(event.target.value);
              setHighlighted(-1);
              setOpen(true);
            }}
            onFocus={() => {
              if (!disabled) setOpen(true);
            }}
            onKeyDown={onKeyDown}
            className={cn(fieldChrome(invalid), "h-10 px-3 py-2 pr-16 text-sm")}
          />
          <div className="absolute top-1/2 right-2 flex -translate-y-1/2 items-center gap-1 text-muted-foreground">
            {clearable && current && !disabled ? (
              <button
                type="button"
                aria-label="Clear selection"
                onClick={() => {
                  commit("");
                  setQuery("");
                }}
                className="rounded p-1 hover:bg-muted"
              >
                <X size={14} />
              </button>
            ) : null}
            <ChevronDown size={14} aria-hidden />
          </div>
          {open ? (
            <div className="absolute z-50 mt-1 max-h-50 w-full overflow-y-auto rounded-md border border-border bg-surface shadow-lg">
              {filtered.length === 0 ? (
                <div className="px-3 py-2 text-center text-sm text-muted-foreground">
                  No options found
                </div>
              ) : (
                <div id={listboxId} role="listbox">
                  {filtered.map((option, index) => (
                    <div
                      key={option.value}
                      id={`${listboxId}-option-${index}`}
                      role="option"
                      aria-selected={option.value === current}
                      aria-disabled={option.disabled || undefined}
                      className={cn(
                        "flex cursor-pointer items-center justify-between px-3 py-2 text-sm",
                        option.disabled && "cursor-not-allowed text-disabled",
                        index === highlighted && "bg-primary text-primary-foreground",
                        option.value === current &&
                          index !== highlighted &&
                          "bg-info-subtle text-info",
                        option.value !== current &&
                          index !== highlighted &&
                          "hover:bg-muted",
                      )}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        choose(option);
                      }}
                    >
                      <span className="truncate">{option.label}</span>
                      {option.value === current ? <Check size={16} /> : null}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </div>
        {errorText && invalid ? (
          <p className="text-sm text-danger" role="alert">
            {errorText}
          </p>
        ) : null}
      </div>
    );
  },
);

Combobox.displayName = "Combobox";
