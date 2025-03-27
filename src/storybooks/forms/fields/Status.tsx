import { Boolean } from "@/storybooks/components/molecules";

export default function Status({ defaultValue }: { defaultValue?: boolean }) {
  return (
    <Boolean defaultValue={defaultValue} name="status" placeholder="Status" />
  );
}
