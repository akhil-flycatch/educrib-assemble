import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log("POST /api/auth/logout", request);
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  const response = await supabase.auth.signOut();
  console.log("response", response);

  // Return a JSON response indicating success
  return NextResponse.json({ success: true });
}
