import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

//import type { Database } from '@/lib/database.types'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  let user;
  user = null;
  if (code) {
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({
      cookies: () => cookieStore,
    });
    await supabase.auth.exchangeCodeForSession(code);
    user = (await supabase.auth.getUser()) as unknown as {
      data?: {
        user?: {
          user_metadata: {
            isUserProfileComplete: boolean;
            profileId: string | null | undefined;
            verticalId: string | null | undefined;
          };
        } | null;
      };
    };
    if (user.data?.user?.user_metadata.profileId) {
      return NextResponse.redirect(requestUrl.origin + "/dashboard/");
    } else if (!user.data?.user?.user_metadata.isUserProfileComplete) {
      return NextResponse.redirect(requestUrl.origin + "/create-profile");
    } else if (!user.data?.user?.user_metadata.verticalId) {
      return NextResponse.redirect(requestUrl.origin + "/category");
    } else {
      return NextResponse.redirect(
        requestUrl.origin +
          "/choose-institute?verticalId=" +
          user.data?.user?.user_metadata.verticalId
      );
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin);
}
