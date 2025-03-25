import { ReactNode } from "react";

import { Typography } from "../atoms";

type PageHeaderProps = {
  title: string;
  children: ReactNode;
};
export default function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between pb-4 w-full mb-6 shadow-sm">
      <Typography intent="title">{title}</Typography>
      <div className="flex items-center space-x-3">{children}</div>
    </div>
  );
}
