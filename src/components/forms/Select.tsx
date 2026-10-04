import {
  useCallback,
  useDeferredValue,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
} from "react";
import { Check, ChevronDown, ChevronUp, CircleAlert, X } from "lucide-react";
import { cn } from "../../lib/cn";
import { fieldChrome } from "../../lib/variants";
import { Spinner } from "../feedback/Spinner";
import { useFormField } from "./FormFieldContext";

export type Option<T extends string | number = string | number> = {
  label: string;
  value: T;
  disabled?: boolean;
};

type SelectBaseProps<T extends string | number> = {
  label?: string;
  required?: boolean;
  icon?: ReactElement;
  options?: Option<T>[];
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  searchable?: boolean;
  loading?: boolean;
  loadOptions?: (inputValue: string) => Promise<Option<T>[]>;
  maxHeight?: string;
  className?: string;
  style?: CSSProperties;
  error?: string | boolean | null;
  touched?: boolean;
  name?: string;
  id?: string;
};

export type SingleSelectProps<T extends string | number = string | number> =
  SelectBaseProps<T> & {
    multiple?: false;
    value?: T | "";
    onChange?: (value: T | "") => void;
  };

export type MultiSelectProps<T extends string | number = string | number> =
  SelectBaseProps<T> & {
    multiple: true;
    value?: T[];
    onChange?: (value: T[]) => void;
  };

export type SelectProps<T extends string | number = string | number> =
  | SingleSelectProps<T>
  | MultiSelectProps<T>;

