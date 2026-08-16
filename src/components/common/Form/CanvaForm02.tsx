import React, { useState, useEffect, forwardRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


// Zod Schema Definitions
const createFormSchema = (fields) => {
    const schemaObject = {};

    fields.forEach(field => {
        let fieldSchema;

        switch (field.type) {
            case 'email':
                fieldSchema = z.string().email('Please enter a valid email address');
                break;
            case 'tel':
                fieldSchema = z.string().regex(
                    /^[\+]?[1-9][\d]{0,15}$/,
                    'Please enter a valid phone number'
                );
                break;
            case 'password':
                fieldSchema = z.string().min(8, 'Password must be at least 8 characters');
                break;
            case 'number':
                fieldSchema = z.number().min(0, 'Must be a positive number');
                break;
            case 'date':
                fieldSchema = z.string().min(1, 'Please select a date');
                break;
            case 'checkbox':
                fieldSchema = z.boolean();
                break;
            case 'select':
            case 'radio':
                fieldSchema = z.string().min(1, 'Please select an option');
                break;
            default:
                fieldSchema = z.string();
        }

        // Apply required validation
        if (field.required) {
            if (field.type === 'checkbox') {
                fieldSchema = fieldSchema.refine(val => val === true, {
                    message: 'This field is required'
                });
            } else {
                fieldSchema = fieldSchema.min(1, 'This field is required');
            }
        } else {
            if (field.type !== 'checkbox') {
                fieldSchema = fieldSchema.optional().or(z.literal(''));
            } else {
                fieldSchema = fieldSchema.optional();
            }
        }

        // Apply custom validation
        if (field.customValidation) {
            fieldSchema = fieldSchema.refine(field.customValidation.validator, {
                message: field.customValidation.message
            });
        }

        schemaObject[field.name] = fieldSchema;
    });

    return z.object(schemaObject);
};

// Input Components with React Hook Form integration
const FormInput = forwardRef(({field, error, ...props}, ref) => (
    <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
            ref={ref}
            type={field.type}
            placeholder={field.placeholder}
            className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                error ? 'border-red-500 bg-red-50 animate-shake' : 'border-gray-300 hover:border-gray-400'
            }`}
            {...props}
        />
        {field.description && (
            <p className="text-xs text-gray-500">{field.description}</p>
        )}
        {error && (
            <p className="text-sm text-red-600 animate-fade-in flex items-center">
                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"/>
                </svg>
                {error.message}
            </p>
        )}
    </div>
));

const FormSelect = forwardRef(({field, error, ...props}, ref) => (
    <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <select
            ref={ref}
            className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
            }`}
            {...props}
        >
            <option value="">{field.placeholder || 'Select an option'}</option>
            {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
        {field.description && (
            <p className="text-xs text-gray-500">{field.description}</p>
        )}
        {error && (
            <p className="text-sm text-red-600 animate-fade-in flex items-center">
                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"/>
                </svg>
                {error.message}
            </p>
        )}
    </div>
));

