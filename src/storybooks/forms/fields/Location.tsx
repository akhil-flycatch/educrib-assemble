import { Field, Input, Label } from "@/storybooks/components/atoms";

import Error from "./Error";

export default function Location({
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
      {label && <Label htmlFor="location">Location</Label>}
      <Input
        id="location"
        type="text"
        name="location"
        placeholder="Location"
        defaultValue={defaultValue}
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
}
