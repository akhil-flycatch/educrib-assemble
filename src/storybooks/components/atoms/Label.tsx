import * as RadixLabel from "@radix-ui/react-label";

export default function Label({ ...props }: RadixLabel.LabelProps) {
  return (
    <RadixLabel.Root {...props} className="text-dark/50 font-semibold">
      {props.children}
    </RadixLabel.Root>
  );
}
