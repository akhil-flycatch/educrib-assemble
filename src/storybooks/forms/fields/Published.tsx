import { Boolean } from "@/storybooks/components/molecules";

export default function Published({
  defaultValue,
}: {
  defaultValue?: boolean;
}) {
  return (
    <Boolean
      defaultValue={defaultValue}
      name="published"
      placeholder="Published"
    />
  );
}
