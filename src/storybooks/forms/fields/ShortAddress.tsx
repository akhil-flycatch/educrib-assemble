import { Field, Input, Label } from "@/storybooks/components/atoms";

import Error from "./Error";

export default function ShortAddress({
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
      {label && <Label htmlFor="shortAddress">Short Address</Label>}
      <Input
        id="shortAddress"
        type="text"
        name="shortAddress"
        placeholder="short Address"
        defaultValue={defaultValue}
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
}
