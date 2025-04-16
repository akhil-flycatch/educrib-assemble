"use client";

import type React from "react";

import {
  useState,
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  useEffect,
} from "react";
import type { FieldError } from "react-hook-form";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  id: string;
  label: string;
  error?: FieldError | string;
  helperText?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      error,
      helperText,
      startIcon,
      endIcon,
      className = "",
      containerClassName = "",
      labelClassName = "",
      type = "text",
      disabled = false,
      required = false,
      placeholder = "",
      ...rest
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState(value || defaultValue || "");

    // Update internal state when controlled value changes
    useEffect(() => {
      if (value !== undefined) {
        setInputValue(value);
      }
    }, [value]);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (onFocus) onFocus(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(inputValue ? true : false);
      if (onBlur) onBlur(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (type === "number") {
        value = e.target.value ? parseFloat(e.target.value) : NaN;
        setInputValue(value);
      }

      if (value === undefined) {
        setInputValue(e.target.value);
      }
      if (onChange) onChange(e);
    };

    const isActive = isFocused || Boolean(inputValue) || (type === "number" && inputValue === 0);

    // Handle error from react-hook-form or string
    const errorMessage =
      typeof error === "string" ? error : error?.message || "";
    const hasError = Boolean(error);

    return (
      <div className={`space-y-1 ${containerClassName}`}>
        <div className="relative">
          {startIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              {startIcon}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            type={type}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            required={required}
            placeholder={isActive ? placeholder : ""}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? `${id}-error` : helperText ? `${id}-helper` : undefined
            }
            className={`
              w-full px-4 py-4 text-base text-gray-700 
              border rounded-md transition-all duration-200
              focus:outline-none
              ${isActive ? "pt-6 pb-2" : ""}
              ${
                hasError
                  ? "border-red-500 focus:border-red-500"
                  : isActive
                  ? "border-blue-500"
                  : "border-primary"
              }
              ${disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}
              ${startIcon ? "pl-10" : ""}
              ${endIcon ? "pr-10" : ""}
              ${className}
            `}
            {...rest}
          />

          <label
            htmlFor={id}
            className={`
              absolute left-4 transition-all duration-200
              pointer-events-none
              ${startIcon ? "left-10" : "left-4"}
              ${isActive ? "text-xs top-2" : "text-base top-4"}
              ${
                hasError
                  ? "text-red-500"
                  : isActive
                  ? "text-blue-500"
                  : "text-gray-500"
              }
              ${disabled ? "text-gray-400" : ""}
              ${labelClassName}
            `}
          >
            {label}
            {required && !disabled && (
              <span className="text-red-500 ml-1">*</span>
            )}
          </label>

          {endIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              {endIcon}
            </div>
          )}
        </div>

        {helperText && !hasError && (
          <p id={`${id}-helper`} className="text-xs text-gray-500 px-1">
            {helperText}
          </p>
        )}

        {hasError && (
          <p
            id={`${id}-error`}
            className="text-xs text-red-500 px-1"
            role="alert"
          >
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
