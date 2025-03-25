import { Field, Input, Label } from "@/storybooks/components/atoms";

import Error from "./Error";

export default function Capacity({
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
      {label && <Label htmlFor="capacity">Capacity</Label>}
      <Input
        id="capacity"
        type="number"
        name="capacity"
        placeholder="Capacity"
        defaultValue={defaultValue}
        min={1}
        step={1}
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
}
