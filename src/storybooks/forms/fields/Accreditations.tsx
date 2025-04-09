import { AutoComplete, Field, Label } from "@/storybooks/components/atoms";
import { TOption } from "@/storybooks/components/atoms/type";

import { searchAccreditations } from "@/api";
import Error from "./Error";

const Accreditations = ({
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
      {label && <Label htmlFor="accreditations">Accreditation</Label>}
      <AutoComplete
        key={defaultValue?.length ? defaultValue[0].value : undefined}
        defaultValue={defaultValue}
        name="accreditationId"
        acceptMultiple={true}
        searchFn={(term) => searchAccreditations(term, { active: true })}
        placeholder="Select Accreditation"
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
};

export default Accreditations;
