import React, { useState, useCallback } from 'react';
import { CircleAlert, Eye, EyeOff } from 'lucide-react';
import type {
  FormDataValue,
  IFormField,
  IFormProps,
  IInputProps,
  IOption,
  Validators,
} from './Form.types';
import Select from '../Select/Select';

const validators: Validators = {
  required: (value: any) => {
    if (typeof value === 'boolean') return null;

    if (Array.isArray(value)) {
      return value.length > 0 ? null : 'This field is required';
    }

    return value && value.toString().trim() !== '' ? null : 'This field is required';
  },
  email: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : 'Please enter a valid email address';
  },
  minLength: (min: number) => (value: string) => {
    return value && value.length >= min ? null : `Minimum ${min} characters required`;
  },
  phone: (value: string) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(value.replace(/\s/g, '')) ? null : 'Please enter a valid phone number';
  },
  minSelection: (min: number) => (value: any) => {
    if (Array.isArray(value)) {
      return value.length >= min
        ? null
        : `Please select at least ${min} option${min > 1 ? 's' : ''}`;
    }
    return null;
  },
  maxSelection: (max: number) => (value: any) => {
    if (Array.isArray(value)) {
      return value.length <= max
        ? null
        : `Please select no more than ${max} option${max > 1 ? 's' : ''}`;
    }
    return null;
  },
};

const TextInput: React.FC<IInputProps<HTMLInputElement>> = (
  props: IInputProps<HTMLInputElement>,
) => {
  const { field, value, onChange, onBlur, error, touched } = props;

  return (
    <div className='space-y-2'>
      <label htmlFor={field.name} className='block text-sm font-semibold text-gray-700'>
        {field.label}
        {field.required && <span className='ml-1 text-red-500'>*</span>}
      </label>
      <div className={`relative ${error && 'shake'}`}>
        {field.icon && (
          <span
            className={`absolute top-1/2 left-3 -translate-y-1/2 transform ${error && touched ? 'text-red-600' : 'text-gray-600'}`}
          >
            {field.icon}
          </span>
        )}
        <input
          type={field.type}
          name={field.name}
          id={field.name}
          disabled={field.disabled}
          value={(value as string) || ''}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={field.placeholder}
          autoComplete={field.autocomplete}
          className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${field.icon && 'pl-10'} ${
            error && touched
              ? 'border-red-500 bg-red-50 text-red-600'
              : 'border-gray-300 text-gray-600 hover:border-gray-400'
          } ${field.disabled ? 'cursor-not-allowed bg-gray-100' : ''}`}
        />
      </div>
      {field.description && <p className='text-xs text-gray-500'>{field.description}</p>}
      {error && touched && (
        <p className='fade-in flex items-center text-sm text-red-600'>
          <CircleAlert size={18} fill='#e7000b' className={'mr-1 text-white'} />
          {error}
        </p>
      )}
    </div>
  );
};

const PasswordInput: React.FC<IInputProps<HTMLInputElement>> = (
  props: IInputProps<HTMLInputElement>,
) => {
  const { field, value, onChange, onBlur, error, touched } = props;
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  return (
    <div className='space-y-2'>
      {field.label && (
        <label htmlFor={field.name} className='block text-sm font-semibold text-gray-700'>
          {field.label}
          {field.required && <span className='ml-1 text-red-500'>*</span>}
        </label>
      )}
      <div className={`relative ${error && 'shake'}`}>
        {field.icon && (
          <span
            className={`absolute top-1/2 left-3 -translate-y-1/2 transform ${error && touched ? 'text-red-600' : 'text-gray-600'}`}
          >
            {field.icon}
          </span>
        )}
        <input
          type={showPassword ? 'text' : field.type}
          name={field.name}
          id={field.name}
          disabled={field.disabled}
          value={(value as string) || ''}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={field.placeholder}
          autoComplete={field.autocomplete}
          className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${field.icon && 'pl-10'} ${
            error && touched
              ? 'border-red-500 bg-red-50 text-red-600'
              : 'border-gray-300 text-gray-600 hover:border-gray-400'
          } ${field.disabled ? 'cursor-not-allowed bg-gray-100' : ''}`}
        />
        <button
          type='button'
          onClick={() => setShowPassword(!showPassword)}
          className={`absolute top-1/2 right-3 -translate-y-1/2 transform ${error && touched ? 'text-red-600 hover:text-red-700' : 'text-gray-600 hover:text-gray-700'}`}
        >
          {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      </div>

      {field.description && <p className='text-xs text-gray-500'>{field.description}</p>}
      {error && touched && (
        <p className='fade-in flex items-center text-sm text-red-600'>
          <CircleAlert size={18} fill='#e7000b' className={'mr-1 text-white'} />
          {error}
        </p>
      )}
    </div>
  );
};