export function Select<T extends string | number = string | number>(
  props: SelectProps<T>,
) {
  const {
    label,
    required,
    icon,
    options = [],
    placeholder = "Select an option...",
    disabled = false,
    clearable = false,
    searchable = false,
    loading = false,
    loadOptions,
    maxHeight = "200px",
    className,
    style,
    error,
    touched,
    name,
    id,
    multiple = false,
    value,
    onChange,
  } = props;

  const field = useFormField();
  const reactId = useId();
  const selectId = id ?? field?.id ?? reactId;
  const listboxId = `${selectId}-listbox`;
  const invalid = Boolean(error) && (touched ?? true);

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [asyncOptions, setAsyncOptions] = useState<Option<T>[]>([]);
  const [isLoadingAsync, setIsLoadingAsync] = useState(false);
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const initialLoadDoneRef = useRef(false);

  const allOptions = useMemo(
    () => (loadOptions ? asyncOptions : options),
    [options, asyncOptions, loadOptions],
  );

  const filteredOptions = useMemo(() => {
    if (!searchable || !deferredSearchTerm) return allOptions;
    return allOptions.filter((option) =>
      option.label.toLowerCase().includes(deferredSearchTerm.toLowerCase()),
    );
  }, [allOptions, deferredSearchTerm, searchable]);

  const selectedOptions = useMemo(() => {
    if (value === undefined || value === "") return [];
    const values = Array.isArray(value) ? value : [value];
    return allOptions.filter((option) => values.includes(option.value));
  }, [value, allOptions]);

  const handleAsyncLoad = useCallback(
    async (inputValue: string) => {
      if (!loadOptions) return;
      setIsLoadingAsync(true);
      try {
        const next = await loadOptions(inputValue);
        setAsyncOptions(next);
      } finally {
        setIsLoadingAsync(false);
      }
    },
    [loadOptions],
  );

  const emitChange = (next: T | T[] | "") => {
    onChange?.(next as never);
  };

  const handleOptionSelect = (option: Option<T>) => {
    if (option.disabled) return;
    if (multiple) {
      const current = Array.isArray(value) ? value : [];
      const next = current.includes(option.value)
        ? current.filter((item) => item !== option.value)
        : [...current, option.value];
      emitChange(next);
    } else {
      emitChange(option.value);
      setIsOpen(false);
      setSearchTerm("");
    }
  };

  const handleClear = (event: MouseEvent) => {
    event.stopPropagation();
    emitChange(multiple ? [] : "");
    setSearchTerm("");
  };

  const handleRemoveItem = (valueToRemove: T, event: MouseEvent) => {
    event.stopPropagation();
    if (!multiple || !Array.isArray(value)) return;
    emitChange(value.filter((item) => item !== valueToRemove));
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (disabled) return;
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) setIsOpen(true);
        else {
          setHighlightedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : 0,
          );
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (isOpen) {
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredOptions.length - 1,
          );
        }
        break;
      case "Enter":
        event.preventDefault();
        if (isOpen && highlightedIndex >= 0) {
          handleOptionSelect(filteredOptions[highlightedIndex]);
        } else if (!isOpen) {
          setIsOpen(true);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSearchTerm("");
        setHighlightedIndex(-1);
        break;
      case "Backspace":
        if (multiple && Array.isArray(value) && value.length > 0 && !searchTerm) {
          emitChange(value.slice(0, -1));
        }
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchable) searchInputRef.current?.focus();
  }, [isOpen, searchable]);

  useEffect(() => {
    initialLoadDoneRef.current = false;
  }, [loadOptions]);

  useEffect(() => {
    if (loadOptions && !initialLoadDoneRef.current) {
      initialLoadDoneRef.current = true;
      void handleAsyncLoad("");
    }
  }, [loadOptions, handleAsyncLoad]);

  useEffect(() => {
    if (highlightedIndex >= 0) {
      const node = optionsRef.current[highlightedIndex];
      if (node && typeof node.scrollIntoView === "function") {
        node.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex]);

  const hasValue = multiple
    ? Array.isArray(value) && value.length > 0
    : value !== undefined && value !== "";

  const errorText = typeof error === "string" ? error : undefined;

  return (
    <div className={cn("space-y-1.5", className)} style={style}>
      {label ? (
        <label htmlFor={selectId} className="block text-sm font-medium text-foreground">
          {label}
          {required ? (
            <span className="ml-0.5 text-danger" aria-hidden>
              *
            </span>
          ) : null}
        </label>
      ) : null}

      <div ref={containerRef} className="relative">
        {icon ? (
          <span className="pointer-events-none absolute top-1/2 left-3 z-10 -translate-y-1/2 text-muted-foreground">
            {icon}
          </span>
        ) : null}

        <div
          id={selectId}
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-activedescendant={
            isOpen && highlightedIndex >= 0
              ? `${listboxId}-option-${highlightedIndex}`
              : undefined
          }
          aria-haspopup="listbox"
          aria-invalid={invalid || undefined}
          aria-required={required || undefined}
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : 0}
          data-name={name ?? field?.name}
          className={cn(
            fieldChrome(invalid),
            "min-h-10 cursor-pointer px-3 py-2",
            disabled && "pointer-events-none",
            icon && "pl-10",
          )}
          onClick={() => !disabled && setIsOpen((open) => !open)}
          onKeyDown={handleKeyDown}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1">
              {multiple && selectedOptions.length > 0 ? (
                selectedOptions.map((option) => (
                  <span
                    key={String(option.value)}
                    className="inline-flex items-center gap-1 rounded-md bg-info-subtle px-2 py-0.5 text-xs text-info"
                  >
                    {option.label}
                    {!disabled ? (
                      <button
                        type="button"
                        onClick={(event) => handleRemoveItem(option.value, event)}
                        className="rounded-full p-0.5 hover:bg-surface"
                        aria-label={`Remove ${option.label}`}
                      >
                        <X size={12} />
                      </button>
                    ) : null}
                  </span>
                ))
              ) : (
                <span
                  className={cn(
                    "truncate",
                    selectedOptions.length === 0 && "text-muted-foreground",
                  )}
                >
                  {!multiple && selectedOptions[0]
                    ? selectedOptions[0].label
                    : placeholder}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              {clearable && hasValue && !disabled ? (
                <button
                  type="button"
                  onClick={handleClear}
                  className="rounded p-1 hover:bg-muted"
                  aria-label="Clear selection"
                >
                  <X size={14} />
                </button>
              ) : null}
              {loading || isLoadingAsync ? (
                <Spinner size="sm" />
              ) : isOpen ? (
                <ChevronUp size={14} />
              ) : (
                <ChevronDown size={14} />
              )}
            </div>
          </div>
        </div>

        {isOpen ? (
          <div
            className="absolute z-50 mt-1 w-full overflow-hidden rounded-md border border-border bg-surface shadow-lg"
            style={{ maxHeight }}
          >
            {searchable ? (
              <div className="border-b border-border p-2">
                <input
                  ref={searchInputRef}
                  type="search"
                  value={searchTerm}
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                    setHighlightedIndex(-1);
                    if (loadOptions) void handleAsyncLoad(event.target.value);
                  }}
                  placeholder="Search options..."
                  className={cn(fieldChrome(false), "h-8 px-2 text-sm")}
                  onClick={(event) => event.stopPropagation()}
                />
              </div>
            ) : null}

            <div
              className="overflow-y-auto"
              style={{
                maxHeight: `calc(${maxHeight} - ${searchable ? "52px" : "0px"})`,
              }}
            >
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-center text-sm text-muted-foreground">
                  {isLoadingAsync ? "Loading..." : "No options found"}
                </div>
              ) : (
                <div
                  id={listboxId}
                  role="listbox"
                  aria-multiselectable={multiple || undefined}
                >
                  {filteredOptions.map((option, index) => {
                    const isSelected = multiple
                      ? Array.isArray(value) && value.includes(option.value)
                      : value === option.value;
                    const isHighlighted = index === highlightedIndex;
                    return (
                      <div
                        key={String(option.value)}
                        id={`${listboxId}-option-${index}`}
                        ref={(node) => {
                          optionsRef.current[index] = node;
                        }}
                        role="option"
                        aria-selected={isSelected}
                        aria-disabled={option.disabled || undefined}
                        className={cn(
                          "flex cursor-pointer items-center justify-between px-3 py-2 text-sm",
                          option.disabled && "cursor-not-allowed text-disabled",
                          isHighlighted && "bg-primary text-primary-foreground",
                          isSelected && !isHighlighted && "bg-info-subtle text-info",
                          !isSelected && !isHighlighted && "hover:bg-muted",
                        )}
                        onClick={() => handleOptionSelect(option)}
                      >
                        <span className="truncate">{option.label}</span>
                        {isSelected ? <Check size={16} /> : null}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>

      {errorText && invalid ? (
        <p className="flex items-center gap-1 text-sm text-danger" role="alert">
          <CircleAlert size={16} />
          {errorText}
        </p>
      ) : null}
    </div>
  );
}

export function MultiSelect<T extends string | number = string | number>(
  props: Omit<MultiSelectProps<T>, "multiple">,
) {
  return <Select {...props} multiple />;
}
