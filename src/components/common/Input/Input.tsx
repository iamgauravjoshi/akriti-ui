import * as React from "react";
import {Eye, EyeOff} from "lucide-react";

export interface InputProps {
    type: string;
    name: string;
    label?: string;
    placeholder?: string;
    icon?: React.ReactElement;
    value: string;
    required?: boolean;
    autocomplete?: string | undefined;
    onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ICheckboxInputProps {
    name: string;
    label?: string;
    checked: boolean;
    onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input(props: InputProps) {
    const {type, name, label, placeholder = "Enter a value", icon, value, required = false, autocomplete = "on", onchange} = props;

    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    const inputType = type === "password" && showPassword ? "text" : type;

    return (
        <div className="space-y-2">
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-blue-100">
                    {label}
                </label>
            )}

            <div className="relative">
                {icon && icon}
                <input
                    type={inputType}
                    name={name}
                    placeholder={placeholder}
                    required={required}
                    onChange={onchange}
                    value={value}
                    autoComplete={autocomplete}
                    className={`w-full px-4 py-3 ${icon && 'pl-10'} bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all`}
                />
                {
                    type === "password" &&
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-blue-200 transition-colors"
                    >
                        {showPassword ? <Eye className="w-5 h-5"/> : <EyeOff className="w-5 h-5"/>}
                    </button>
                }
            </div>
        </div>
    );
}

function CheckboxInput(props: ICheckboxInputProps) {

    const {name, label, checked, onchange} = props;

    return (
        <label className="flex items-center space-x-2">
            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onchange}
                className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-400 focus:ring-2"
            />
            <span className="text-sm text-blue-100">{label}</span>
        </label>
    )
}

export {
    Input,
    CheckboxInput
};
