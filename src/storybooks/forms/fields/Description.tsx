import { Field, Label, TextArea } from "@/storybooks/components/atoms";

import Error from "./Error";

export default function Description({
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
      {label && <Label htmlFor="description">Description</Label>}
      <TextArea
        id="description"
        name="description"
        placeholder="Enter description"
        defaultValue={defaultValue}
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
}
