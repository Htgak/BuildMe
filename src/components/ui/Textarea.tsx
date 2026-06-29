"use client";

import { forwardRef, TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  maxChars?: number;
  currentChars?: number;
  rightAction?: React.ReactNode;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      maxChars,
      currentChars,
      rightAction,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-1.5">
        {(label || rightAction) && (
          <div className="flex justify-between items-center">
            {label && (
              <label
                className="font-['Inter'] text-[14px] font-medium leading-[16px] tracking-[0.01em] text-on-surface"
                htmlFor={id}
              >
                {label}
              </label>
            )}
            {rightAction}
          </div>
        )}
        <textarea
          ref={ref}
          id={id}
          className={`form-input w-full rounded-lg border bg-surface-container-lowest px-3 py-2 font-['Source_Sans_3'] text-[16px] leading-[24px] text-on-surface focus:outline-none transition-shadow resize-y ${
            error ? "border-error" : "border-border-default"
          } ${className}`}
          {...props}
        />
        <div className="flex justify-between">
          {error && (
            <p className="font-['Source_Sans_3'] text-[12px] text-error">
              {error}
            </p>
          )}
          {maxChars !== undefined && (
            <p className="font-['Source_Sans_3'] text-[12px] text-outline-variant text-right ml-auto">
              {currentChars ?? 0} / {maxChars} characters
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;
