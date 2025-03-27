import { Field, Input, Label } from "@/storybooks/components/atoms";

import Error from "./Error";

export default function Locale({
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
      {label && <Label htmlFor="locale">Locale</Label>}
      <Input
        id="locale"
        type="text"
        name="locale"
        placeholder="Locale"
        defaultValue={defaultValue}
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
}
