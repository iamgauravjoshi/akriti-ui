import * as React from "react";

type TextareaProps = {
    name: string;
    label?: string;
    placeholder?: string;
    icon?: React.ReactNode;
    value: string;
    required?: boolean;
    rows?: number;
    autoComplete?: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

function Textarea(props: TextareaProps) {
    const {
        name,
        label,
        placeholder = "Enter a value",
        icon,
        value,
        required = false,
        rows = 4,
        autoComplete = "on",
        onChange,
    } = props;

    return (
        <div className="space-y-2">
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-blue-100">
                    {label}
                </label>
            )}

            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-3 text-blue-300">
                        {icon}
                    </div>
                )}
                <textarea
                    name={name}
                    placeholder={placeholder}
                    required={required}
                    rows={rows}
                    autoComplete={autoComplete}
                    onChange={onChange}
                    value={value}
                    className={`w-full px-4 py-3 ${icon ? 'pl-10' : ''} bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all resize-none`}
                />
            </div>
        </div>
    );
}

export default React.forwardRef(Textarea);
