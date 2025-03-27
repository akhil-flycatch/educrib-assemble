import { AutoComplete, Field, Label } from "@/storybooks/components/atoms";
import { TOption } from "@/storybooks/components/atoms/type";

import { searchMedia } from "@/api";
import Error from "./Error";

const Media = ({
  defaultValue,
  label = true,
  error,
}: {
  defaultValue: TOption | undefined;
  label?: boolean;
  error?: string;
}) => {
  return (
    <Field>
      {label && <Label htmlFor="mediaId">Media</Label>}
      <AutoComplete
        key={defaultValue?.value}
        defaultValue={defaultValue}
        name="mediaId"
        placeholder="Search Media"
        searchFn={(term) => searchMedia(term, { active: true })}
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
};

export default Media;
