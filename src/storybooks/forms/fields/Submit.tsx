"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/storybooks/components/atoms";

export default function Submit() {
  const { pending } = useFormStatus();
  return <Button className="w-[388px] h-[60px] rounded-[10px] bg-[#6129FE]" disabled={pending}>{pending ? "Saving..." : "Save"}</Button>;
}
