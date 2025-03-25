import { createElement, DetailedHTMLProps, FC, ReactNode } from "react";
import { Icon } from "react-feather";
import { DirectionTypes } from "types/common";

interface TextProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  > {
  children: ReactNode;
  icon?: Icon;
  size?: number;
  label?: string;
  direction?: DirectionTypes;
}

const Text: FC<TextProps> = ({
  icon,
  children,
  size = 14,
  label,
  direction = "vertical",
  className,
}) => {
  return (
    <div
      className={`${
        direction === "vertical" ? "flex" : "flex items-center space-x-2"
      }`}
    >
      {label && (
        <span className={`font-semibold text-secondary ${className}`}>
          {label}
        </span>
      )}
      <div className="flex items-center space-x-2">
        {icon && (
          <span className="text-accent2">
            {createElement(icon, {
              size,
            })}
          </span>
        )}
        <span className={className}>{children}</span>
      </div>
    </div>
  );
};

export default Text;
