import { AutoComplete, Field, Label } from "@/storybooks/components/atoms";
import { TOption } from "@/storybooks/components/atoms/type";

import { searchCountries } from "@/api";
import Error from "./Error";

const Country = ({
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
      {label && <Label htmlFor="countryId">Country</Label>}
      <AutoComplete
        key={defaultValue?.value}
        defaultValue={defaultValue}
        name="countryId"
        searchFn={(term) => searchCountries(term, { active: true })}
        placeholder="Select Country"
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
};

export default Country;
