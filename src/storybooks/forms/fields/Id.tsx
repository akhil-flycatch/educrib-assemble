import { Input } from "@/storybooks/components/atoms";

export default function Id({ defaultValue }: { defaultValue?: string }) {
  return <Input type="hidden" name="id" defaultValue={defaultValue} />;
}
