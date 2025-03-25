import { AutoComplete, Field, Label } from "@/storybooks/components/atoms";
import { TOption } from "@/storybooks/components/atoms/type";

import { searchFacilities } from "@/api";
import Error from "./Error";

const Facilities = ({
  defaultValue,
  label = true,
  error,
}: {
  defaultValue: TOption[] | undefined;
  label?: boolean;
  error?: string;
}) => {
  return (
    <Field>
      {label && <Label htmlFor="currencies">Facility</Label>}
      <AutoComplete
        key={defaultValue?.toString()}
        defaultValue={defaultValue}
        name="facilityId"
        acceptMultiple
        searchFn={(term) => searchFacilities(term, { active: true })}
        placeholder="Select Facility"
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
};

export default Facilities;
