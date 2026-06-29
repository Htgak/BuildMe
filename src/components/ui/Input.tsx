"use client";

import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon, error, helperText, className = "", id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            className="font-['Inter'] text-[14px] font-medium leading-[16px] tracking-[0.01em] text-on-surface flex items-center gap-1"
            htmlFor={id}
          >
            {icon && (
              <span className="material-symbols-outlined text-[16px] text-outline">
                {icon}
              </span>
            )}
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`form-input w-full rounded-lg border bg-surface-container-lowest px-3 py-2 font-['Source_Sans_3'] text-[16px] leading-[24px] text-on-surface focus:outline-none transition-shadow ${
            error ? "border-error" : "border-border-default"
          } ${className}`}
          {...props}
        />
        {error && (
          <p className="font-['Source_Sans_3'] text-[12px] text-error">{error}</p>
        )}
        {helperText && !error && (
          <p className="font-['Source_Sans_3'] text-[12px] text-outline-variant">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
