import { Boolean } from "@/storybooks/components/molecules";

export default function Accomodation({
  defaultValue,
}: {
  defaultValue?: boolean;
}) {
  return (
    <Boolean
      defaultValue={defaultValue}
      name="accomodation"
      placeholder="Accomodation"
    />
  );
}
