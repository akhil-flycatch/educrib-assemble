import { AutoComplete, Field, Label } from "@/storybooks/components/atoms";
import { TOption } from "@/storybooks/components/atoms/type";

import { searchCourse } from "@/api";
import Error from "./Error";

const Course = ({
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
      {label && <Label htmlFor="courseId">Course</Label>}
      <AutoComplete
        key={defaultValue?.value}
        defaultValue={defaultValue}
        name="courseId"
        searchFn={(term) => searchCourse(term, { active: true })}
        placeholder="Select Course"
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
};

export default Course;