const SelectInput: React.FC<IInputProps<HTMLSelectElement>> = (
  props: IInputProps<HTMLSelectElement>,
) => {
  const { field, value, onChange, onBlur, error, touched } = props;

  // Handle the onChange event to match the expected form behavior
  const handleSelectChange = (newValue: any) => {
    // Create a synthetic event that matches what the form expects
    const syntheticEvent = {
      target: {
        name: field.name,
        type: field.multiple ? 'select-multiple' : 'select-one',
        value: newValue,
      },
    } as React.ChangeEvent<HTMLSelectElement>;

    onChange(syntheticEvent);
  };

  // Convert form value to Select component value format
  const selectValue = React.useMemo(() => {
    // Only pass through values that are valid for Select component
    if (typeof value === 'boolean') {
      return undefined; // Select doesn't handle boolean values
    }
    return value as string | number | (string | number)[] | undefined;
  }, [value]);

  // Handle blur event
  const handleSelectBlur = () => {
    const syntheticEvent = {
      target: {
        name: field.name,
      },
    } as React.FocusEvent<HTMLSelectElement>;

    onBlur(syntheticEvent);
  };

  return (
    <Select
      label={field.label}
      required={field.required}
      icon={field.icon}
      options={field.options || []}
      value={selectValue}
      onChange={handleSelectChange}
      multiple={field.multiple || false}
      placeholder={field.placeholder}
      disabled={field.disabled}
      clearable={field.clearable} // Default to true unless explicitly set to false
      searchable={field.searchable} // Default to true unless explicitly set to false
      loading={false}
      loadOptions={field.loadOptions}
      maxHeight={field.maxHeight}
      className=''
      error={error}
      touched={touched}
    />
  );
};

const TextareaInput: React.FC<IInputProps<HTMLTextAreaElement>> = (
  props: IInputProps<HTMLTextAreaElement>,
) => {
  const { field, value, onChange, onBlur, error, touched } = props;

  return (
    <div className='space-y-2'>
      <label htmlFor={field.name} className='block text-sm font-semibold text-gray-700'>
        {field.label}
        {field.required && <span className='ml-1 text-red-500'>*</span>}
      </label>
      <div className={`relative ${error && 'shake'}`}>
        {field.icon && (
          <span
            className={`absolute top-1/2 left-3 -translate-y-1/2 transform ${error && touched ? 'text-red-600' : 'text-gray-600'}`}
          >
            {field.icon}
          </span>
        )}
        <textarea
          name={field.name}
          id={field.name}
          disabled={field.disabled}
          value={(value as string) || ''}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={field.placeholder}
          rows={4}
          className={`resize-vertical w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${field.icon && 'pl-10'} ${
            error && touched ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
          } ${field.disabled ? 'cursor-not-allowed bg-gray-100' : ''}`}
        />
      </div>

      {error && touched && (
        <p className='fade-in flex items-center text-sm text-red-600'>
          <CircleAlert size={18} fill='#e7000b' className={'mr-1 text-white'} />
          {error}
        </p>
      )}
    </div>
  );
};

const CheckboxInput: React.FC<IInputProps<HTMLInputElement>> = (
  props: IInputProps<HTMLInputElement>,
) => {
  const { field, value, onChange, onBlur, error, touched } = props;

  return (
    <div className='space-y-2'>
      <div className='flex items-start space-x-3'>
        <input
          type='checkbox'
          name={field.name}
          id={field.name}
          disabled={field.disabled}
          checked={(value as boolean) || false}
          onChange={onChange}
          onBlur={onBlur}
          className={`mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${field.disabled ? 'cursor-not-allowed bg-gray-100' : ''}`}
        />
        <label htmlFor={field.name} className='text-sm font-medium text-gray-700'>
          {field.label}
          {field.required && <span className='ml-1 text-red-500'>*</span>}
        </label>
      </div>
      {field.description && <p className='ml-7 text-xs text-gray-500'>{field.description}</p>}
      {error && touched && (
        <p className='fade-in flex items-center text-sm text-red-600'>
          <CircleAlert size={18} fill='#e7000b' className={'mr-1 text-white'} />
          {error}
        </p>
      )}
    </div>
  );
};

const RadioInput: React.FC<IInputProps<HTMLInputElement>> = (
  props: IInputProps<HTMLInputElement>,
) => {
  const { field, value, onChange, onBlur, error, touched } = props;

  return (
    <div className='space-y-2'>
      <label htmlFor={field.name} className='block text-sm font-semibold text-gray-700'>
        {field.label}
        {field.required && <span className='ml-1 text-red-500'>*</span>}
      </label>
      <div className='space-y-2'>
        {field.options?.map((option: IOption) => (
          <div key={option.value} className='flex items-center space-x-3'>
            <input
              type='radio'
              name={field.name}
              id={field.name}
              disabled={field.disabled}
              value={option.value}
              checked={((value === option.value) as boolean) || false}
              onChange={onChange}
              onBlur={onBlur}
              className={`h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500 ${field.disabled ? 'cursor-not-allowed bg-gray-100' : ''}`}
            />
            <label className='text-sm text-gray-700'>{option.label}</label>
          </div>
        ))}
      </div>
      {error && touched && (
        <p className='fade-in flex items-center text-sm text-red-600'>
          <CircleAlert size={18} fill='#e7000b' className={'mr-1 text-white'} />
          {error}
        </p>
      )}
    </div>
  );
};

