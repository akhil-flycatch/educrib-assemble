"use client";

import { getAllContactTypes } from "@/api";
import FileUpload from "@/components/hookForm/fileUpload";
import Input from "@/components/hookForm/input";
import Select from "@/components/hookForm/select";
import useFileUpload from "@/utils/hooks/useFileUpload";
import { useEffect, useState } from "react";
import {
  Controller,
  FieldErrors,
  FieldValues,
  UseFormSetValue,
  Control,
} from "react-hook-form";
import * as z from "zod";

export const contactFormSchema = z.object({
  avatar: z.string().optional().nullable(),
  name: z.string(),
  type: z.string(),
  phone: z.string(),
  email: z.string().email("Invalid email address"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

interface Props {
  errors: FieldErrors<FieldValues>;
  control: Control<ContactFormValues>;
  setValue: UseFormSetValue<ContactFormValues>;
  defaultValues?: Partial<ContactFormValues>;
  watch?: any;

}

const ContactForm: React.FC<Props> = ({ control, errors, setValue, defaultValues,watch }) => {
  const uploadFile = async (file: File): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return URL.createObjectURL(file);
  };

  const [contactType, setContactType] = useState<{ id: string; title: string }[]>([]);
console.log(defaultValues, "the default values in contact form");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const input = await getAllContactTypes();
        setContactType(input);
      } catch (error) {
        console.error("Failed to fetch contact types", error);
      }
    };
    fetchData();
  }, []);
  const ImageUrlChange = (url: string) => {
    console.log("Image URL received:", url); // Debugging log
    setValue("avatar", url, { shouldValidate: true }); // Update the avatar field
  };

  return (
    <div className="flex-1 w-[756px] flex flex-col gap-6">
      <div className="w-full grid grid-cols-2">
        <FileUpload
          value={watch("avatar")} // Watch the avatar field for changes
          id="avatar"
          onUpload={uploadFile} // Handle file upload
          error={errors.avatar}
          ImageUrlChange={ImageUrlChange} // Pass the ImageUrlChange function
          // onChange={(url) => {
          //   console.log("onChange URL:", url); // Debugging log
          //   setValue("avatar", url, { shouldValidate: true }); // Update the avatar field
          // }}
        />
      </div>

      <div className="w-full grid grid-cols-1">
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <Input
              id="name"
              label="Contact Name"
              error={errors.name}
              {...field}
            />
          )}
        />
      </div>

      <div className="w-full grid grid-cols-1">
        <Controller
          control={control}
          name="type"
          defaultValue={defaultValues?.type || ""}
          render={({ field }) => (
            <Select
              id="type"
              label="Contact Type"
              options={contactType.map((type) => ({
                label: type.title,
                value: type.id,
              }))}
              error={errors.type}
              required
              {...field}
            />
          )}
        />
      </div>

      <div className="w-full grid grid-cols-1">
        <Controller
          control={control}
          name="phone"
          defaultValue={defaultValues?.phone || ""}
          render={({ field }) => (
            <Input
              id="phone"
              label="Phone Number"
              type="tel"
              error={errors.phone}
              {...field}
            />
          )}
        />
      </div>

      <div className="w-full grid grid-cols-1">
        <Controller
          control={control}
          name="email"
          defaultValue={defaultValues?.email || ""}
          render={({ field }) => (
            <Input
              id="email"
              label="Email"
              type="email"
              error={errors.email}
              {...field}
            />
          )}
        />
      </div>
    </div>
  );
};

export default ContactForm;
