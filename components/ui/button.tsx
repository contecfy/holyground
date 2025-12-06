import React from "react";

interface ButtonProps {
  buttonType?:
    | "primary"
    | "secondary"
    | "danger"
    | "warning"
    | "info"
    | "success";
  buttonSize?: "small" | "medium" | "large";
  buttonVariant?: "outline" | "solid" | "ghost" | "link";
  buttonShape?: "rounded" | "square" | "pill";
  buttonLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  hasText?: boolean;
  buttonDisabled?: boolean;
  buttonIcon?: React.ReactNode;
  buttonText?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  children?: React.ReactNode;
}

const Button = ({
  buttonType = "primary",
  buttonSize = "medium",
  buttonVariant = "solid",
  buttonShape = "rounded",
  buttonLoading = false,
  buttonDisabled = false,
  icon,
  iconPosition = "left",
  hasText = true,
  buttonIcon,
  buttonText,
  onClick,
  type = "button",
  className = "",
  children,
}: ButtonProps) => {
  const displayIcon = buttonIcon || icon;
  const displayText = buttonText || children;

  // Size classes
  const sizeClasses = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  // Shape classes
  const shapeClasses = {
    rounded: "rounded-md",
    square: "rounded-none",
    pill: "rounded-full",
  };

  // Type and variant combinations
  const getVariantClasses = () => {
    const baseClasses =
      "font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

    if (buttonVariant === "link") {
      return `${baseClasses} underline-offset-4 hover:underline`;
    }

    if (buttonVariant === "ghost") {
      const typeColors = {
        primary: "text-[#5d4a2f] hover:bg-[#e8dfd0]",
        secondary: "text-[#6b5d4a] hover:bg-[#f5f1eb]",
        danger: "text-red-700 hover:bg-red-50",
        warning: "text-amber-700 hover:bg-amber-50",
        info: "text-blue-700 hover:bg-blue-50",
        success: "text-green-700 hover:bg-green-50",
      };
      return `${baseClasses} ${typeColors[buttonType]}`;
    }

    if (buttonVariant === "outline") {
      const typeColors = {
        primary:
          "border-2 border-[#5d4a2f] text-[#5d4a2f] hover:bg-[#5d4a2f] hover:text-white",
        secondary:
          "border-2 border-[#8b6f47] text-[#8b6f47] hover:bg-[#8b6f47] hover:text-white",
        danger:
          "border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white",
        warning:
          "border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white",
        info: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
        success:
          "border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white",
      };
      return `${baseClasses} ${typeColors[buttonType]}`;
    }

    // Solid variant
    const typeColors = {
      primary:
        "bg-[#5d4a2f] text-white hover:bg-[#3d2817] shadow-md hover:shadow-lg",
      secondary:
        "bg-[#8b6f47] text-white hover:bg-[#6b5d4a] shadow-md hover:shadow-lg",
      danger:
        "bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg",
      warning:
        "bg-amber-600 text-white hover:bg-amber-700 shadow-md hover:shadow-lg",
      info: "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg",
      success:
        "bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg",
    };
    return `${baseClasses} ${typeColors[buttonType]}`;
  };

  const buttonClasses = `
        ${sizeClasses[buttonSize]}
        ${shapeClasses[buttonShape]}
        ${getVariantClasses()}
        ${className}
        flex items-center justify-center gap-2
    `
    .trim()
    .replace(/\s+/g, " ");

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={buttonDisabled || buttonLoading}
    >
      {buttonLoading ? (
        <span className="animate-spin">⏳</span>
      ) : (
        <>
          {displayIcon && iconPosition === "left" && (
            <span className="flex-shrink-0">{displayIcon}</span>
          )}
          {hasText && displayText && <span>{displayText}</span>}
          {displayIcon && iconPosition === "right" && (
            <span className="flex-shrink-0">{displayIcon}</span>
          )}
        </>
      )}
    </button>
  );
};

export default Button;
