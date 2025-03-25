import { AutoComplete, Field, Label } from "@/storybooks/components/atoms";
import { TOption } from "@/storybooks/components/atoms/type";

import { searchLevels } from "@/api";
import Error from "./Error";

const Level = ({
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
      {label && <Label htmlFor="levelId">Level</Label>}
      <AutoComplete
        key={defaultValue?.value}
        defaultValue={defaultValue}
        name="levelId"
        searchFn={(term) => searchLevels(term, { active: true })}
        placeholder="Select Level"
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
};

export default Level;
