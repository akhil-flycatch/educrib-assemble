import { Field, Input, Label } from "@/storybooks/components/atoms";

import Error from "./Error";

export default function Area({
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
      {label && <Label htmlFor="area">Area</Label>}
      <Input
        id="area"
        type="text"
        name="area"
        placeholder="Area"
        defaultValue={defaultValue}
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
}
