"use client";

import type React from "react";

import {
  useState,
  forwardRef,
  type SelectHTMLAttributes,
  type ReactNode,
} from "react";
import type { FieldError } from "react-hook-form";
import { ChevronDown } from "lucide-react";

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "className"> {
  id: string;
  label: string;
  error?: FieldError | string;
  helperText?: string;
  startIcon?: ReactNode;
  options: Array<{ value: string; label: string }>;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      id,
      label,
      error,
      helperText,
      startIcon,
      options,
      className = "",
      containerClassName = "",
      labelClassName = "",
      disabled = false,
      required = false,
      placeholder = "Select",
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [selectedValue, setSelectedValue] = useState(
      value || defaultValue || ""
    );

    const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
      setIsFocused(true);
      if (onFocus) onFocus(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
      setIsFocused(selectedValue ? true : false);
      if (onBlur) onBlur(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedValue(e.target.value);
      if (onChange) onChange(e);
    };

    const isActive = isFocused || Boolean(selectedValue);
    
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

          <select
            ref={ref}
            id={id}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            required={required}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? `${id}-error` : helperText ? `${id}-helper` : undefined
            }
            className={`
              w-full px-4 py-4 text-base text-gray-700 appearance-none
              border rounded-md transition-all duration-200
              focus:outline-none
              ${isActive ? "pt-6 pb-2" : ""}
              ${
                hasError
                  ? "border-red-500 focus:border-red-500"
                  : isActive
                  ? "border-blue-500"
                  : "border-gray-300"
              }
              ${disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}
              ${startIcon ? "pl-10" : ""}
              pr-10
              ${className}
              ${!selectedValue ? "text-gray-500" : ""}
            `}
            {...rest}
          >
            <option value="" disabled hidden>
              {placeholder}
            </option>
            {options.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

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

          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            <ChevronDown size={18} />
          </div>
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

Select.displayName = "Select";

export default Select;
