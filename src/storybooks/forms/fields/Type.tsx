import { AutoComplete, Field, Label } from "@/storybooks/components/atoms";
import { TOption } from "@/storybooks/components/atoms/type";

import { searchTypes } from "@/api";
import Error from "./Error";

const Types = ({
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
      {label && <Label htmlFor="types">Type</Label>}
      <AutoComplete
        key={defaultValue?.value}
        defaultValue={defaultValue}
        name="typeId"
        searchFn={(term) => searchTypes(term, { active: true })}
        placeholder="Select Type"
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
};

export default Types;
