export interface Option {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectProps {
  label?: string;
  required?: boolean;
  icon?: React.ReactElement;
  options?: Option[];
  value?: string | number | (string | number)[] | undefined;
  onChange: (value: string | number | (string | number)[]) => void;
  multiple?: boolean;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  searchable?: boolean;
  loading?: boolean;
  //Async function to load options dynamically
  loadOptions?: (inputValue: string) => Promise<Option[]>;
  maxHeight?: string;
  className?: string;
  error?: string | null | undefined;
  touched?: boolean;
}
