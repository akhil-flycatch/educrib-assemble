import { Field, Input, Label } from "@/storybooks/components/atoms";

import Error from "./Error";

export default function State({
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
      {label && <Label htmlFor="state">State</Label>}
      <Input
        id="state"
        type="text"
        name="state"
        placeholder="State"
        defaultValue={defaultValue}
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
}
