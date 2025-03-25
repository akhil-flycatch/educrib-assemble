import { Field, Input, Label } from "@/storybooks/components/atoms";

import Error from "./Error";

export default function Canonical({
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
      {label && <Label htmlFor="canonical">Canonical</Label>}
      <Input
        id="canonical"
        type="url"
        name="canonical"
        placeholder="Canonical"
        defaultValue={defaultValue}
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
}
