import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { twMerge } from "tailwind-merge";

const typographyProps = cva(["leading-none", "max-w-max"], {
  variants: {
    intent: {
      heading: ["text-4xl", "font-bold", "[text-wrap:balance]"],
      subHeading: ["text-3xl", "font-bold", "[text-wrap:balance]"],
      title: ["text-2xl", "font-semibold"],
      subTitle: ["text-xl", "font-semibold"],
      body: ["text-base"],
      small: ["text-sm"],
      extraSmall: ["text-xs"],
    },
    theme: {
      primary: ["text-primary"],
      dark: ["text-dark"],
      light: ["text-light"],
      danger: ["text-danger"],
      success: ["text-success"],
      warning: ["text-warning"],
      gradient: [
        "bg-clip-text",
        "text-transparent",
        "bg-gradient-to-r",
        "from-primary",
        "to-secondary",
      ],
    },
    fade: {
      true: ["opacity-50"],
      false: ["opacity-100"],
    },
  },
  defaultVariants: {
    intent: "body",
    theme: "dark",
    fade: false,
  },
});

export interface TypographyProps extends VariantProps<typeof typographyProps> {
  className?: string;
  children: string;
}

const Typography: React.FC<TypographyProps> = ({
  className,
  intent,
  theme,
  fade,
  children,
}) => {
  if (intent === "heading") {
    return (
      <h1
        className={twMerge(
          typographyProps({ intent, theme, fade, className }),
          className
        )}
      >
        {children}
      </h1>
    );
  }
  if (intent === "subHeading") {
    return (
      <h2
        className={twMerge(
          typographyProps({ intent, theme, fade, className }),
          className
        )}
      >
        {children}
      </h2>
    );
  }
  if (intent === "title") {
    return (
      <h3
        className={twMerge(
          typographyProps({ intent, theme, fade, className }),
          className
        )}
      >
        {children}
      </h3>
    );
  }
  if (intent === "subTitle") {
    return (
      <h4
        className={twMerge(
          typographyProps({ intent, theme, fade, className }),
          className
        )}
      >
        {children}
      </h4>
    );
  }
  return (
    <span
      className={twMerge(
        typographyProps({ intent, theme, fade, className }),
        className
      )}
    >
      {children}
    </span>
  );
};

export default Typography;
