import { Boolean } from "@/storybooks/components/molecules";

export default function Featured({ defaultValue }: { defaultValue?: boolean }) {
  return (
    <Boolean
      defaultValue={defaultValue}
      name="featured"
      placeholder="Featured"
    />
  );
}
