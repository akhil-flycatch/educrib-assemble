import { AutoComplete, Field, Label } from "@/storybooks/components/atoms";
import { TOption } from "@/storybooks/components/atoms/type";

import { searchCurrencies } from "@/api";
import Error from "./Error";

const Currencies = ({
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
      {label && <Label htmlFor="currencies">Currency</Label>}
      <AutoComplete
        key={defaultValue?.value}
        defaultValue={defaultValue}
        name="currencyId"
        searchFn={(term) => searchCurrencies(term, { active: true })}
        placeholder="Select Currency"
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
};

export default Currencies;
