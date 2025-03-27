import { Field, Input, Label } from "@/storybooks/components/atoms";

import Error from "./Error";

export default function Domain({
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
      {label && <Label htmlFor="domain">Domain</Label>}
      <Input
        id="domain"
        type="text"
        name="domain"
        placeholder="Domain"
        defaultValue={defaultValue}
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
}
