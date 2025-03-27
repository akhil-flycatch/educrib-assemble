import Input from "@/components/hookForm/input";
import Select from "@/components/hookForm/select";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import * as z from "zod";

export const locationFormSchema = z.object({
  name: z.string(),
  university: z.string(),
  accreditation: z.string(),
  type: z.string(),
  establishedYear: z.number(),
  website: z.string(),
  phone: z.string(),
  email: z.string().email("Invalid email address"),
});

export type LocationFormValues = z.infer<typeof locationFormSchema>;

interface Props {
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
}
const LocationForm: React.FC<Props> = ({ errors, register }) => {
  return (
    <div className="w-[387px] flex flex-col gap-6">
      <div className="w-full grid grid-cols-1">
        <Input
          id="url"
          label="Google Map URL"
          error={errors.url}
          {...register("url")}
        />
      </div>

      <div className="w-full grid grid-cols-1">
        <Input
          id="address"
          label="Address"
          error={errors.address}
          {...register("address")}
        />
      </div>

      <div className="w-full grid grid-cols-1">
        <Input
          id="city"
          label="City"
          error={errors.city}
          {...register("city")}
        />
      </div>

      <div className="w-full grid grid-cols-1">
        <Input
          id="district"
          label="District"
          error={errors.district}
          {...register("district")}
        />
      </div>

      <div className="w-full grid grid-cols-1">
        <Input
          id="pinCode"
          label="Pin Code"
          error={errors.pinCode}
          {...register("pinCode")}
        />
      </div>

      <div className="w-full grid grid-cols-1">
        <Input
          id="state"
          label="State"
          error={errors.state}
          {...register("state")}
        />
      </div>
    </div>
  );
};

export default LocationForm;
