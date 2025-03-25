import { Field, Input, Label } from "@/storybooks/components/atoms";

import Error from "./Error";

export default function ContactName({
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
      {label && <Label htmlFor="code">Contact Name</Label>}
      <Input
        id="title"
        type="text"
        name="title"
        placeholder="Title"
        defaultValue={defaultValue}
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
}
