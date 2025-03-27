import { getProfile } from "@/api/";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const otp = String(formData.get("otp"));
  const email = String(formData.get("email"));

  const cookieStore = await cookies();
  const supabase = createRouteHandlerClient<any>({
    cookies: () => cookieStore,
  });

  if (!otp && !email) {
    return NextResponse.json(
      {
        success: false,
        message: "Missing Email or Invalid OTP",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });
    console.log("user_metadata: ", data?.user);
    if (error) {
      console.error("OTP verification error: ", error);
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }
    let redirectTo = "";
    if (data?.user?.user_metadata?.profileId) {
      const loggedInprofile = await  getProfile();
      console.log("the logged in progeile", loggedInprofile);
      if(loggedInprofile?.verified){
        redirectTo = "/dashboard"
      }
    }
    else{
      if(!data?.user?.user_metadata.verticalId){
        redirectTo = "/category";
      }
      else if(!data?.user?.user_metadata.isUserProfileComplete){
        redirectTo = "/create-profile";
      }
      else if( data?.user?.user_metadata.isUserProfileComplete){
        redirectTo = "/create-institute";
      }
      else{
        redirectTo = `/choose-institute?verticalId=${data?.user?.user_metadata.verticalId}`;
      }
     
    }

    return NextResponse.json(
      {
        success: true,
        message: "OTP verified successfully",
        redirectTo,
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Unexpected error during OTP verification" },
      { status: 500 }
    );
  }
}
