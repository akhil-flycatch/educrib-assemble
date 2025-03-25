import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// import type { Database } from '@/lib/database.types'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const name = String(formData.get("name"));
  const phone = String(formData.get("phone"));
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  await supabase.auth.updateUser({
    data: {
      name,
      phone,
    },
  });

  return NextResponse.redirect(`${requestUrl.origin}/profile`, {
    status: 301,
  });
}
