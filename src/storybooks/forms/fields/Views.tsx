import { Field, Input, Label } from "@/storybooks/components/atoms";

import Error from "./Error";

export default function Views({
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
      {label && <Label htmlFor="views">Views</Label>}
      <Input
        id="views"
        type="number"
        name="views"
        placeholder="Views"
        defaultValue={defaultValue}
        readOnly
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
}
