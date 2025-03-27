import { AutoComplete, Field, Label } from "@/storybooks/components/atoms";
import { TOption } from "@/storybooks/components/atoms/type";

import { searchSpecialization } from "@/api";
import Error from "./Error";

const Specialization = ({
  defaultValue,
  label = true,
  error,
}: {
  defaultValue: TOption | undefined;
  label?: boolean;
  error?: string;
}) => {
  return (
    <Field>
      {label && <Label htmlFor="specializationId">Specialization</Label>}
      <AutoComplete
        key={defaultValue?.value}
        defaultValue={defaultValue}
        name="specializationId"
        searchFn={(term) => searchSpecialization(term, { active: true })}
        placeholder="Select Specialization"
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
};

export default Specialization;
