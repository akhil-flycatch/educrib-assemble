import React, { FC, ReactNode } from "react";
import { Icon } from "react-feather";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children?: ReactNode;
  icon?: Icon;
  theme?: "primary" | "secondary";
}

const Button: FC<ButtonProps> = ({
  children,
  icon,
  theme = "primary",
  ...props
}) => {
  return (
    <button
      {...props}
      className={`flex items-center px-4 py-2 space-x-2 rounded-md cursor-pointer  max-w-max hover:bg-accent1 hover:text-dark ${
        theme === "primary" ? "bg-secondary text-light" : "bg-white text-dark"
      }`}
    >
      {icon &&
        React.createElement(icon, {
          size: 14,
        })}
      {children && <span>{children}</span>}
    </button>
  );
};

export default Button;
