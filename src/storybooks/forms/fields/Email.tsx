import { Field, Input, Label } from "@/storybooks/components/atoms";

import Error from "./Error";

export default function Email({
  label = true,
  defaultValue,
  error,
}: {
  label?: Boolean;
  defaultValue?: string;
  error?: string;
}) {
  return (
    <Field>
      {label && <Label htmlFor="email">Email Address</Label>}
      <Input
      className="w-[388px] h-[60px] rounded-[10px] border-[1px] border-[#42526d] focus:border-[#42526d] pl-[20px] text-[#000000] text-[16px] leading-[24px]  font-weight-[500] focus:outline-none  focus:ring-opacity-50" 
        required
        id="email"
        type="email"
        name="email"
        placeholder="Email Address"
        defaultValue={defaultValue}
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
}
