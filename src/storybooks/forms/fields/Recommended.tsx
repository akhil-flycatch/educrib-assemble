import { Boolean } from "@/storybooks/components/molecules";

export default function Recommended({ defaultValue }: { defaultValue?: boolean }) {
  return <Boolean defaultValue={defaultValue} name="recommended" placeholder="Recommended" />;
}
