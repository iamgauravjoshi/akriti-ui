import React from "react";
import CanvaForm02 from "./common/Form/CanvaForm02";

const formFields = [
    {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        required: true,
        placeholder: 'Enter your first name'
    },
    {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        required: true,
        placeholder: 'Enter your last name'
    },
    {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        required: true,
        placeholder: 'Enter your email address'
    },
    {
        name: 'phone',
        label: 'Phone Number',
        type: 'tel',
        required: false,
        placeholder: '+1 (555) 123-4567'
    },
    {
        name: 'company',
        label: 'Company',
        type: 'text',
        required: true,
        placeholder: 'Enter your company name',
        customValidation: {
            validator: (value) => value && value.length >= 2,
            message: 'Company name must be at least 2 characters'
        }
    },
    {
        name: 'position',
        label: 'Position',
        type: 'select',
        required: true,
        placeholder: 'Select your position',
        options: [
            { value: 'developer', label: 'Software Developer' },
            { value: 'designer', label: 'UI/UX Designer' },
            { value: 'manager', label: 'Project Manager' },
            { value: 'analyst', label: 'Business Analyst' },
            { value: 'other', label: 'Other' }
        ]
    },
    {
        name: 'experience',
        label: 'Years of Experience',
        type: 'radio',
        required: true,
        options: [
            { value: '0-2', label: '0-2 years' },
            { value: '3-5', label: '3-5 years' },
            { value: '6-10', label: '6-10 years' },
            { value: '10+', label: '10+ years' }
        ]
    },
    {
        name: 'salary',
        label: 'Expected Salary Range',
        type: 'select',
        required: false,
        placeholder: 'Select salary range',
        options: [
            { value: '30-50k', label: '$30,000 - $50,000' },
            { value: '50-75k', label: '$50,000 - $75,000' },
            { value: '75-100k', label: '$75,000 - $100,000' },
            { value: '100k+', label: '$100,000+' }
        ]
    },
    {
        name: 'message',
        label: 'Additional Information',
        type: 'textarea',
        required: false,
        placeholder: 'Tell us more about yourself or your project...',
        description: 'Optional: Share any additional details that might be relevant'
    },
    {
        name: 'newsletter',
        label: 'Subscribe to our newsletter for updates and insights',
        type: 'checkbox',
        required: false,
        description: 'We respect your privacy and will never spam you.'
    },
    {
        name: 'terms',
        label: 'I agree to the Terms of Service and Privacy Policy',
        type: 'checkbox',
        required: true
    }
];

const FormDemo02 = () => {

    const handleSubmit = async (data) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Show success message with formatted data
        const formattedData = Object.entries(data)
            .filter(([key, value]) => value !== '' && value !== false && value !== undefined)
            .map(([key, value]) => {
                const field = formFields.find(f => f.name === key);
                const label = field?.label || key;
                return `${label}: ${value}`;
            })
            .join('\n');

        alert(`Form submitted successfully! 🎉\n\nSubmitted Data:\n${formattedData}`);
    };

    const defaultValues = {
        newsletter: false,
        terms: false
    };

    return (
        <div className="min-h-screen py-8 px-4">
            <CanvaForm02
                fields={formFields}
                onSubmit={handleSubmit}
                title="Enterprise Contact Form"
                submitText="Submit Application"
                className="animate-fade-in"
                defaultValues={defaultValues}
                mode="onChange" // Real-time validation
            />
        </div>
    );
};

export default FormDemo02;