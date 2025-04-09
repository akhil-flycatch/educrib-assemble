import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const supabase = createRouteHandlerClient<any>({
    cookies: () => cookieStore,
  });

  const { data } = await supabase.auth.getUser();
  const { profileId } = data?.user?.user_metadata;

  try {
    const { searchParams } = new URL(request.url);

    const limit = parseInt(searchParams.get("limit") || "5", 10);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const search = searchParams.get("search") || "";
    const cursor = searchParams.get("cursor");

    if (limit < 1 || page < 1) {
      return new Response(
        JSON.stringify({ message: "Invalid limit or page value" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const whereClause = {
      status: true,
      profileId,
      OR: search
        ? [
            { course: { title: { contains: search, mode: "insensitive" } } },
            {
              specialization: {
                title: { contains: search, mode: "insensitive" },
              },
            },
            { level: { title: { contains: search, mode: "insensitive" } } },
          ]
        : undefined,
    };

    let profileProgrammes;
    let nextCursor = null;
    let totalCount = 0;

    if (cursor) {
      profileProgrammes = await prisma.profileProgramme.findMany({
        where: whereClause,
        include: {
          course: true,
          durationType: true,
          intake: true,
          level: true,
          specialization: true,
          programmeStudyMode: true,
          profileProgrammeFees: {
            where: { status: true },
            include: { currency: true, frequency: true },
          },
        },
        take: limit + 1,
        cursor: { id: cursor },
      });
      nextCursor =
        profileProgrammes.length > limit ? profileProgrammes.pop()?.id : null;
    } else {
      profileProgrammes = await prisma.profileProgramme.findMany({
        where: whereClause,
        include: {
          course: true,
          durationType: true,
          intake: true,
          level: true,
          specialization: true,
          programmeStudyMode: true,
          profileProgrammeFees: {
            where: { status: true },
            include: { currency: true, frequency: true },
          },
        },
        skip: (page - 1) * limit,
        take: limit + 1,
      });

      nextCursor =
        profileProgrammes.length > limit ? profileProgrammes.pop()?.id : null;

      totalCount = await prisma.profileProgramme.count({
        where: {
          status: true,
          profileId,
        },
      });
    }

    return new Response(
      JSON.stringify({
        message: "Success",
        data: profileProgrammes,
        nextCursor,
        pagination: cursor
          ? null
          : {
              currentPage: page,
              totalPages: Math.ceil(totalCount / limit),
              totalItems: totalCount,
            },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
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
