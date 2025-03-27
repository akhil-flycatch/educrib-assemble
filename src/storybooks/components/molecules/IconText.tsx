import { ReactNode } from "react";

import { Typography } from "../atoms";

export type IconTextProps = {
  children: string;
  icon: ReactNode;
};

export default function IconText({ children, icon }: IconTextProps) {
  return (
    <span className="flex items-center space-x-2">
      {icon}
      <Typography>{children}</Typography>
    </span>
  );
}
