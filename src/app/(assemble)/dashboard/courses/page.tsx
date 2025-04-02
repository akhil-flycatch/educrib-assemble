"use client"
import { Suspense } from "react";
export default function Courses() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Courses />
    </Suspense>
  );
}
