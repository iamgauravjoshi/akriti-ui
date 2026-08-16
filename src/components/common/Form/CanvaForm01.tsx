import React, {useState, useEffect, useCallback} from 'react';

// Validation utilities
const validators = {
    required: (value: any) => {
        if (typeof value === 'boolean') return true;
        return value && value.toString().trim() !== '' ? null : 'This field is required';
    },
    email: (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? null : 'Please enter a valid email address';
    },
    minLength: (min: any) => (value: any) => {
        return value && value.length >= min ? null : `Minimum ${min} characters required`;
    },
    phone: (value: any) => {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(value.replace(/\s/g, '')) ? null : 'Please enter a valid phone number';
    },
};

// Input Components
const TextInput = ({field, value, onChange, onBlur, error, touched}) => (
    <div className='space-y-2'>
        <label className='block text-sm font-semibold text-gray-700'>
            {field.label}
            {field.required && <span className='ml-1 text-red-500'>*</span>}
        </label>
        <input
            type={field.type}
            name={field.name}
            value={value || ''}
            onChange={(e) => onChange(field.name, e.target.value)}
            onBlur={() => onBlur(field.name)}
            placeholder={field.placeholder}
            className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                error && touched
                    ? 'shake border-red-500 bg-red-50'
                    : 'border-gray-300 hover:border-gray-400'
            }`}
        />
        {field.description && <p className='text-xs text-gray-500'>{field.description}</p>}
        {error && touched && (
            <p className='flex items-center text-sm text-red-600 fade-in'>
                <svg className='mr-1 h-4 w-4' fill='currentColor' viewBox='0 0 20 20'>
                    <path
                        fillRule='evenodd'
                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                        clipRule='evenodd'
                    />
                </svg>
                {error}
            </p>
        )}
    </div>
);

const SelectInput = ({field, value, onChange, onBlur, error, touched}) => (
    <div className='space-y-2'>
        <label className='block text-sm font-semibold text-gray-700'>
            {field.label}
            {field.required && <span className='ml-1 text-red-500'>*</span>}
        </label>
        <select
            name={field.name}
            value={value || ''}
            onChange={(e) => onChange(field.name, e.target.value)}
            onBlur={() => onBlur(field.name)}
            className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                error && touched ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
            }`}
        >
            <option value=''>{field.placeholder || 'Select an option'}</option>
            {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
        {error && touched && (
            <p className='flex items-center text-sm text-red-600 fade-in'>
                <svg className='mr-1 h-4 w-4' fill='currentColor' viewBox='0 0 20 20'>
                    <path
                        fillRule='evenodd'
                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                        clipRule='evenodd'
                    />
                </svg>
                {error}
            </p>
        )}
    </div>
);

const TextareaInput = ({field, value, onChange, onBlur, error, touched}) => (
    <div className='space-y-2'>
        <label className='block text-sm font-semibold text-gray-700'>
            {field.label}
            {field.required && <span className='ml-1 text-red-500'>*</span>}
        </label>
        <textarea
            name={field.name}
            value={value || ''}
            onChange={(e) => onChange(field.name, e.target.value)}
            onBlur={() => onBlur(field.name)}
            placeholder={field.placeholder}
            rows={4}
            className={`resize-vertical w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                error && touched ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
            }`}
        />
        {error && touched && (
            <p className='flex items-center text-sm text-red-600 fade-in'>
                <svg className='mr-1 h-4 w-4' fill='currentColor' viewBox='0 0 20 20'>
                    <path
                        fillRule='evenodd'
                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                        clipRule='evenodd'
                    />
                </svg>
                {error}
            </p>
        )}
    </div>
);

const CheckboxInput = ({field, value, onChange, onBlur, error, touched}) => (
    <div className='space-y-2'>
        <div className='flex items-start space-x-3'>
            <input
                type='checkbox'
                name={field.name}
                checked={value || false}
                onChange={(e) => onChange(field.name, e.target.checked)}
                onBlur={() => onBlur(field.name)}
                className='mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
            />
            <label className='text-sm font-medium text-gray-700'>
                {field.label}
                {field.required && <span className='ml-1 text-red-500'>*</span>}
            </label>
        </div>
        {field.description && <p className='ml-7 text-xs text-gray-500'>{field.description}</p>}
        {error && touched && (
            <p className='ml-7 flex items-center text-sm text-red-600 fade-in'>
                <svg className='mr-1 h-4 w-4' fill='currentColor' viewBox='0 0 20 20'>
                    <path
                        fillRule='evenodd'
                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                        clipRule='evenodd'
                    />
                </svg>
                {error}
            </p>
        )}
    </div>
);

