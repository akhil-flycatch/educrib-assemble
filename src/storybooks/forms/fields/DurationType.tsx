import { AutoComplete, Field, Label } from "@/storybooks/components/atoms";
import { TOption } from "@/storybooks/components/atoms/type";

import { searchDurationTypes } from "@/api";
import Error from "./Error";

const DurationType = ({
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
      {label && <Label htmlFor="durationTypeId">Duration Type</Label>}
      <AutoComplete
        key={defaultValue?.value}
        defaultValue={defaultValue}
        name="durationTypeId"
        searchFn={(term) => searchDurationTypes(term, { active: true })}
        placeholder="Select Duration Type"
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
};

export default DurationType;
