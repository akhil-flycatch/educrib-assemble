"use server";

import { prisma } from "@/lib/prisma";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { errorMessageGenerator } from "@/utils/errorHandler";
import { Prisma } from "@prisma/client";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function upsertProfileFacility(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const status = formData.get("status") === "on";
    const profileSlug = (formData.get("profileId") as string) || undefined;
    const facilityId = (formData.get("facilityId") as string) || undefined;

    const profile = await prisma.profile.findFirst({
      where: {
        OR: [
          {
            slug: profileSlug,
          },
          {
            id: profileSlug,
          },
        ],
      },
    });
    if (!profile) return { message: "profileSlug is invalid" };

    await prisma.profileFacility.upsert({
      where: {
        id,
      },
      create: {
        status,
        profileId: profile.id,
        facilityId,
      },
      update: {
        status,
        profileId: profile.id,
        facilityId,
      },
    });
    revalidatePath("/profileFacilities");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to upsert profileFacility" };
  }
}

export async function createMultipleProfileFacilities(facilities: any) {
  try {
     const supabase = await createRouteHandlerClient({ cookies });
        const user = await supabase.auth.getUser();
    // const profileSlug = formData.get("profileId") as string;
    // const facilities =
    //   JSON.parse(formData.get("facilityId") as string) || undefined;

    const profile = await prisma.profile.findFirst({
      where: {
        OR: [
          {
            id: user.data.user?.user_metadata.profileId ,
          },
          {
            slug:  user.data.user?.user_metadata.profileslug,
          },
        ],
      },
    });
    if (!profile) return { message: "Profile not found" };
    for (const facilityId of facilities) {
      const profileFacility = await prisma.profileFacility.findFirst({
        where: {
          profileId: profile.id,
          facilityId,
        },
      });
      if (!profileFacility) {
        await prisma.profileFacility.create({
          data: {
            profileId: profile.id,
            facilityId,
            status: true,
          },
        });
      }
    }
    revalidatePath("/profileFacilities");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to update Profile Facility" };
  }
}

export async function getAllProfileFacilities(
  filter: { active: boolean } = { active: false }
) {
  const profileFacilities = await prisma.profileFacility.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
  });
  return profileFacilities;
}

export async function getProfileFacilitiesByProfileId(
  profileId?: string,
  filter: { active: boolean } = { active: false }
) {
  const supabase = await createRouteHandlerClient({ cookies });
      const user = await supabase.auth.getUser();
  const profileFacilities = await prisma.profileFacility.findMany({
    where: {
      profileId: user.data.user?.user_metadata.profileId || profileId,
      status: filter.active ? true : undefined,
    },
    include: {
      facility: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileFacilities;
}

export async function getProfileFacilitiesByProfileSlug(
  slug: string,
  filter: { active: boolean } = { active: false }
) {
  const profileFacilities = await prisma.profileFacility.findMany({
    where: {
      profile: {
        slug,
      },
      status: filter.active ? true : undefined,
    },
    include: {
      facility: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileFacilities;
}

export async function getProfileFacilities(
  filter: { active: boolean } = { active: false }
) {
  const supabse = createRouteHandlerClient({ cookies });
  const user = await supabse.auth.getUser();
  const profileFacilities = await prisma.profileFacility.findMany({
    where: {
      profileId: user.data.user?.user_metadata.profileId,
      status: filter.active ? true : undefined,
    },
    include: {
      facility: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileFacilities;
}

export async function searchProfileFacilities(
  keyword: string,
  filter: { active: boolean } = { active: false }
) {
  const profileFacilities = await prisma.profileFacility.findMany({
    where: {
      OR: [
        {
          profile: {
            title: {
              contains: keyword,
              mode: "insensitive",
            },
          },
        },
        {
          facility: {
            title: {
              contains: keyword,
              mode: "insensitive",
            },
          },
        },
      ],
      status: filter.active ? true : undefined,
    },
    include: {
      facility: true,
    },
  });
  return profileFacilities;
}

export async function deleteProfileFacilityByProfileId(
  profileId: string,
  tx?: Prisma.TransactionClient
) {
  const prismaClient = tx || prisma;
  await prismaClient.profileFacility.deleteMany({
    where: {
      profileId,
    },
  });
}

export async function deleteProfileFacility(id: any) {
  try {
    // const id = formData.get("id") as string;
    await prisma.profileFacility.delete({
      where: {
        id,
      },
    });
    revalidatePath("/profileFacilities");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to delete profileFacility" };
  }
}
