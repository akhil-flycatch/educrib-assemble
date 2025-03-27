import { AutoComplete, Field, Label } from "@/storybooks/components/atoms";
import { TOption } from "@/storybooks/components/atoms/type";

import { searchSocials } from "@/api";
import Error from "./Error";

const Social = ({
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
      {label && <Label htmlFor="socialId">Social Link</Label>}
      <AutoComplete
        key={defaultValue?.value}
        defaultValue={defaultValue}
        name="socialId"
        searchFn={(term) => searchSocials(term, { active: true })}
        placeholder="Select Social"
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
};

export default Social;
