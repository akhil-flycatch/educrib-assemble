import { getAllAccreditations, getAllTypes, getAllUniversities } from "@/api";
import Input from "@/components/hookForm/input";
import Select from "@/components/hookForm/select";
import { useEffect, useState } from "react";
import { Controller, FieldErrors, FieldValues, Control } from "react-hook-form";
import * as z from "zod";

export const overviewFormSchema = z.object({
  title: z.string(),
  university: z.any(),
  accreditation: z.any(),
  type: z.any(),
  establishedYear: z.string(),
  website: z
    .string()
    .regex(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/),
  phone: z.string().regex(/^\d{10}$/, {
    message: "Invalid Phone Number",
  }),
  email: z.string().email("Invalid email address"),
});

export type OverviewFormValues = z.infer<typeof overviewFormSchema>;

interface Props {
  errors: FieldErrors<OverviewFormValues>;
  control: Control<OverviewFormValues>;
}
const OverviewForm: React.FC<Props> = ({ errors, control }) => {
  const [universities, setUniversities] = useState([]);
  const [accreditations, setAccreditations] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchUniversities = async () => {
      const university = await getAllUniversities();
      const accredition = await getAllAccreditations();
      const types = await getAllTypes();
      setTypes(types);
      setUniversities(university);
      setAccreditations(accredition);
    };
    fetchUniversities();
  }, []);

  return (
    <div className="flex-1 w-[756px] flex flex-col gap-6">
      <div className="w-full grid grid-cols-1">
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              id="title"
              label="College Name"
              error={errors?.title}
              {...field}
            />
          )}
        />
      </div>

      <div className="w-full grid grid-cols-1">
        <Controller
          name="university"
          control={control}
          render={({ field }) => {
            return (
              <Select
                id="university"
                label="University"
                options={universities.map((university: any) => ({
                  label: university.title,
                  value: university.id,
                }))}
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                }}
                error={errors?.university}
                required
              />
            );
          }}
        />
      </div>

      <div className="w-full grid grid-cols-1">
        <Controller
          name="establishedYear"
          control={control}
          render={({ field }) => (
            <Input
              id="establishedYear"
              label="Established Year"
              type="number"
              error={errors?.establishedYear}
              {...field}
            />
          )}
        />
      </div>

      <div className="w-full grid grid-cols-2 gap-6">
        <Controller
          name="accreditation"
          control={control}
          render={({ field }) => (
            <Select
              id="accreditation"
              label="Accreditation"
              options={accreditations.map((accreditation: any) => ({
                label: accreditation.title,
                value: accreditation.id,
              }))}
              error={errors?.accreditation}
              required
              {...field}
            />
          )}
        />
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select
              id="type"
              label="Type"
              options={types?.map((type: any) => {
                return {
                  label: type.title, // Display the title in the dropdown
                  value: type.id, // Use the id as the value
                };
              })}
              error={errors?.type}
              required
              {...field}
            />
          )}
        />
      </div>

      <div className="w-full grid grid-cols-1">
        <Controller
          name="website"
          control={control}
          render={({ field }) => (
            <Input
              id="website"
              label="Website"
              error={errors?.website}
              {...field}
            />
          )}
        />
      </div>

      <div className="w-full grid grid-cols-1">
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <Input
              id="phone"
              label="Phone Number"
              type="tel"
              error={errors?.phone}
              {...field}
            />
          )}
        />
      </div>

      <div className="w-full grid grid-cols-1">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input id="email" label="Email" error={errors?.email} {...field} />
          )}
        />
      </div>
    </div>
  );
};

export default OverviewForm;
