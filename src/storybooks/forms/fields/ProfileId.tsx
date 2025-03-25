import { Input } from "@/storybooks/components/atoms";

export default function ProfileId({ defaultValue }: { defaultValue?: string }) {
  return <Input type="hidden" name="profileId" defaultValue={defaultValue} />;
}
