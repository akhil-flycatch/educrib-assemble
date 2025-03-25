import { Field, Input, Label } from "@/storybooks/components/atoms";

import Error from "./Error";

export default function Keywords({
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
      {label && <Label htmlFor="keywords">Keywords</Label>}
      <Input
        id="keywords"
        type="text"
        name="keywords"
        placeholder="Keywords"
        defaultValue={
          Array.isArray(defaultValue) ? defaultValue.join(", ") : defaultValue
        }
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
}
