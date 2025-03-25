import { AutoComplete, Field, Label } from "@/storybooks/components/atoms";
import { TOption } from "@/storybooks/components/atoms/type";

import { searchContactTypes } from "@/api";
import Error from "./Error";

const ContactTypes = ({
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
      {label && <Label htmlFor="contactTypeId">Contact Types</Label>}
      <AutoComplete
        key={defaultValue?.toString()}
        defaultValue={defaultValue}
        name="contactTypeId"
        searchFn={(term) => searchContactTypes(term, { active: true })}
        placeholder="Select ContactType"
        acceptMultiple
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
};

export default ContactTypes;
