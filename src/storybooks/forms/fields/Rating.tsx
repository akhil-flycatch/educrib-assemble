import { Field, Input, Label } from "@/storybooks/components/atoms";

import Error from "./Error";

export default function Rating({
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
      {label && <Label htmlFor="rating">Rating</Label>}
      <Input
        id="rating"
        type="number"
        max={5}
        min={1}
        step={1}
        name="rating"
        placeholder="Rating"
        defaultValue={defaultValue}
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
}
