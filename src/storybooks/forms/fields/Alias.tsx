import { Field, Input, Label } from "@/storybooks/components/atoms";

import Error from "./Error";

export default function Alias({
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
      {label && <Label htmlFor="alias">Alias</Label>}
      <Input
        id="alias"
        type="text"
        name="alias"
        placeholder="Alias"
        defaultValue={defaultValue}
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
}
