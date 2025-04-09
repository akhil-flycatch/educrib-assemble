"use client";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import Input from "../hookForm/input";
import { InstitutionOnboardFieldMapping, LabelMapping } from "@/constants/formFields/institutionOnboard";
import Select from "@/components/hookForm/select";
import { useEffect, useState } from "react";
import { getAllAccreditations, getAllTypes, getLatestUniversities } from "@/api";

interface Props {
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
  currentVertical: string;
}

const PrimaryDetailsForm: React.FC<Props> = ({ errors, register, currentVertical }) => {
  const [accreditations, setAccreditations] = useState(null);
  const [universities, setUniversities] = useState(null);
  const [types, setTypes] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const accreditationsData = await getAllAccreditations();

      const university= await getLatestUniversities();
      const type= await getAllTypes();
      setAccreditations(accreditationsData);
      setTypes(type);
      setUniversities(university);
    };

    fetchData();
  }, []);

  const fieldToComponentMapping = new Map([
    [
      [
        "title",
        "agencyName",
        "tutorName",
        "companyName",
        "type",
        "registrationNumber",
        "curiculum",
        "courseType",
        "universityAffliation",
        "qaulification",
        "mode",
        "availability",
        "eligibility",
        "countries",
        "services",
        "subjects",
        "description",
      ],
      (fieldId: string) => (
        <Input
          id={fieldId}
          label={LabelMapping[currentVertical][fieldId]}
          error={errors[fieldId]}
          {...register(fieldId)}
        />
      ),
    ],
    [
      ["establishedYear", "stipend", "experience"],
      (fieldId: string) => (
        <Input
          id={fieldId}
          type="number"
          label={LabelMapping[currentVertical][fieldId]}
          error={errors[fieldId]}
          {...register(fieldId, {
            valueAsNumber: true,
          })}
        />
      ),
    ],
    [
      ["accreditationId"],
      (fieldId: string) => (
        <Select
          id={fieldId}
          label={LabelMapping[currentVertical][fieldId]}
          options={
            accreditations
              ? accreditations.map((item: any) => ({
                  label: item.title,
                  value: item.id,
                }))
              : []
          }
          error={errors[fieldId]}
          {...register(fieldId)}
        />
      ),
    ],
    [
      ["universityId"],
      (fieldId: string) => (
        <Select
          id={fieldId}
          label={LabelMapping[currentVertical][fieldId]}
          options={
            universities
              ? universities.map((item: any) => ({
                  label: item.title,
                  value: item.id,
                }))
              : []
          }
          error={errors[fieldId]}
          {...register(fieldId)}
        />
      ),
    ],
  ]);


  function extractComponent(fieldId: string) {
    for (let [keys, component] of fieldToComponentMapping) {
      if (keys.includes(fieldId)) {
        return component(fieldId); // Return the component function for that field
      }
    }
    return null; // Return null if not found
  }

  const renderFields = (vertcal: string) => {
    const fieldIds = InstitutionOnboardFieldMapping[vertcal];

    const fieldComponents = [];
    for (const fieldId of fieldIds) {
      const component = extractComponent(fieldId);
      if (component) {
        fieldComponents.push(component);
      }
    }

    const componentArray = [
      <div className="w-full grid grid-cols-1 gap-6" key={0}>
        {fieldComponents[0]}
      </div>,
    ];

    for (let i = 1; i < fieldComponents.length; i += 2) {
      componentArray.push(
        <div className="w-full grid grid-cols-2 gap-6" key={i}>
          {fieldComponents[i]}
          {fieldComponents[i + 1]}
        </div>
      );
    }
    return componentArray;
  };

  return (
    <div className="w-full flex justify-between">
      <div className="flex flex-col">
        <span className="text-primary font-medium text-sm capitalize">
          Primary Details
        </span>
        <span className="text-secondary text-sm font-normal">
          Provide details about your institution
        </span>
      </div>

      <div className="flex-1 max-w-[794px] flex flex-col gap-6">
        {renderFields(currentVertical)}
        <div className="w-full grid grid-cols-2 gap-6">
          <Input
            id="website"
            label="Website"
            error={errors.website}
            {...register("website")}
          />
        </div>
      </div>
    </div>
  );
};

export default PrimaryDetailsForm;
