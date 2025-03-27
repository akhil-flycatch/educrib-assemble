import { Field, Switch } from "../atoms";
import Label from "../atoms/Label";

type BooleanProps = {
  name: string;
  placeholder: string;
  label?: boolean;
  defaultValue?: boolean;
  error?: string;
};

export default function Boolean({
  name,
  placeholder,
  label = true,
  defaultValue,
}: BooleanProps) {
  return (
    <Field direction="horizontal">
      <Switch defaultChecked={defaultValue} name={name} id={name} />
      {label && <Label htmlFor={name}>{placeholder}</Label>}
    </Field>
  );
}
