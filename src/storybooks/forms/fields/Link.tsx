import { Field, Input, Label } from "@/storybooks/components/atoms";

import Error from "./Error";

export default function Link({
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
      {label && <Label htmlFor="link">Link</Label>}
      <Input
        id="link"
        type="url"
        name="link"
        placeholder="link"
        defaultValue={defaultValue}
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
}
