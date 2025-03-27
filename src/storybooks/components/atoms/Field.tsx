import { ReactNode } from "react";

import { Direction } from "@/types";

export default function Field({
  children,
  direction = "vertical",
}: {
  children: ReactNode;
  direction?: Direction;
}) {
  return (
    <div
      className={`flex ${
        direction === "vertical" ? "flex-col space-y-2" : "flex-row space-x-2"
      }`}
    >
      {children}
    </div>
  );
}
