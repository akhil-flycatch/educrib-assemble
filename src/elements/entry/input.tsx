import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { DirectionTypes } from "types/common";

import Group from "./group";
import Label from "./label";
import FieldLoading from "./loading";

export interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  register: UseFormRegister<FieldValues>;
  direction?: DirectionTypes;
  label?: string;
  name: string;
  hideLabel?: boolean;
  loading?: boolean;
}

const Input: FC<InputProps> = ({
  register,
  direction = "vertical",
  label,
  name,
  hideLabel = false,
  loading = false,
  type = "text",
  ...props
}) => {
  if (loading)
    return <FieldLoading direction={direction} hideLabel={hideLabel} />;

  if (loading)
    return <FieldLoading direction={direction} hideLabel={hideLabel} />;

  return (
    <Group direction={direction}>
      {!hideLabel && <Label htmlFor={name}>{label}</Label>}
      <input
        type={type}
        {...(register && register(name))}
        id={name}
        name={name}
        {...props}
        placeholder={`Enter ${label}`}
      />
    </Group>
  );
};

export default Input;
