import { Field, Input, Label } from "@/storybooks/components/atoms";

import Error from "./Error";

export default function Phone({
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
      {label && <Label htmlFor="phone">Phone</Label>}
      <Input
className="w-[388px] h-[72px] rounded-[10px] border-[1px] border-[#42526D] focus:border-[#42526d] pl-[20px] text-[#000000] text-[16px] leading-[24px]  font-weight-[500] focus:outline-none  focus:ring-opacity-50"      
 id="phone"
        type="text"
        name="phone"
        placeholder="Phone"
        defaultValue={defaultValue}
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
}
