import { Field, Label } from "@/storybooks/components/atoms";
import FileUpload from "@/storybooks/components/molecules/FileUpload";

export default function ProfileImage({
  label = true,
  error,
}: {
  label?: Boolean;
  error?: string;
}) {
  return (
    <Field>
      {label && <Label htmlFor="image">Add Image</Label>}
      <FileUpload
        acceptMultiple
        acceptedFileTypes={["image/*"]}
        validationError={error}
        name="image"
      />
    </Field>
  );
}
