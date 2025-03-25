import { getVerticalById } from "@/api";
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

    const { verticalId } = user?.user_metadata || {};

    if (!verticalId) {
      return new Response(
        JSON.stringify({
          message: "Vertical ID is missing from user metadata.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const vertical = await getVerticalById(verticalId);

    if (!vertical) {
      return new Response(JSON.stringify({ message: "Vertical not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ message: "Success", data: vertical }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
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
