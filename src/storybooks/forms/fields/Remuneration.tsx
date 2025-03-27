import { Field, Input, Label } from "@/storybooks/components/atoms";

import Error from "./Error";

export default function Remuneration({
  label = true,
  defaultValue,
  error,
}: {
  label?: boolean;
  defaultValue?: string | number;
  error?: string;
}) {
  return (
    <Field>
      {label && <Label htmlFor="remuneration">Remuneration</Label>}
      <Input
        id="remuneration"
        type="number"
        name="remuneration"
        placeholder="Remuneration"
        defaultValue={defaultValue}
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
}
