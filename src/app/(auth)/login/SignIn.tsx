"use client";

import { Button, Form } from "@/storybooks/components/atoms";
import { Email } from "@/storybooks/forms/fields";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const sentOTP = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // formData.append("email", email);
    try {
      setLoading(true);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        window.location.href = response.url;
      }
    } catch (error) {
      console.error("error: ", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form
      // action="../../api/auth/login"
      // method="post"
      className="bg-none p-0 flex flex-col space-y-6 justify-center"
      onSubmit={sentOTP}
    >
      <p className=" font-semibold text-[36px] leading-[57.6px] tracking-[0.01em] text-center text-[#354764]">
        Let’s get started
      </p>
      <p className=" font-normal text-[20px] leading-[32px] tracking-[0.01em] text-center text-[#505F79]">
        Enter your email ID to receive 6 digit OTP
      </p>
      <Email label={false} />
      <Button className="w-[388px] h-[60px] rounded-[10px] bg-[#6129FE] text-white  font-[500] text-[20px] leading-[20px]">
        {loading ? (
          <div className="flex items-center justify-center w-full">
            <Loader2 className="animate-spin text-white" />
          </div>
        ) : (
          "Send 6 digit OTP"
        )}
      </Button>
    </Form>
  );
}
