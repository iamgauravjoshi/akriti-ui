import { useCallback, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "../buttons/Button";
import { Checkbox } from "./Checkbox";
import { Input } from "./Input";
import { PasswordInput } from "./PasswordInput";
import { RadioGroup } from "./RadioGroup";
import { Select, type Option } from "./Select";
import { Textarea } from "./Textarea";
import { FormDescription, FormError, FormLabel } from "./Form";

export type FormDataValue =
  | string
  | boolean
  | number
  | (string | number)[]
  | undefined;

export type FieldType =
  | "text"
  | "email"
  | "password"
  | "tel"
  | "select"
  | "textarea"
  | "checkbox"
  | "radio";

export type FieldFormField = {
  type: FieldType;
  name: string;
  label?: string;
  placeholder?: string;
  icon?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  description?: string;
  autocomplete?: string;
  options?: Option[];
  validate?: (value: FormDataValue) => string | null;
  multiple?: boolean;
  minSelection?: number;
  maxSelection?: number;
  clearable?: boolean;
  searchable?: boolean;
  loadOptions?: (inputValue: string) => Promise<Option[]>;
};

export type FieldFormProps = {
  fields: FieldFormField[];
  className?: string;
  submitText?: string;
  resetText?: string;
  title?: string;
  onSubmit: (formData: Record<string, FormDataValue>) => Promise<void> | void;
  defaultFormData?: Record<string, FormDataValue>;
};

function requiredMessage(value: FormDataValue) {
  if (typeof value === "boolean") return null;
  if (Array.isArray(value)) return value.length > 0 ? null : "This field is required";
  return value !== undefined && String(value).trim() !== ""
    ? null
    : "This field is required";
}

function validateField(field: FieldFormField, value: FormDataValue) {
  if (field.required) {
    const required = requiredMessage(value);
    if (required) return required;
  }
  if (value && field.type === "email" && typeof value === "string") {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Please enter a valid email address";
    }
  }
  if (value && field.type === "tel" && typeof value === "string") {
    const digits = value.replace(/[\s\-.()]/g, "");
    if (!/^\+?[1-9]\d{6,15}$/.test(digits)) {
      return "Please enter a valid phone number";
    }
  }
  if (value && field.type === "password" && typeof value === "string" && value.length < 8) {
    return "Minimum 8 characters required";
  }
  if (field.multiple && field.type === "select" && Array.isArray(value)) {
    if (field.minSelection && value.length < field.minSelection) {
      return `Please select at least ${field.minSelection} option${field.minSelection > 1 ? "s" : ""}`;
    }
    if (field.maxSelection && value.length > field.maxSelection) {
      return `Please select no more than ${field.maxSelection} options`;
    }
  }
  return field.validate?.(value) ?? null;
}

