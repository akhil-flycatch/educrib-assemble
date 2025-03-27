import { Field, Label } from "@/storybooks/components/atoms";
import FileUpload from "@/storybooks/components/molecules/FileUpload";

export default function Flag({
  label = true,
  defaultValue,
  error,
}: {
  label?: Boolean;
  defaultValue?: string;
  error?: string;
}) {
  return (
    <Field>
      {label && <Label htmlFor="flag">Flag</Label>}
      <FileUpload
        defaultValue={defaultValue}
        acceptedFileTypes={["image/*"]}
        validationError={error}
        name="flag"
      />
    </Field>
  );
}
