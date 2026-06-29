"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-container text-on-primary font-bold hover:opacity-90 transition-opacity",
  secondary:
    "border border-border-default bg-surface-white text-on-surface hover:bg-surface-container-low transition-colors",
  ghost:
    "text-on-surface-variant hover:bg-surface-container-low transition-colors",
  danger:
    "bg-error text-on-error font-bold hover:opacity-90 transition-opacity",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-[12px] font-semibold leading-[16px] gap-1",
  md: "px-4 py-2 text-[14px] font-medium leading-[16px] tracking-[0.01em] gap-2",
  lg: "px-8 py-3 text-[14px] font-medium leading-[16px] tracking-[0.01em] gap-2",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "left",
      fullWidth,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const iconSize =
      size === "sm" ? "text-[14px]" : size === "md" ? "text-[18px]" : "text-[18px]";

    return (
      <button
        ref={ref}
        className={`font-['Inter'] rounded-lg flex items-center justify-center ${
          variantClasses[variant]
        } ${sizeClasses[size]} ${fullWidth ? "w-full" : ""} disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        {...props}
      >
        {icon && iconPosition === "left" && (
          <span className={`material-symbols-outlined ${iconSize}`}>
            {icon}
          </span>
        )}
        {children}
        {icon && iconPosition === "right" && (
          <span className={`material-symbols-outlined ${iconSize}`}>
            {icon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
