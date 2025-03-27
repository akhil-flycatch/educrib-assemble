import Link from "next/link";

import { Button } from "../atoms";

type EmptyProps = {
  title: string;
  description: string;
  href?: string;
  backText?: string;
};
export default function Empty({
  title = "Not Found",
  description = "Could not find requested resource",
  href = "/",
  backText = "Go Back<",
}: EmptyProps) {
  return (
    <div className="bg-light p-8 rounded-md flex flex-col space-y-2">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-black/75 pb-4">{description}</p>
      {href && (
        <Link href={href}>
          <Button>{backText}</Button>
        </Link>
      )}
    </div>
  );
}
