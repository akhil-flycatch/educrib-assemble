"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function LoginError() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  return (
    <span className="text-danger">
      {`${message ?? "Invalid Email Address"} `}
      <Link href="/login" className="text-underline text-dark">
        Back To Login
      </Link>
    </span>
  );
}
