import Input from "@/components/hookForm/input";
import Select from "@/components/hookForm/select";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import * as z from "zod";

export const overviewFormSchema = z.object({
  name: z.string(),
  university: z.string(),
  accreditation: z.string(),
  type: z.string(),
  establishedYear: z.number() || z.string(),
  website: z.string().regex(
    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
  ),
  phone: z.string(),
  email: z.string().email("Invalid email address"),
});

export type OverviewFormValues = z.infer<typeof overviewFormSchema>;

interface Props {
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
}
const OverviewForm: React.FC<Props> = ({ errors, register }) => {
  return (
    <div className="flex-1 w-[756px] flex flex-col gap-6">
      <div className="w-full grid grid-cols-1">
        <Input
          id="name"
          label="College Name"
          error={errors?.name}
          {...register("name")}
        />
      </div>

      <div className="w-full grid grid-cols-1">
        <Select
          id="university"
          label="University"
          options={[
            { label: "University1", value: "university1" },
            { label: "University2", value: "university2" },
          ]}
          error={errors?.university}
          required
          {...register("university")}
        />
      </div>

      <div className="w-full grid grid-cols-1">
        <Input
          id="establishedYear"
          label="Established Year"
          type="number"
          error={errors?.establishedYear}
          {...register("establishedYear")}
        />
      </div>
      <div className="w-full grid grid-cols-2 gap-6">
        <Select
          id="accreditation"
          label="Accreditation"
          options={[
            { label: "Accreditation1", value: "accreditation1" },
            { label: "Accreditation2", value: "accreditation2" },
          ]}
          error={errors?.accreditation}
          required
          {...register("accreditation")}
        />
        <Select
          id="type"
          label="Type"
          options={[
            { label: "Type1", value: "type1" },
            { label: "Type2", value: "type2" },
          ]}
          error={errors?.type}
          required
          {...register("type")}
        />
      </div>

      <div className="w-full grid grid-cols-1">
        <Input
          id="website"
          label="Website"
          error={errors?.website}
          {...register("website")}
        />
      </div>

      <div className="w-full grid grid-cols-1">
        <Input
          id="phone"
          label="Phone Number"
          type="tel"
          error={errors?.phone}
          {...register("phone")}
        />
      </div>

      <div className="w-full grid grid-cols-1">
        <Input
          id="email"
          label="Email"
          error={errors?.email}
          {...register("email")}
        />
      </div>
    </div>
  );
};

export default OverviewForm;
