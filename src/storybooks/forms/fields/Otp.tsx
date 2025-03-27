import { Field, Input, Label } from "@/storybooks/components/atoms";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"


import Error from "./Error";

export default function  OTP({
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
      {label && <Label htmlFor="otp">OTP</Label>}
      <InputOTP maxLength={6} name="otp">
  <InputOTPGroup className="flex gap-5 ">
    <InputOTPSlot className="h-[72px] w-[72px] rounded-[10px]  border-[1px] border-[#42526D]" index={0} />
    <InputOTPSlot className="h-[72px] w-[72px] rounded-[10px]  border-[1px] border-[#42526D]"  index={1} />
    <InputOTPSlot className="h-[72px] w-[72px] rounded-[10px]  border-[1px] border-[#42526D]"  index={2} />
    <InputOTPSlot className="h-[72px] w-[72px] rounded-[10px]  border-[1px] border-[#42526D]"  index={3} />
    <InputOTPSlot className="h-[72px] w-[72px] rounded-[10px]  border-[1px] border-[#42526D]"  index={4} />
    <InputOTPSlot className="h-[72px] w-[72px] rounded-[10px]  border-[1px] border-[#42526D]"  index={5} />
  </InputOTPGroup>
</InputOTP>

      {error && <Error>{error}</Error>}
    </Field>
  );
}
