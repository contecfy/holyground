import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
    variant?: "default" | "filled" | "outlined" | "underline";
}

const Textarea = ({
    label,
    error,
    helperText,
    variant = "default",
    className = "",
    ...props
}: TextareaProps) => {
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
        resize-y min-h-[100px]
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
            <textarea
                className={`${baseClasses} ${className}`.trim().replace(/\s+/g, ' ')}
                {...props}
            />
            {error && (
                <p className="mt-1.5 text-sm text-red-600">{error}</p>
            )}
            {helperText && !error && (
                <p className="mt-1.5 text-sm text-[#6b5d4a]">{helperText}</p>
            )}
        </div>
    );
};

export default Textarea;

