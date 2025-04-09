"use client";

import type React from "react";

import { forwardRef, useEffect, useState } from "react";
import type { FieldError } from "react-hook-form";
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import useFileUpload from "@/utils/hooks/useFileUpload";
import { v4 as uuidv4 } from "uuid";

export interface FileUploadProps {
  id: string;
  onChange?: (value: string) => void;
  onUpload: (file: File) => Promise<string>;
  value?: string;
  defaultValue?: string;
  error?: FieldError | string;
  disabled?: boolean;
  className?: string;
  accept?: string;
  maxSize?: number; // in bytes
  ImageUrlChange?:any
}

const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      id,
      onChange,
      onUpload,
      value,
      ImageUrlChange,
      defaultValue,
      error,
      disabled = false,
      className = "",
      accept = "image/*",
      maxSize = 5 * 1024 * 1024,
      ...props
    },
    ref
  ) => {
    const [preview, setPreview] = useState<string>(value || defaultValue || "");
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string>("");
    // const [ImageUrl, setImageUrl] = useState<any>()

    const { globalLoading, filesData, uploadFilesToStorage, removeFile } =
      useFileUpload();
    const supabase = createClientComponentClient();

    useEffect(() => {
      if (value) {
        setPreview(value);
      }
    }, [value]);

    const handleFileChange = async (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file = event.target.files?.[0];
      if (!file) return;
      if (file.size > maxSize) {
        setUploadError(
          `File size should be less than ${maxSize / (1024 * 1024)}MB`
        );
        return;
      }

      try {
        const uuid = uuidv4().replace(/-/g, "");
        const fileName = `${uuid}_${file.name}`;

        const { data, error } = await supabase.storage
          .from("educrib-test")
          .upload(fileName, file);

        if (error) {
        } else {
          const resUrlData = await supabase.storage
            .from("educrib-test")
            .getPublicUrl(data.path);
          const publicUrl = resUrlData.data.publicUrl;
          await ImageUrlChange(publicUrl)
        }

        const value = await uploadFilesToStorage(
          [file],
          "educrib-test",
          supabase
        );
        setIsUploading(true);
        setUploadError("");
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        const uploadedUrl = await onUpload(file);
        if (onChange) {
          onChange(uploadedUrl);
        }
        URL.revokeObjectURL(objectUrl);
        setPreview(uploadedUrl);
      } catch (err) {
        setUploadError(
          err instanceof Error ? err.message : "Failed to upload file"
        );
        setPreview(value || defaultValue || "");
      } finally {
        setIsUploading(false);
      }
    };

    const errorMessage =
      uploadError || (typeof error === "string" ? error : error?.message);

    return (
      <div className={`flex items-center gap-4 ${className}`}>
        <div className="relative h-16 w-16 shrink-0">
          <div className="h-full w-full overflow-hidden rounded-full border bg-gray-50">
            {preview ? (
              <Image
                src={preview || "/images/avatar-upload.svg"}
                alt="Uploaded image"
                className="h-full w-full object-cover"
                width={64}
                height={64}
              />
            ) : (
              <Image
                src={"/images/avatar-upload.svg"}
                alt="avatar"
                width={64}
                height={64}
              />
            )}
          </div>
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-white" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <input
              ref={ref}
              id={id}
              type="file"
              accept={accept}
              disabled={disabled || isUploading}
              onChange={handleFileChange}
              className="hidden"
              {...props}
            />
            <label
              htmlFor={id}
              className={`
                  inline-flex cursor-pointer items-center gap-2 rounded-md border px-4 py-2
                  text-sm font-medium shadow-sm transition-colors
                 border-primary bg-white text-primary hover:bg-light hover:border-[#B3B9C4] focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-blue-500 focus-visible:ring-offset-2
                  ${
                    disabled || isUploading
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }
                  ${errorMessage ? "border-red-500" : "border-gray-300"}
                `}
            >
              <Image
                src={"/images/upload.svg"}
                alt="avatar"
                width={20}
                height={20}
              />
              Upload Photo
            </label>
          </div>

          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
        </div>
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";

export default FileUpload;
