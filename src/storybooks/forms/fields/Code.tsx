import { Field, Input, Label } from "@/storybooks/components/atoms";

import Error from "./Error";

export default function Code({
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
      {label && <Label htmlFor="code">Code</Label>}
      <Input
        id="code"
        type="text"
        name="code"
        placeholder="Code"
        defaultValue={defaultValue}
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
}
