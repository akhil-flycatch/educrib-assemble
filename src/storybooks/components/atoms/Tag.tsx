import { cva, type VariantProps } from "class-variance-authority";
import { DetailedHTMLProps, HTMLAttributes } from "react";

const tag = cva(["py-2 px-3", "rounded-md", "text-sm"], {
  variants: {
    intent: {
      primary: ["bg-primary", "text-white"],
      secondary: ["bg-secondary", "text-white"],
      ghost: ["bg-transparent", "text-dark"],
      dark: ["bg-dark", "text-white"],
      danger: ["bg-danger", "text-white"],
      success: ["bg-success", "text-dark"],
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});

export interface TagProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>,
    VariantProps<typeof tag> {}
{
}

const Button: React.FC<TagProps> = ({ className, intent, ...props }) => (
  <span className={tag({ intent, className })} {...props} />
);

export default Button;
