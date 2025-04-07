import { getProfileStaffsByProfileId } from "@/api";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const supabase = createRouteHandlerClient<any>({
    cookies: () => cookieStore,
  });
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      throw new Error(`Authentication error: ${userError.message}`);
    }

    const { profileId } = user?.user_metadata || {};

    if (!profileId) {
      return new Response(
        JSON.stringify({
          message: "Profile ID is missing from user metadata.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const staffs = await getProfileStaffsByProfileId(profileId, {
      active: true,
    });
    return new Response(JSON.stringify({ message: "Success", data: staffs }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error during GET request:", error);
    return new Response(
      JSON.stringify({ message: "An error occurred", error }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
