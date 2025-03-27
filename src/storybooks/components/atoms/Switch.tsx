"use client";

import * as RadixSwitch from "@radix-ui/react-switch";

export default function Switch({ ...props }: RadixSwitch.SwitchProps) {
  return (
    <RadixSwitch.Root
      {...props}
      className="w-[42px] h-[25px] bg-black/50 rounded-full relative shadow-[0_2px_10px] shadow-black/20 focus:shadow-[0_0_0_2px] focus:shadow-black/50 data-[state=checked]:bg-primary outline-none cursor-default"
    >
      <RadixSwitch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-black/20 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
    </RadixSwitch.Root>
  );
}
