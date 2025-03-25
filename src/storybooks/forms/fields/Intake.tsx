import { AutoComplete, Field, Label } from "@/storybooks/components/atoms";
import { TOption } from "@/storybooks/components/atoms/type";

import { searchIntakes } from "@/api";
import Error from "./Error";

const Intake = ({
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
      {label && <Label htmlFor="intakeId">Intake</Label>}
      <AutoComplete
        key={defaultValue?.value}
        defaultValue={defaultValue}
        name="intakeId"
        searchFn={(term) => searchIntakes(term, { active: true })}
        placeholder="Select Intake"
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
};

export default Intake;
