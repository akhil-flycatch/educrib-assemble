import Link from "next/link";

import Typography from "./Typography";

export default function Logo({
  brand,
  theme = "gradient",
  intent = "body",
  className,
}: {
  brand?: string;
  theme?: "light" | "dark" | "gradient";
  intent?: "title" | "body";
  className?: string;
}) {
  return (
    <Link href="/">
      <Typography intent={intent} theme={theme} className={className}>
        {brand || "educrib"}
      </Typography>
    </Link>
  );
}
