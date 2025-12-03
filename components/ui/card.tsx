import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "elevated" | "outlined" | "paper";
    onClick?: () => void;
}

const Card = ({ 
    children, 
    className = "",
    variant = "default",
    onClick
}: CardProps) => {
    const variantClasses = {
        default: "bg-white border border-[#d4c4b0]",
        elevated: "bg-white border border-[#d4c4b0] shadow-lg",
        outlined: "bg-transparent border-2 border-[#c9a882]",
        paper: "bg-[#f5f1eb] border border-[#e8dfd0] shadow-sm"
    };

    const baseClasses = "rounded-lg p-4 transition-all duration-200";
    const interactiveClasses = onClick ? "cursor-pointer hover:shadow-md hover:border-[#8b6f47]" : "";

    return (
        <div 
            className={`${baseClasses} ${variantClasses[variant]} ${interactiveClasses} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Card;

