import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// import type { Database } from '@/lib/database.types'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const cookieStore = await cookies();
  const supabase = createRouteHandlerClient<any>({
    cookies: () => cookieStore,
  });
  console.log("the route", requestUrl.origin);

  if (!email) {
    return NextResponse.redirect(`${requestUrl.origin}/error`, {
      status: 301,
    });
  }

  await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${requestUrl.origin}/api/auth/callback`,
    },
  });

  return NextResponse.redirect(`${requestUrl.origin}/otp?email=${email}`, {
    status: 301,
  });
}
