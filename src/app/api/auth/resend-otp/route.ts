import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get("email"));

  const cookieStore = await cookies();
  const supabase = createRouteHandlerClient<any>({
    cookies: () => cookieStore,
  });

  if (!email) {
    return NextResponse.json(
      {
        success: false,
        message: "Missing Email",
      },
      {
        status: 400,
      }
    );
  }

  try {
    console.time("Resending OTP");
    const { data, error } =  await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${requestUrl.origin}/api/auth/callback`,
      },
    });
    console.timeEnd("Resending OTP");

    
    if (error) {
      console.error("OTP resnend error: ", error);
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "OTP resend successfully",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred while resending the OTP",
       },
      { status: 500 }
    );
  }
}
