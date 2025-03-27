import { AutoComplete, Field, Label } from "@/storybooks/components/atoms";
import { TOption } from "@/storybooks/components/atoms/type";

import { searchUniversities } from "@/api";
import Error from "./Error";

const University = ({
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
      {label && <Label htmlFor="universityId">University</Label>}
      <AutoComplete
        key={defaultValue?.value}
        defaultValue={defaultValue}
        name="universityId"
        searchFn={(term) => searchUniversities(term, { active: true })}
        placeholder="Select University"
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
};

export default University;
