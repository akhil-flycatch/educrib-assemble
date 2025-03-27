import { Field, Input, Label } from "@/storybooks/components/atoms";

import Error from "./Error";

export default function EndDate({
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
      {label && <Label htmlFor="endDate">End Date</Label>}
      <Input
        id="endDate"
        type="date"
        name="endDate"
        placeholder="End Date"
        defaultValue={defaultValue}
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
}
