import FileUpload from "@/components/hookForm/fileUpload";
import Input from "@/components/hookForm/input";
import Select from "@/components/hookForm/select";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
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
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<ContactFormValues>;
}

const ConatctForm: React.FC<Props> = ({ register, errors, setValue }) => {
  // Sample upload function - replace with actual upload logic
  const uploadFile = async (file: File): Promise<string> => {
    // Simulating upload delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Upload logic here
    // For demo, we'll create an object URL
    return URL.createObjectURL(file);
  };

  return (
    <div className="flex-1 w-[756px] flex flex-col gap-6">
      <div className="w-full grid grid-cols-2">
        <FileUpload
          id="avatar"
          onUpload={uploadFile}
          error={errors.avatar}
          onChange={(url) => setValue("avatar", url, { shouldValidate: true })}
        />
      </div>
      <div className="w-full grid grid-cols-1">
        <Input
          id="name"
          label="Contact Name"
          error={errors.name}
          {...register("name")}
        />
      </div>

      <div className="w-full grid grid-cols-1">
        <Select
          id="type"
          label="Contact Type"
          options={[
            { label: "Type1", value: "type1" },
            { label: "Type2", value: "type2" },
          ]}
          error={errors.type}
          required
          {...register("type")}
        />
      </div>

      <div className="w-full grid grid-cols-1">
        <Input
          id="phone"
          label="Phone Number"
          type="tel"
          error={errors.phone}
          {...register("phone")}
        />
      </div>

      <div className="w-full grid grid-cols-1">
        <Input
          id="email"
          label="Email"
          type="email"
          error={errors.email}
          {...register("email")}
        />
      </div>
    </div>
  );
};

export default ConatctForm;
