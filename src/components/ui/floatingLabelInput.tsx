"use client";

import { useState, type ChangeEvent, type FocusEvent } from "react";

interface FloatingLabelInputProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

export default function FloatingLabelInput({
  id,
  name,
  label,
  value,
  onChange,
  required = false,
  placeholder = "",
  className = "",
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(value.length > 0);
  };

  const isActive = isFocused || value.length > 0;

  return (
    <div className={`relative ${className}`}>
      <input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={isActive ? placeholder : ""}
        required={required}
        className={`
          w-full px-4 py-4 text-base text-gray-700 
          border rounded-md transition-all duration-200
          focus:outline-none
          ${isActive ? "border-blue-500 pt-6 pb-2" : "border-gray-300"}
        `}
      />
      <label
        htmlFor={id}
        className={`
          absolute left-4 transition-all duration-200
          pointer-events-none
          ${
            isActive
              ? "text-xs text-blue-500 top-2"
              : "text-base text-gray-500 top-4"
          }
        `}
      >
        {label}
      </label>
    </div>
  );
}