const FormTextarea = forwardRef(({field, error, ...props}, ref) => (
    <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <textarea
            ref={ref}
            placeholder={field.placeholder}
            rows={4}
            className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical ${
                error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
            }`}
            {...props}
        />
        {field.description && (
            <p className="text-xs text-gray-500">{field.description}</p>
        )}
        {error && (
            <p className="text-sm text-red-600 animate-fade-in flex items-center">
                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"/>
                </svg>
                {error.message}
            </p>
        )}
    </div>
));

const FormCheckbox = forwardRef(({field, error, ...props}, ref) => (
    <div className="space-y-2">
        <div className="flex items-start space-x-3">
            <input
                ref={ref}
                type="checkbox"
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                {...props}
            />
            <label className="text-sm font-medium text-gray-700">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
        </div>
        {field.description && (
            <p className="text-xs text-gray-500 ml-7">{field.description}</p>
        )}
        {error && (
            <p className="text-sm text-red-600 animate-fade-in flex items-center ml-7">
                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"/>
                </svg>
                {error.message}
            </p>
        )}
    </div>
));

const FormRadio = ({field, error, control}) => (
    <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <Controller
            name={field.name}
            control={control}
            render={({field: controllerField}) => (
                <div className="space-y-2">
                    {field.options?.map((option) => (
                        <div key={option.value} className="flex items-center space-x-3">
                            <input
                                type="radio"
                                value={option.value}
                                checked={controllerField.value === option.value}
                                onChange={() => controllerField.onChange(option.value)}
                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <label className="text-sm text-gray-700">{option.label}</label>
                        </div>
                    ))}
                </div>
            )}
        />
        {field.description && (
            <p className="text-xs text-gray-500">{field.description}</p>
        )}
        {error && (
            <p className="text-sm text-red-600 animate-fade-in flex items-center">
                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"/>
                </svg>
                {error.message}
            </p>
        )}
    </div>
);

// Main Enterprise Form Component
const CanvaForm02 = ({
                         fields,
                         onSubmit,
                         title,
                         submitText = "Submit",
                         className = "",
                         defaultValues = {},
                         mode = "onChange" // onChange, onBlur, onSubmit
                     }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Create Zod schema from fields
    const schema = createFormSchema(fields);

    // Initialize React Hook Form
    const {
        register,
        handleSubmit,
        control,
        formState: {errors, isValid, isDirty, touchedFields},
        watch,
        reset,
        setValue,
        getValues
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues,
        mode, // Validation mode
        reValidateMode: 'onChange'
    });

    // Watch all form values for real-time updates
    const watchedValues = watch();

    const onSubmitHandler = async (data) => {
        setIsSubmitting(true);
        try {
            await onSubmit(data);
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderField = (field) => {
        const error = errors[field.name];
        const commonProps = {
            field,
            error,
            ...register(field.name)
        };

        switch (field.type) {
            case 'select':
                return <FormSelect key={field.name} {...commonProps} />;
            case 'textarea':
                return <FormTextarea key={field.name} {...commonProps} />;
            case 'checkbox':
                return <FormCheckbox key={field.name} {...commonProps} />;
            case 'radio':
                return <FormRadio key={field.name} field={field} error={error} control={control}/>;
            default:
                return <FormInput key={field.name} {...commonProps} />;
        }
    };

    // Calculate form completion percentage
    const completedFields = fields.filter(field => {
        const value = watchedValues[field.name];
        if (field.type === 'checkbox') return value === true;
        return value && value.toString().trim() !== '';
    }).length;

    const completionPercentage = Math.round((completedFields / fields.length) * 100);

    return (
        <div className={`max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 ${className}`}>
            {title && (
                <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{title}</h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Form Completion</span>
                            <span>{completionPercentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                                style={{width: `${completionPercentage}%`}}
                            ></div>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {fields.map(field => (
                        <div key={field.name} className={
                            field.type === 'textarea' || field.type === 'radio' ? 'md:col-span-2' : ''
                        }>
                            {renderField(field)}
                        </div>
                    ))}
                </div>

                {/* Form Summary */}
                {Object.keys(errors).length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                            <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd"
                                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                      clipRule="evenodd"/>
                            </svg>
                            <h3 className="text-sm font-medium text-red-800">
                                Please fix the following errors:
                            </h3>
                        </div>
                        <ul className="text-sm text-red-700 space-y-1">
                            {Object.entries(errors).map(([fieldName, error]) => {
                                const field = fields.find(f => f.name === fieldName);
                                return (
                                    <li key={fieldName}>
                                        • {field?.label}: {error.message}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}

                <div className="pt-6 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            type="button"
                            onClick={() => reset()}
                            className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                            Reset Form
                        </button>
                        <button
                            type="submit"
                            disabled={!isValid || isSubmitting}
                            className={`flex-1 py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
                                isValid && !isSubmitting
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] shadow-lg hover:shadow-xl'
                                    : 'bg-gray-400 cursor-not-allowed'
                            }`}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor"
                                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Processing...</span>
                                </div>
                            ) : (
                                submitText
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CanvaForm02;