const RadioInput = ({field, value, onChange, onBlur, error, touched}) => (
    <div className='space-y-2'>
        <label className='block text-sm font-semibold text-gray-700'>
            {field.label}
            {field.required && <span className='ml-1 text-red-500'>*</span>}
        </label>
        <div className='space-y-2'>
            {field.options?.map((option) => (
                <div key={option.value} className='flex items-center space-x-3'>
                    <input
                        type='radio'
                        name={field.name}
                        value={option.value}
                        checked={value === option.value}
                        onChange={(e) => onChange(field.name, e.target.value)}
                        onBlur={() => onBlur(field.name)}
                        className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500'
                    />
                    <label className='text-sm text-gray-700'>{option.label}</label>
                </div>
            ))}
        </div>
        {error && touched && (
            <p className='flex items-center text-sm text-red-600 fade-in'>
                <svg className='mr-1 h-4 w-4' fill='currentColor' viewBox='0 0 20 20'>
                    <path
                        fillRule='evenodd'
                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                        clipRule='evenodd'
                    />
                </svg>
                {error}
            </p>
        )}
    </div>
);

// Main Form Component
const CanvaForm01 = ({fields, onSubmit, title, submitText = 'Submit', className = ''}) => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateField = useCallback((field, value) => {
        const fieldErrors = [];

        // Required validation
        if (field.required) {
            const requiredError = validators.required(value);
            if (requiredError) fieldErrors.push(requiredError);
        }

        // Type-specific validation
        if (value && field.type === 'email') {
            const emailError = validators.email(value);
            if (emailError) fieldErrors.push(emailError);
        }

        if (value && field.type === 'tel') {
            const phoneError = validators.phone(value);
            if (phoneError) fieldErrors.push(phoneError);
        }

        if (value && field.type === 'password') {
            const minLengthError = validators.minLength(8)(value);
            if (minLengthError) fieldErrors.push(minLengthError);
        }

        // Custom validation
        if (field.validate && value) {
            const customError = field.validate(value);
            if (customError) fieldErrors.push(customError);
        }

        return fieldErrors[0] || null;
    }, []);

    const handleChange = useCallback(
        (fieldName, value) => {
            setFormData((prev) => ({...prev, [fieldName]: value}));

            // Clear error when user starts typing
            if (errors[fieldName]) {
                setErrors((prev) => ({...prev, [fieldName]: null}));
            }
        },
        [errors],
    );

    const handleBlur = useCallback(
        (fieldName) => {
            setTouched((prev) => ({...prev, [fieldName]: true}));

            const field = fields.find((f) => f.name === fieldName);
            if (field) {
                const error = validateField(field, formData[fieldName]);
                setErrors((prev) => ({...prev, [fieldName]: error}));
            }
        },
        [fields, formData, validateField],
    );

    const validateForm = useCallback(() => {
        const newErrors = {};
        let isValid = true;

        fields.forEach((field) => {
            const error = validateField(field, formData[field.name]);
            if (error) {
                newErrors[field.name] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        setTouched(fields.reduce((acc, field) => ({...acc, [field.name]: true}), {}));
        return isValid;
    }, [fields, formData, validateField]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            await onSubmit(formData);
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid = fields.every((field) => {
        if (!field.required) return true;
        const value = formData[field.name];
        return validateField(field, value) === null;
    });

    const renderField = (field) => {
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
                return <SelectInput key={field.name} {...commonProps} />;
            case 'textarea':
                return <TextareaInput key={field.name} {...commonProps} />;
            case 'checkbox':
                return <CheckboxInput key={field.name} {...commonProps} />;
            case 'radio':
                return <RadioInput key={field.name} {...commonProps} />;
            default:
                return <TextInput key={field.name} {...commonProps} />;
        }
    };

    return (
        <div className={`mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-lg md:p-8 ${className}`}>
            {title && (
                <div className='mb-8'>
                    <h2 className='mb-2 text-2xl font-bold text-gray-900 md:text-3xl'>{title}</h2>
                    <div className='h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600'/>
                </div>
            )}

            <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                    {fields.map((field) => (
                        <div
                            key={field.name}
                            className={field.type === 'textarea' || field.type === 'radio' ? 'md:col-span-2' : ''}
                        >
                            {renderField(field)}
                        </div>
                    ))}
                </div>

                <div className='border-t border-gray-200 pt-6'>
                    <button
                        type='submit'
                        disabled={!isFormValid || isSubmitting}
                        className={`w-full rounded-lg px-6 py-3 font-semibold text-white transition-all duration-200 ${
                            isFormValid && !isSubmitting
                                ? 'transform bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg hover:scale-[1.02] hover:from-blue-700 hover:to-purple-700 hover:shadow-xl'
                                : 'cursor-not-allowed bg-gray-400'
                        }`}
                    >
                        {isSubmitting ? (
                            <div className='flex items-center justify-center space-x-2'>
                                <svg className='h-5 w-5 animate-spin' fill='none' viewBox='0 0 24 24'>
                                    <circle
                                        className='opacity-25'
                                        cx='12'
                                        cy='12'
                                        r='10'
                                        stroke='currentColor'
                                        strokeWidth='4'
                                    />
                                    <path
                                        className='opacity-75'
                                        fill='currentColor'
                                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                                    />
                                </svg>
                                <span>Processing...</span>
                            </div>
                        ) : (
                            submitText
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CanvaForm01;
