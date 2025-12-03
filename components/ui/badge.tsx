import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    size?: "sm" | "md" | "lg";
    className?: string;
    onClick?: () => void;
}

const Badge = ({
    children,
    variant = "default",
    size = "md",
    className = "",
    onClick
}: BadgeProps) => {
    const sizeClasses = {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-1 text-sm",
        lg: "px-3 py-1.5 text-base"
    };

    const variantClasses = {
        default: "bg-[#f5f1eb] text-[#5d4a2f] border border-[#e8dfd0]",
        primary: "bg-[#5d4a2f] text-white",
        secondary: "bg-[#8b6f47] text-white",
        success: "bg-green-100 text-green-800 border border-green-200",
        warning: "bg-amber-100 text-amber-800 border border-amber-200",
        danger: "bg-red-100 text-red-800 border border-red-200"
    };

    const baseClasses = `
        inline-flex items-center justify-center
        font-medium rounded-full
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${onClick ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}
    `.trim().replace(/\s+/g, ' ');

    return (
        <span
            className={`${baseClasses} ${className}`}
            onClick={onClick}
        >
            {children}
        </span>
    );
};

export default Badge;

