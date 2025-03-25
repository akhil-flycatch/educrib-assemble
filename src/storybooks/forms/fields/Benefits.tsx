import { Field, Input, Label } from "@/storybooks/components/atoms";

import Error from "./Error";

export default function Benefits({
  label = true,
  defaultValue,
  error,
}: {
  label?: boolean;
  defaultValue?: string | string[];
  error?: string;
}) {
  return (
    <Field>
      {label && <Label htmlFor="benefits">Benefits</Label>}
      <Input
        id="benefits"
        type="text"
        name="benefits"
        placeholder="Benefits"
        defaultValue={
          Array.isArray(defaultValue) ? defaultValue.join(", ") : defaultValue
        }
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
}
