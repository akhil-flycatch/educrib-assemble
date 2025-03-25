import { Field, Input, Label } from "@/storybooks/components/atoms";

import Error from "./Error";

export default function Duration({
  label = true,
  defaultValue,
  error,
}: {
  label?: boolean;
  defaultValue?: string | number;
  error?: string;
}) {
  return (
    <Field>
      {label && <Label htmlFor="duration">Duration</Label>}
      <Input
        id="duration"
        type="number"
        name="duration"
        placeholder="Duration"
        defaultValue={defaultValue}
        min={1}
        step={1}
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
}
