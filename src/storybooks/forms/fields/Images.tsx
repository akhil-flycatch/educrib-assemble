import { Field, Label } from "@/storybooks/components/atoms";
import FileUpload from "@/storybooks/components/molecules/FileUpload";

export default function Images({
  label = true,
  defaultValue,
  error
}: {
  label?: Boolean;
  defaultValue?: string | string[];
  error?: string;
}) {
  return (
    <Field>
      {label && <Label htmlFor="images">Images</Label>}
      <FileUpload
        acceptedFileTypes={["image/*"]}
        defaultValue={Array.isArray(defaultValue) ? defaultValue.join(", ") : defaultValue}
        validationError={error}
        acceptMultiple
        name="images"
      />
    </Field>
  );
}
