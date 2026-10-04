import { FieldForm, type FieldFormField } from "..";

const fields: FieldFormField[] = [
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
    placeholder: "+15551234567",
  },
  {
    name: "teamSize",
    label: "Team Size",
    type: "number",
    placeholder: "How many people are on your team?",
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
    searchable: true,
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
    placeholder: "Tell us more about yourself or your project...",
  },
  {
    name: "newsletter",
    label: "Subscribe to our newsletter for updates and insights",
    type: "checkbox",
    description: "We respect your privacy and will never spam you.",
  },
  {
    name: "terms",
    label: "I agree to the Terms of Service and Privacy Policy",
    type: "checkbox",
    required: true,
  },
];

export default function FieldFormDemo() {
  return (
    <div className="mx-auto max-w-xl rounded-xl border border-border bg-surface p-6 shadow-sm">
      <FieldForm
        title="Enterprise contact form"
        fields={fields}
        submitText="Submit application"
        resetText="Reset"
        onSubmit={async (data) => {
          await new Promise((resolve) => setTimeout(resolve, 600));
          window.alert(JSON.stringify(data, null, 2));
        }}
      />
    </div>
  );
}
