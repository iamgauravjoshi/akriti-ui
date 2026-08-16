import React from "react";
import CanvaForm01 from "./common/Form/CanvaForm01";


const formFields = [
    {
        name: "firstName",
        label: "First Name",
        type: "text",
        required: true,
        placeholder: "Enter your first name",
    },
    {
        name: "lastName",
        label: "Last Name",
        type: "text",
        required: true,
        placeholder: "Enter your last name",
    },
    {
        name: "email",
        label: "Email Address",
        type: "email",
        required: true,
        placeholder: "Enter your email address",
    },
    {
        name: "phone",
        label: "Phone Number",
        type: "tel",
        required: false,
        placeholder: "+1 (555) 123-4567",
    },
    {
        name: "company",
        label: "Company",
        type: "text",
        required: true,
        placeholder: "Enter your company name",
    },
    {
        name: "position",
        label: "Position",
        type: "select",
        required: true,
        placeholder: "Select your position",
        options: [
            { value: "developer", label: "Software Developer" },
            { value: "designer", label: "UI/UX Designer" },
            { value: "manager", label: "Project Manager" },
            { value: "analyst", label: "Business Analyst" },
            { value: "other", label: "Other" },
        ],
    },
    {
        name: "experience",
        label: "Years of Experience",
        type: "radio",
        required: true,
        options: [
            { value: "0-2", label: "0-2 years" },
            { value: "3-5", label: "3-5 years" },
            { value: "6-10", label: "6-10 years" },
            { value: "10+", label: "10+ years" },
        ],
    },
    {
        name: "message",
        label: "Additional Information",
        type: "textarea",
        required: false,
        placeholder: "Tell us more about yourself or your project...",
    },
    {
        name: "newsletter",
        label: "Subscribe to our newsletter for updates and insights",
        type: "checkbox",
        required: false,
        description: "We respect your privacy and will never spam you.",
    },
    {
        name: "terms",
        label: "I agree to the Terms of Service and Privacy Policy",
        type: "checkbox",
    },
];

const FormDemo01 = () => {

    const handleSubmit = async (data) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        alert(
            "Form submitted successfully!\n\n" + JSON.stringify(data, null, 2)
        );
    };

    return (
        <div className="min-h-screen py-8 px-4">
            <CanvaForm01
                fields={formFields}
                onSubmit={handleSubmit}
                title="Enterprise Contact Form"
                submitText="Submit Application"
                className="fade-in"
            />
        </div>
    );
};

export default FormDemo01;