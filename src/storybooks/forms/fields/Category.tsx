import { AutoComplete, Field, Label } from "@/storybooks/components/atoms";
import { TOption } from "@/storybooks/components/atoms/type";

import { searchCategories } from "@/api";
import Error from "./Error";

const Categories = ({
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
      {label && <Label htmlFor="categoryId">Category</Label>}
      <AutoComplete
        key={defaultValue?.value}
        defaultValue={defaultValue}
        name="categoryId"
        searchFn={(term) => searchCategories(term, { active: true })}
        placeholder="Select Category"
      />
      {error && <Error>{error}</Error>}
    </Field>
  );
};

export default Categories;
