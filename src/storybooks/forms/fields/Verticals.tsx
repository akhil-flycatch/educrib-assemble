import { AutoComplete, Field, Label } from "@/storybooks/components/atoms";
import { TOption } from "@/storybooks/components/atoms/type";

import { searchVerticals } from "@/api";
import Error from "./Error";

const Verticals = ({
  defaultValue,
  label = true,
  error,
  readOnly = false,
}: {
  defaultValue: TOption | undefined;
  label?: boolean;
  error?: string;
  readOnly?: boolean;
}) => {
  return (
    <Field>
      {label && <Label htmlFor="verticalId">Verticals</Label>}
      <AutoComplete
        key={defaultValue?.value}
        defaultValue={defaultValue}
        name="verticalId"
        placeholder="Vertical"
        searchFn={(term) => searchVerticals(term, { active: true })}
        readOnly={readOnly}
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
};

export default Verticals;
