import { Field, Input, Label } from "@/storybooks/components/atoms";

import Error from "./Error";

export default function EstablishedYear({
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
      {label && <Label htmlFor="establishedYear">Established Year</Label>}
      <Input
        id="establishedYear"
        type="number"
        name="establishedYear"
        placeholder="Established Year"
        min={1700}
        max={new Date().getFullYear()}
        step={1}
        defaultValue={defaultValue}
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
}
