// pages/api/profileProgramme.ts

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const supabase = createRouteHandlerClient<any>({
    cookies: () => cookieStore,
  });
  const user = await supabase.auth.getUser();

  try {
    // Fetch profileProgrammes with related data using Prisma
    const profileProgrammes = await prisma.profileProgramme.findMany({
      where: {
        status: true,
        profileId: "clrpz6nnn000mlf08dy5aqjdm",
      },
      include: {
        course: true,
        durationType: true,
        intake: true,
        level: true,
        specialization: true,
        programmeStudyMode: true,
        profileProgrammeFees: {
          where: {
            status: true,
          },
          include: {
            currency: true,
            frequency: true,
          },
        },
      },
    });

    const result = profileProgrammes.map((programme) => {
      const filteredFees = programme.profileProgrammeFees.filter(
        (fee) => fee.profileProgrammeId === programme.id
      );

      return {
        ...programme,
        profileProgrammeFees: filteredFees,
      };
    });

    return new Response(JSON.stringify({ message: "Success", data: result }), {
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
