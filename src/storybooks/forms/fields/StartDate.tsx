import { Field, Input, Label } from "@/storybooks/components/atoms";

import Error from "./Error";

export default function StartDate({
  label = true,
  defaultValue,
  error,
}: {
  label?: boolean;
  defaultValue?: string;
  error?: string;
}) {
  return (
    <Field>
      {label && <Label htmlFor="startDate">Start Date</Label>}
      <Input
        id="startDate"
        type="date"
        name="startDate"
        placeholder="Start Date"
        defaultValue={defaultValue}
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
}
