import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  console.log("request body", body);

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

    console.log("user", user);

    const { title } = body;

    const createdProfile = await prisma.profile.create({
      data: {
        ...body,
        userId: user?.id,
        verticalId: user?.user_metadata.verticalId,
        slug: title.split(" ").join("-").toLowerCase(),
        published: false,
        status: true,
        verified: false,
        universityId: "clrpz8z9m000nlf08zilgtzi2",
      },
    });
    await supabase.auth.updateUser({
      data: {
        ...user?.user_metadata,
        profileId: createdProfile.id,
      },
    });

    // const createdProfile = await prisma.profile.create({
    //         data: {
    //           userId: user.data.user?.id,
    //           published: false,
    //           status: true,
    //           title: profileSlugOrId,
    //           slug: profileSlugOrId.split(" ").join("-").toLowerCase(),
    //           verified: false,
    //           verticalId,
    //         },
    //       });
    //       await supabase.auth.updateUser({
    //         data: {
    //           ...user_metadata,
    //           profileId: createdProfile.id,
    //         },
    //       });

    return new Response(
      JSON.stringify({
        message: "Vertical profile created successfully",
        profileId: createdProfile.id,
        profileSlug: createdProfile.slug,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error during POST request:", error);
    return new Response(
      JSON.stringify({ message: "An error occurred", error }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
