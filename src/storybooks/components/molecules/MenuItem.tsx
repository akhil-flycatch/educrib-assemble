import Link from "next/link";
import { ReactNode } from "react";

import { Typography } from "../atoms";

export default function MenuItem({
  name,
  icon,
  href,
}: {
  name: string;
  icon: ReactNode;
  href: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center space-x-4 py-2 px-3 hover:bg-black/20 rounded-md group"
      >
        <span className="group-hover:translate-x-2 duration-100">{icon}</span>
        <Typography theme="light">{name}</Typography>
      </Link>
    </li>
  );
}
