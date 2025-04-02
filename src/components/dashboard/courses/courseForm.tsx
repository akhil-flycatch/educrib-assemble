import {
  searchCourse,
  searchDurationTypes,
  searchFrequencies,
  searchIntakes,
  searchLevels,
  searchSpecialization,
} from "@/api";
import { searchProgrammeStudyModes } from "@/api/programmeStudyMode";
import Input from "@/components/hookForm/input";
import Select from "@/components/hookForm/select";
import {
  intakeId,
  specializationId,
} from "@/storybooks/forms/validations/base";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  useFieldArray,
  UseFormRegister,
} from "react-hook-form";
import * as z from "zod";
import { v4 as uuidv4 } from "uuid";

export const courseFormSchema = z.object({
  id: z.string().optional().nullable(),
  courseId: z.string(),
  levelId: z.string(),
  specializationId: z.string(),
  intakeId: z.string(),
  duration: z.number(),
  capacity: z.number(),
  durationType: z.string(),
  mode: z.string(),
  fee: z.array(
    z.object({
      amount: z.number(),
      description: z.string(),
      frequencyId: z.string(),
      title: z.string(),
      id: z.string(),
    })
  ),
});

export type CourseFormValues = z.infer<typeof courseFormSchema>;

interface Props {
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues>;
}
const CourseForm: React.FC<Props> = ({ errors, register, control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "fee",
  });

  const [courseOptions, setCourseOptions] = useState<
    Array<{
      label: string;
      value: string;
    }>
  >([]);

  const [intakeOptions, setIntakeOptions] = useState<
    Array<{
      label: string;
      value: string;
    }>
  >([]);

  const [specializationOptions, setSpecializationOptions] = useState<
    Array<{
      label: string;
      value: string;
    }>
  >([]);

  const [levelOptions, setLevelOptions] = useState<
    Array<{
      label: string;
      value: string;
    }>
  >([]);

  const [durationTypeOptions, setDurationTypeOptions] = useState<
    Array<{
      label: string;
      value: string;
    }>
  >([]);

  const [studyModeOptions, setstudyModeOptions] = useState<
    Array<{
      label: string;
      value: string;
    }>
  >([]);

  const [frequencyOptions, setFrequencyOptions] = useState<
    Array<{
      label: string;
      value: string;
    }>
  >([]);

  useEffect(() => {
    const getDropdownOptions = async () => {
      const courses = await searchCourse("", { active: true });
      setCourseOptions(
        courses.map((course: { title: string; id: string; slug: string }) => ({
          label: course.title,
          value: course.id ?? course.slug,
        }))
      );

      const intakes = await searchIntakes("", { active: true });
      setIntakeOptions(
        intakes.map((intake: { title: string; id: string; slug: string }) => ({
          label: intake.title,
          value: intake.id ?? intake.slug,
        }))
      );

      const specializations = await searchSpecialization("", { active: true });
      setSpecializationOptions(
        specializations.map(
          (specialization: { title: string; id: string; slug: string }) => ({
            label: specialization.title,
            value: specialization.id ?? specialization.slug,
          })
        )
      );

      const levels = await searchLevels("", { active: true });
      setLevelOptions(
        levels.map((level: { title: string; id: string; slug: string }) => ({
          label: level.title,
          value: level.id ?? level.slug,
        }))
      );

      const durationTypes = await searchDurationTypes("", { active: true });
      setDurationTypeOptions(
        durationTypes.map(
          (durationType: { title: string; id: string; slug: string }) => ({
            label: durationType.title,
            value: durationType.id ?? durationType.slug,
          })
        )
      );

      const studyModes = await searchProgrammeStudyModes("", { active: true });
      setstudyModeOptions(
        studyModes.map((studyMode) => ({
          label: studyMode.title ?? "",
          value: studyMode.id ?? studyMode.slug ?? "",
        }))
      );

      const frequencies = await searchFrequencies("", { active: true });
      console.log(frequencies);
      setFrequencyOptions(
        frequencies.map((frequency) => ({
          label: frequency.title ?? "",
          value: frequency.id ?? frequency.slug ?? "",
        }))
      );
    };

    getDropdownOptions();
  }, []);
  return (
    <div className="flex-1 w-[756px] flex flex-col gap-6">
      <div className="w-full grid grid-cols-1">
        <Controller
          control={control}
          name="courseId"
          render={({ field }) => (
            <Select
              id="courseId"
              label="Course Name"
              options={courseOptions}
              {...field}
              error={errors?.courseId}
            />
          )}
        />
      </div>

      <div className="w-full grid grid-cols-1">
        <Controller
          control={control}
          name="levelId"
          render={({ field }) => (
            <Select
              id="levelId"
              label="Course Type"
              options={levelOptions}
              {...field}
              error={errors?.levelId}
            />
          )}
        />
      </div>

      <div className="w-full grid grid-cols-1">
        <Controller
          control={control}
          name="specializationId"
          render={({ field }) => (
            <Select
              id="specializationId"
              label="Category"
              options={specializationOptions}
              {...field}
              error={errors?.specializationId}
            />
          )}
        />
      </div>

      <div className="w-full grid grid-cols-1">
        <Controller
          control={control}
          name="intakeId"
          render={({ field }) => (
            <Select
              id="intakeId"
              label="Intake"
              options={intakeOptions}
              {...field}
              error={errors?.intakeId}
            />
          )}
        />
      </div>

      <div className="w-full grid grid-cols-2 gap-6">
        <Controller
          control={control}
          name="duration"
          render={({ field }) => (
            <Input
              id="duration"
              type="number"
              label="Duration"
              {...field}
              error={errors?.duration}
              {...register("duration", { valueAsNumber: true })}
            />
          )}
        />

        <Controller
          control={control}
          name="durationType"
          render={({ field }) => (
            <Select
              id="durationType"
              label="Duration Type"
              options={durationTypeOptions}
              {...field}
              error={errors?.durationType}
            />
          )}
        />
      </div>

      <div className="w-full grid grid-cols-2 gap-6">
        <Controller
          control={control}
          name="capacity"
          render={({ field }) => (
            <Input
              id="capacity"
              type="number"
              label="Number of Seats"
              {...field}
              error={errors?.capacity}
              {...register("capacity", { valueAsNumber: true })}
            />
          )}
        />

        <Controller
          control={control}
          name="mode"
          render={({ field }) => (
            <Select
              id="mode"
              label="Mode of Study"
              options={studyModeOptions}
              {...field}
              error={errors?.mode}
            />
          )}
        />
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="w-full flex gap-6 items-center">
          <div className="w-full grid grid-cols-2 gap-6 flex-1">
            <Controller
              control={control}
              name={`fee[${index}].amount`}
              render={({ field }) => (
                <Input
                  id={`fee[${index}].amount`}
                  type="number"
                  label={`Amount ${index + 1}`}
                  {...field}
                  error={errors?.fee?.[index]?.amount}
                  {...register(`fee[${index}].amount`, { valueAsNumber: true })}
                />
              )}
            />

            <Controller
              control={control}
              name={`fee[${index}].title`}
              render={({ field }) => (
                <Input
                  id={`fee[${index}].title`}
                  label={`Fee Title ${index + 1}`}
                  {...field}
                  error={errors?.fee?.[index]?.title}
                />
              )}
            />

            <Controller
              control={control}
              name={`fee[${index}].description`}
              render={({ field }) => (
                <Input
                  id={`fee[${index}].description`}
                  label={`Description ${index + 1}`}
                  {...field}
                  error={errors?.fee?.[index]?.description}
                />
              )}
            />

            <Controller
              control={control}
              name={`fee[${index}].frequencyId`}
              render={({ field }) => (
                <Select
                  id={`fee[${index}].frequencyId`}
                  label={`Frequency ${index + 1}`}
                  options={frequencyOptions}
                  {...field}
                  error={errors?.fee?.[index]?.frequencyId}
                />
              )}
            />
          </div>
          <button
            className="h-10 w-10 rounded-full bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={fields.length === 1}
            onClick={() => remove(index)}
          >
            <Image
              src="/images/delete.svg"
              alt="delete"
              width={24}
              height={24}
            />
            <span className="sr-only">Delete</span>
          </button>
        </div>
      ))}
      <div className="w-full flex jusify-start items-center">
        <button
          className="py-2 px-3.5 rounded-lg border border-primary bg-white text-primary hover:bg-light hover:border-[#B3B9C4] font-medium flex items-center gap-2 w-fit"
          onClick={() =>
            append({
              id: uuidv4(),
              title: "",
              amount: 0,
              frequencyId: "",
              description: "",
            })
          }
        >
          <Image
            src="/images/plus-black.svg"
            alt="preview"
            width={20}
            height={20}
          />
          <span>Add Multiple Fee</span>
        </button>
      </div>
    </div>
  );
};

export default CourseForm;
