import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    variant?: "default" | "filled" | "outlined" | "underline";
}

const Input = ({
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    variant = "default",
    className = "",
    ...props
}: InputProps) => {
    const variantClasses = {
        default: "bg-white border border-[#d4c4b0] focus:border-[#8b6f47]",
        filled: "bg-[#f5f1eb] border border-[#e8dfd0] focus:border-[#8b6f47] focus:bg-white",
        outlined: "bg-transparent border-2 border-[#c9a882] focus:border-[#8b6f47]",
        underline: "bg-transparent border-0 border-b border-[#d4c4b0] focus:border-[#8b6f47] rounded-none px-0"
    };

    const baseClasses = `
        w-full px-4 py-2.5 rounded-md
        text-[#3d2817] placeholder:text-[#6b5d4a]
        focus:outline-none transition-all duration-200
        ${variant === "underline" ? "" : "focus:ring-2 focus:ring-[#8b6f47]/20"}
        ${error ? "border-red-500 focus:border-red-500" : ""}
        ${error && variant !== "underline" ? "focus:ring-red-500/20" : ""}
        ${variantClasses[variant]}
    `.trim().replace(/\s+/g, ' ');

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-[#3d2817] mb-1.5">
                    {label}
                </label>
            )}
            <div className="relative">
                {leftIcon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b5d4a]">
                        {leftIcon}
                    </div>
                )}
                <input
                    className={`
                        ${baseClasses}
                        ${leftIcon ? "pl-10" : ""}
                        ${rightIcon ? "pr-10" : ""}
                        ${className}
                    `.trim().replace(/\s+/g, ' ')}
                    {...props}
                />
                {rightIcon && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b5d4a]">
                        {rightIcon}
                    </div>
                )}
            </div>
            {error && (
                <p className="mt-1.5 text-sm text-red-600">{error}</p>
            )}
            {helperText && !error && (
                <p className="mt-1.5 text-sm text-[#6b5d4a]">{helperText}</p>
            )}
        </div>
    );
};

export default Input;

