import FileUpload from "@/components/hookForm/fileUpload";
import Input from "@/components/hookForm/input";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import * as z from "zod";

export const staffFormSchema = z.object({
  id: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  designation: z.string(),
  email: z.string().email(),
  phone: z.string().min(10, { message: "invalid phone number" }),
  title: z.string(),
});

export type StaffFormValues = z.infer<typeof staffFormSchema>;

interface Props {
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues>;
  setValue: UseFormSetValue<StaffFormValues>;
  getValues: UseFormGetValues<StaffFormValues>;
  setImageUrlChange: (url: string) => void
}

const StaffForm: React.FC<Props> = ({ errors, register, control, setValue, getValues, setImageUrlChange }) => {
  const uploadFile = async (file: File): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return URL.createObjectURL(file);
  };
  const ImageUrlChange = (url: any) => {
    setImageUrlChange(url);
  };

  return (
    <div className="flex-1 w-[756px] flex flex-col gap-6">
      <div>
        <FileUpload
          value={getValues("avatar") ?? undefined}
          id="avatar"
          onUpload={uploadFile}
          error={errors.avatar}
          ImageUrlChange={ImageUrlChange}
          onChange={(url) => setValue("avatar", url, { shouldValidate: true })}
        />
      </div>

      <div className="w-full grid grid-cols-1">
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <Input
              id="title"
              label="Staff Name"
              {...field}
              error={errors?.title}
              {...register("title")}
            />
          )}
        />
      </div>

      <div className="w-full grid grid-cols-1">
        <Controller
          control={control}
          name="designation"
          render={({ field }) => (
            <Input
              id="designation"
              label="Staff Designation"
              {...field}
              error={errors?.designation}
              {...register("designation")}
            />
          )}
        />
      </div>

      <div className="w-full grid grid-cols-1">
        <Controller
          control={control}
          name="phone"
          render={({ field }) => (
            <Input
              id="phone"
              label="Phone Number"
              type="tel"
              {...field}
              error={errors?.phone}
              {...register("phone")}
            />
          )}
        />
      </div>

      <div className="w-full grid grid-cols-1">
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input
              id="email"
              label="Email"
              type="tel"
              {...field}
              error={errors?.email}
              {...register("email")}
            />
          )}
        />
      </div>
    </div>
  );
};

export default StaffForm;