export function FieldForm({
  fields,
  className,
  onSubmit,
  submitText = "Submit",
  resetText,
  defaultFormData = {},
  title,
}: FieldFormProps) {
  const [formData, setFormData] = useState<Record<string, FormDataValue>>(defaultFormData);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const setValue = useCallback((name: string, value: FormDataValue) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  }, []);

  const handleBlur = useCallback(
    (field: FieldFormField) => {
      setTouched((prev) => ({ ...prev, [field.name]: true }));
      setErrors((prev) => ({
        ...prev,
        [field.name]: validateField(field, formData[field.name]),
      }));
    },
    [formData],
  );

  const isFormValid = useMemo(
    () => fields.every((field) => validateField(field, formData[field.name]) === null),
    [fields, formData],
  );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const nextErrors: Record<string, string | null> = {};
    let valid = true;
    fields.forEach((field) => {
      const error = validateField(field, formData[field.name]);
      nextErrors[field.name] = error;
      if (error) valid = false;
    });
    setErrors(nextErrors);
    setTouched(Object.fromEntries(fields.map((field) => [field.name, true])));
    if (!valid) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await onSubmit(formData);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      {title ? (
        <h2 className="mb-6 text-2xl font-semibold text-foreground">{title}</h2>
      ) : null}
      {submitError ? <FormError>{submitError}</FormError> : null}
      <div className="space-y-5">
        {fields.map((field) => {
          const error = errors[field.name];
          const isTouched = touched[field.name];
          const showError = Boolean(error && isTouched);
          const commonLabel = field.label ? (
            <FormLabel required={field.required}>{field.label}</FormLabel>
          ) : null;

          return (
            <div key={field.name} className="space-y-1.5">
              {field.type === "checkbox" ? null : commonLabel}

              {field.type === "textarea" ? (
                <Textarea
                  name={field.name}
                  value={String(formData[field.name] ?? "")}
                  placeholder={field.placeholder}
                  disabled={field.disabled}
                  error={showError}
                  onChange={(event) => setValue(field.name, event.target.value)}
                  onBlur={() => handleBlur(field)}
                />
              ) : field.type === "password" ? (
                <PasswordInput
                  name={field.name}
                  value={String(formData[field.name] ?? "")}
                  placeholder={field.placeholder}
                  disabled={field.disabled}
                  autoComplete={field.autocomplete}
                  error={showError}
                  leftIcon={field.icon}
                  onChange={(event) => setValue(field.name, event.target.value)}
                  onBlur={() => handleBlur(field)}
                />
              ) : field.type === "select" && field.multiple ? (
                <Select
                  multiple
                  name={field.name}
                  options={field.options}
                  value={(formData[field.name] as (string | number)[]) ?? []}
                  placeholder={field.placeholder}
                  disabled={field.disabled}
                  clearable={field.clearable}
                  searchable={field.searchable}
                  loadOptions={field.loadOptions}
                  error={showError ? error : null}
                  touched={isTouched}
                  onChange={(next) => setValue(field.name, next)}
                />
              ) : field.type === "select" ? (
                <Select
                  name={field.name}
                  options={field.options}
                  value={(formData[field.name] as string | number | "") ?? ""}
                  placeholder={field.placeholder}
                  disabled={field.disabled}
                  clearable={field.clearable}
                  searchable={field.searchable}
                  loadOptions={field.loadOptions}
                  error={showError ? error : null}
                  touched={isTouched}
                  onChange={(next) => setValue(field.name, next)}
                />
              ) : field.type === "checkbox" ? (
                <Checkbox
                  name={field.name}
                  checked={Boolean(formData[field.name])}
                  disabled={field.disabled}
                  label={
                    <>
                      {field.label}
                      {field.required ? <span className="ml-0.5 text-danger">*</span> : null}
                    </>
                  }
                  onChange={(event) => setValue(field.name, event.target.checked)}
                  onBlur={() => handleBlur(field)}
                />
              ) : field.type === "radio" ? (
                <RadioGroup
                  name={field.name}
                  options={(field.options ?? []).map((option) => ({
                    label: option.label,
                    value: String(option.value),
                    disabled: option.disabled,
                  }))}
                  value={String(formData[field.name] ?? "")}
                  disabled={field.disabled}
                  onChange={(event) => setValue(field.name, event.target.value)}
                  onBlur={() => handleBlur(field)}
                />
              ) : (
                <Input
                  type={field.type}
                  name={field.name}
                  value={String(formData[field.name] ?? "")}
                  placeholder={field.placeholder}
                  disabled={field.disabled}
                  autoComplete={field.autocomplete}
                  error={showError}
                  leftIcon={field.icon}
                  onChange={(event) => setValue(field.name, event.target.value)}
                  onBlur={() => handleBlur(field)}
                />
              )}

              {field.description ? (
                <FormDescription>{field.description}</FormDescription>
              ) : null}
              {showError ? <FormError>{error}</FormError> : null}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex gap-3">
        <Button type="submit" loading={isSubmitting} disabled={!isFormValid} fullWidth>
          {submitText}
        </Button>
        {resetText ? (
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setFormData(defaultFormData);
              setErrors({});
              setTouched({});
              setSubmitError(null);
            }}
          >
            {resetText}
          </Button>
        ) : null}
      </div>
    </form>
  );
}
