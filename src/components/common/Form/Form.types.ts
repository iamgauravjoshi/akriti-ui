import * as React from 'react';

export type FormDataValue = string | boolean | number | (string | number)[] | undefined;

export type Validators = {
  required: (value: FormDataValue) => string | null;
  email: (value: string) => string | null;
  minLength: (min: number) => (value: string) => string | null;
  phone: (value: string) => string | null;
  minSelection?: (min: number) => (value: FormDataValue) => string | null;
  maxSelection?: (max: number) => (value: FormDataValue) => string | null;
};

// ✅ Common input field types
export interface IOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export type FieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'tel'
  | 'select'
  | 'textarea'
  | 'checkbox'
  | 'radio';

export interface IFormField {
  type: FieldType;
  name: string;
  label?: string;
  placeholder?: string;
  icon?: React.ReactElement;
  value?: string | boolean;
  required?: boolean;
  disabled?: boolean;
  description?: string;
  autocomplete?: string;
  options?: IOption[];
  validate?: (value: FormDataValue) => string | null;

  // Properties for Select component
  multiple?: boolean;
  minSelection?: number;
  maxSelection?: number;
  clearable?: boolean;
  searchable?: boolean;
  loadOptions?: (inputValue: string) => Promise<IOption[]>;
  maxHeight?: string;
}

// ✅ Generic Input component props
export interface IInputProps<T extends HTMLElement = HTMLElement> {
  field: IFormField;
  value: FormDataValue;
  onChange: (e: React.ChangeEvent<T>) => void;
  onBlur: (e: React.FocusEvent<T>) => void;
  error: string | null;
  touched?: boolean;
}

// ✅ Form Props
export interface IFormProps {
  fields: IFormField[];
  className?: string;
  submitText?: string;
  resetText?: string;
  onSubmit: (formData: Record<string, FormDataValue>) => Promise<void> | void;
  defaultFormData?: Record<string, FormDataValue>;
}
