import { Field, Input, Label } from "@/storybooks/components/atoms";

import Error from "./Error";

export default function Region({
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
      {label && <Label htmlFor="region">Region</Label>}
      <Input
        id="region"
        type="text"
        name="region"
        placeholder="Region"
        defaultValue={defaultValue}
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
}
