import React, { ReactNode } from "react";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "sm" | "md";
  variant?: "primary" | "outline";
  color?: "primary" | "success" | "error" | "destructive";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
   type = "button",
  children,
  size = "md",
  variant = "primary",
  color = "primary",
  startIcon,
  endIcon,
  className = "",
  disabled = false,
  ...props // ✅ IMPORTANT (type, onClick, etc.)
}) => {
  // Size Classes
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-3 text-sm",
  };

  // Variant Classes
  const variantClasses = {
    primary: {
      primary:
        "bg-brand-500 text-white hover:bg-brand-600 disabled:bg-brand-300",
      success:
        "bg-green-600 text-white hover:bg-green-700 disabled:bg-green-400",
      error: "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400",
      destructive:
        "bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300",
    },
    outline: {
      primary:
        "bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
      success:
        "bg-white text-green-600 ring-1 ring-green-400 hover:bg-green-50",
      error:
        "bg-white text-red-600 ring-1 ring-red-400 hover:bg-red-50",
      destructive:
        "bg-white text-red-500 ring-1 ring-red-400 hover:bg-red-50",
    },
  };

  const appliedClasses = variantClasses[variant][color];

  return (
    <button
     type={type}
      {...props} // ✅ allows type="submit"
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg transition
        ${sizeClasses[size]}
        ${appliedClasses}
        ${disabled ? "cursor-not-allowed opacity-50" : ""}
        ${className}`}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      {children}
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
};

export default Button;
