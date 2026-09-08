import {
  cloneElement,
  isValidElement,
  useId,
  type FormEvent,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  FormProvider,
  useFormContext,
  type FieldValues,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "../../lib/cn";
import { FormFieldProvider, useFormField } from "./FormFieldContext";

export type FormProps<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  onSubmit: SubmitHandler<TFieldValues>;
  children: ReactNode;
  className?: string;
};

export function Form<TFieldValues extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
}: FormProps<TFieldValues>) {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-5", className)}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
}

export type FormFieldProps = {
  name: string;
  children: ReactNode;
  className?: string;
};

export function FormField({ name, children, className }: FormFieldProps) {
  const id = useId();
  const form = useFormContext();
  const error = form.formState.errors[name]?.message;
  const errorMessage = typeof error === "string" ? error : undefined;

  return (
    <FormFieldProvider
      value={{
        name,
        id,
        descriptionId: `${id}-description`,
        errorId: `${id}-error`,
        error: errorMessage,
      }}
    >
      <div className={cn("space-y-1.5", className)}>{children}</div>
    </FormFieldProvider>
  );
}

export type FormLabelProps = LabelPrimitive.LabelProps & {
  required?: boolean;
};

export function FormLabel({
  className,
  children,
  required,
  ...props
}: FormLabelProps) {
  const field = useFormField();
  return (
    <LabelPrimitive.Root
      htmlFor={field?.id}
      className={cn("block text-sm font-medium text-foreground", className)}
      {...props}
    >
      {children}
      {required ? (
        <span className="ml-0.5 text-danger" aria-hidden>
          *
        </span>
      ) : null}
    </LabelPrimitive.Root>
  );
}

export function FormDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  const field = useFormField();
  return (
    <p
      id={field?.descriptionId}
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    />
  );
}

export function FormError({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  const field = useFormField();
  const message = children ?? field?.error;
  if (!message) return null;
  return (
    <p
      id={field?.errorId}
      role="alert"
      className={cn("text-sm text-danger", className)}
      {...props}
    >
      {message}
    </p>
  );
}

export type FormControlProps = {
  children: ReactElement;
};

export function FormControl({ children }: FormControlProps) {
  const field = useFormField();
  const form = useFormContext();
  if (!field) return children;

  const registered = form.register(field.name);

  if (!isValidElement(children)) return children;

  return cloneElement(children as ReactElement<Record<string, unknown>>, {
    id: field.id,
    ...registered,
    onChange: (event: FormEvent<HTMLElement>) => {
      void registered.onChange(event);
      const childOnChange = (
        children.props as { onChange?: (e: FormEvent<HTMLElement>) => void }
      ).onChange;
      childOnChange?.(event);
    },
  });
}
