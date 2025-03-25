import { AutoComplete, Field, Label } from "@/storybooks/components/atoms";
import { TOption } from "@/storybooks/components/atoms/type";

import { searchManagement } from "@/api";
import Error from "./Error";

const Management = ({
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
      {label && <Label htmlFor="managementId">Management</Label>}
      <AutoComplete
        key={defaultValue?.value}
        defaultValue={defaultValue}
        name="managementId"
        searchFn={(term) => searchManagement(term, { active: true })}
        placeholder="Select Management"
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
};

export default Management;