const Form = ({
  fields,
  className = '',
  onSubmit,
  submitText = 'Submit',
  resetText,
  defaultFormData = {},
}: IFormProps) => {
  const [formData, setFormData] = useState<Record<string, FormDataValue>>(defaultFormData);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validateField = useCallback((field: IFormField, value: FormDataValue) => {
    const fieldErrors: string[] = [];

    // Required validation
    if (field.required) {
      const requiredError = validators.required(value);
      if (requiredError) fieldErrors.push(requiredError);
    }

    // Type-specific validation
    if (value && field.type === 'email' && typeof value === 'string') {
      const emailError = validators.email(value);
      if (emailError) fieldErrors.push(emailError);
    }

    if (value && field.type === 'tel' && typeof value === 'string') {
      const phoneError = validators.phone(value);
      if (phoneError) fieldErrors.push(phoneError);
    }

    if (value && field.type === 'password' && typeof value === 'string') {
      const minLengthError = validators.minLength(8)(value);
      if (minLengthError) fieldErrors.push(minLengthError);
    }

    // Multiple selection validation
    if (field.multiple && field.type === 'select') {
      if (field.minSelection && validators.minSelection) {
        const minSelectionError = validators.minSelection(field.minSelection)(value);
        if (minSelectionError) fieldErrors.push(minSelectionError);
      }

      if (field.maxSelection && validators.maxSelection) {
        const maxSelectionError = validators.maxSelection(field.maxSelection)(value);
        if (maxSelectionError) fieldErrors.push(maxSelectionError);
      }
    }

    // Custom validation
    if (field.validate && value !== undefined) {
      const customError = field.validate(value);
      if (customError) fieldErrors.push(customError);
    }

    return fieldErrors[0] || null;
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, type } = e.target;

      let value: string | boolean;
      if (type === 'checkbox') {
        value = (e.target as HTMLInputElement).checked;
      } else if (type === 'radio') {
        value = (e.target as HTMLInputElement).value;
      } else {
        value = e.target.value;
      }

      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear error when user starts typing/changing
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: null }));
      }
    },
    [errors],
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name } = e.target;

      setTouched((prev) => ({ ...prev, [name]: true }));

      const field = fields.find((f) => f.name === name);
      if (field) {
        const error = validateField(field, formData[name]);
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    },
    [fields, formData, validateField],
  );

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string | null> = {};
    let isValid = true;

    fields.forEach((field) => {
      const error = validateField(field, formData[field.name]);
      if (error) {
        newErrors[field.name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(fields.reduce((acc, field) => ({ ...acc, [field.name]: true }), {}));
    return isValid;
  }, [fields, formData, validateField]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormReset = () => {
    setFormData({});
    setErrors({});
  };

  const isFormValid = fields.every((field) => {
    if (!field.required) return true;
    const value = formData[field.name];
    return validateField(field, value) === null;
  });

  const renderField = (field: IFormField) => {
    const commonProps = {
      field,
      value: formData[field.name],
      onChange: handleChange,
      onBlur: handleBlur,
      error: errors[field.name],
      touched: touched[field.name],
    };

    switch (field.type) {
      case 'select':
        return <SelectInput {...commonProps} />;
      case 'textarea':
        return <TextareaInput {...commonProps} />;
      case 'checkbox':
        return <CheckboxInput {...commonProps} />;
      case 'radio':
        return <RadioInput {...commonProps} />;
      case 'password':
        return <PasswordInput {...commonProps} />;
      default:
        return <TextInput {...commonProps} />;
    }
  };

  return (
    <div className={`${className}`}>
      <form onSubmit={handleSubmit} className='space-y-6'>
        {/*<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>*/}
        {fields.map((field: any) => (
          <div
            key={field.name}
            className={field.type === 'textarea' || field.type === 'radio' ? 'md:col-span-2' : ''}
          >
            {renderField(field)}
          </div>
        ))}
        {/*</div>*/}

        <div className='flex space-x-3 pt-6'>
          <button
            type='submit'
            disabled={!isFormValid || isSubmitting}
            className={`w-full rounded-lg px-6 py-3 font-semibold text-white transition-all duration-200 ${
              isFormValid
                ? 'transform cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg hover:scale-[1.02] hover:from-blue-700 hover:to-purple-700 hover:shadow-xl'
                : 'cursor-not-allowed bg-gray-400'
            }`}
          >
            {isSubmitting ? 'Submitting...' : submitText}
          </button>
          {resetText && (
            <button
              type='button'
              onClick={handleFormReset}
              className='cursor-pointer rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none'
            >
              {resetText}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
