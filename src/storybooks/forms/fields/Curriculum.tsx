import { AutoComplete, Field, Label } from "@/storybooks/components/atoms";
import { TOption } from "@/storybooks/components/atoms/type";

import { searchCurriculums } from "@/api";
import Error from "./Error";

const Curriculum = ({
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
      {label && <Label htmlFor="curriculumId">Curriculum</Label>}
      <AutoComplete
        key={defaultValue?.value}
        defaultValue={defaultValue}
        name="curriculumId"
        searchFn={(term) => searchCurriculums(term, { active: true })}
        placeholder="Select Curriculum"
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
};

export default Curriculum;
