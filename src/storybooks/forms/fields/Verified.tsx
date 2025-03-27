import { Boolean } from "@/storybooks/components/molecules";

export default function Verified({ defaultValue }: { defaultValue?: boolean }) {
  return (
    <Boolean
      defaultValue={defaultValue}
      name="verified"
      placeholder="verified"
    />
  );
}
