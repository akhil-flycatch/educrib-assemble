"use client";
import { Form, Button } from "@/storybooks/components/atoms";
import OTPField from "@/storybooks/forms/fields/Otp";
import { Loader2 } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

const otpSchema = z.object({
  otp: z.string().regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
  email: z.string().email("Invalid email address"),
});

const OTP: React.FC = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const otpSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    formData.append("email", email);

    const formValues = {
      otp: formData.get("otp") as string,
      email: formData.get("email") as string,
    };

    const validationResult = otpSchema.safeParse(formValues);

    if (!validationResult.success) {
      setError(validationResult.error.errors[0].message);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        body: formData,
      });
      const { success, message, redirectTo } = await response.json();

      if (response.ok) {
        if (success) {
          router.push(redirectTo);
        }
      } else {
        console.error("error: ", message);
        setError(message);
      }
    } catch (error) {
      console.error("error: ", error);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const otpResendHandler = async () => {
    const formData = new FormData();
    formData.append("email", email);
    await fetch("/api/auth/resend-otp", {
      method: "POST",
      body: formData,
    });
  };

  return (
    <Form className="bg-white flex flex-col justify-center items-center gap-[28px]" onSubmit={otpSubmitHandler}>
      <p className="font-semibold text-[36px] leading-[57.6px] tracking-[0.01em] text-center text-[#354764]">Enter the code</p>
      <p className="font-normal text-[20px] leading-[32px] tracking-[0.01em] text-center text-[#505F79]">
        Enter the OTP that we sent to your email
      </p>
      <p className="font-normal text-[20px] leading-[32px] tracking-[0.01em] text-center text-[#505F79]">
        {email}
      </p>

      <OTPField label={false} type="number" pattern="\d*" />
      <p className="font-[14px] leading-[20px] text-[600] text-[#656A7E]">
        Didn’t receive OTP? <span className="text-primary cursor-pointer hover:underline" onClick={otpResendHandler}>Resend OTP</span>
      </p>
      {error && <p className="text-red-500">{error}</p>}

      <Button className="w-[388px] h-[60px] rounded-[10px] bg-[#6129FE] text-white font-[500] text-[20px] leading-[20px]" type="submit" disabled={loading}>
        {loading ? (
          <div className="flex items-center justify-center w-full">
            <Loader2 className="animate-spin text-white" />
          </div>
        ) : (
          "Login"
        )}
      </Button>
    </Form>
  );
};

export default OTP;
