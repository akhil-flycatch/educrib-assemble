import { cva, type VariantProps } from "class-variance-authority";

const button = cva(
  ["px-3", "py-2", "hover:bg-dark", "rounded-md", "hover:text-white"],
  {
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
  }
);

export interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    VariantProps<typeof button> {}
{
}

const Button: React.FC<ButtonProps> = ({ className, intent, ...props }) => (
  <button className={button({ intent, className },)} {...props} />
);

export default Button;
