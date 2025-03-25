import { Field, Input, Label } from "@/storybooks/components/atoms";

import Error from "./Error";

export default function Facilities({
  label = true,
  defaultValue,
  error
}: {
  label?: boolean;
  defaultValue?: string | string[];
  error?: string;
}) {
  return (
    <Field>
      {label && <Label htmlFor="facilities">Facilities</Label>}
      <Input
        id="facilities"
        type="text"
        name="facilities"
        placeholder="Facilities"
        defaultValue={Array.isArray(defaultValue) ? defaultValue.join(", ") : defaultValue}
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
}
