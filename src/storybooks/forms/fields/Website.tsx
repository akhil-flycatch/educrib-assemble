import { Field, Input, Label } from "@/storybooks/components/atoms";

import Error from "./Error";

export default function Website({
  label = true,
  defaultValue,
  error,
}: {
  label?: Boolean;
  defaultValue?: string;
  error?: string;
}) {
  return (
    <Field>
      {label && <Label htmlFor="website">Website Address</Label>}
      <Input
        id="website"
        type="url"
        name="website"
        placeholder="Website Address"
        defaultValue={defaultValue}
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
}
