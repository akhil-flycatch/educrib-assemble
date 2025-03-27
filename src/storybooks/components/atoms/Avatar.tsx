"use client";

import * as RadixAvatar from "@radix-ui/react-avatar";

type AvatarProps = {
  text?: string;
};

export default function Avatar({ text = "AA" }: AvatarProps) {
  return (
    <RadixAvatar.Root className="bg-black/20 h-12 w-12 flex items-center justify-center rounded-full">
      <RadixAvatar.Image />
      <RadixAvatar.Fallback className="uppercase">{text}</RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
}
