import { AutoComplete, Field, Label } from "@/storybooks/components/atoms";
import { TOption } from "@/storybooks/components/atoms/type";

import { searchDesignations } from "@/api";
import Error from "./Error";

const Designation = ({
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
      {label && <Label htmlFor="designationId">Designation</Label>}
      <AutoComplete
        key={defaultValue?.value}
        defaultValue={defaultValue}
        name="designationId"
        searchFn={(term) => searchDesignations(term, { active: true })}
        placeholder="Select Designation"
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
};

export default Designation;
