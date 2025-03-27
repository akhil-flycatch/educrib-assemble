"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function upsertProfileAccreditation(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const status = formData.get("status") === "on";
    const profileSlug = (formData.get("profileId") as string) || undefined;
    const accreditationId =
      (formData.get("accreditationId") as string) || undefined;

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

    await prisma.profileAccreditation.upsert({
      where: {
        id,
      },
      create: {
        accreditationId,
        profileId: profile.id,
        status,
      },
      update: {
        accreditationId,
        profileId: profile.id,
        status,
      },
    });
    revalidatePath("/profileAccreditation");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to upsert profileAccreditation" };
  }
}

export async function createMultipleProfileAccreditations(formData: FormData) {
  try {
    const profileSlug = formData.get("profileId") as string;
    const accreditations =
      JSON.parse(formData.get("accreditationId") as string) || undefined;

    const profile = await prisma.profile.findFirst({
      where: {
        OR: [
          {
            id: profileSlug,
          },
          {
            slug: profileSlug,
          },
        ],
      },
    });
    if (!profile) return { message: "Profile not found" };
    for (const accreditationId of accreditations) {
      const profileAccreditation = await prisma.profileAccreditation.findFirst({
        where: {
          profileId: profile.id,
          accreditationId,
        },
      });
      if (!profileAccreditation) {
        await prisma.profileAccreditation.create({
          data: {
            profileId: profile.id,
            accreditationId,
            status: true,
          },
        });
      }
    }
    revalidatePath("/profileAccreditation");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to update profile Accreditation" };
  }
}

export async function getAllProfileAccreditations(
  filter: { active: boolean } = { active: false }
) {
  const profileAccreditations = await prisma.profileAccreditation.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
  });
  return profileAccreditations;
}

export async function getProfileAccreditationsByProfileId(
  profileId: string,
  filter: { active: boolean } = { active: false }
) {
  const profileAccreditations = await prisma.profileAccreditation.findMany({
    where: {
      profileId,
      status: filter.active ? true : undefined,
    },
    include: {
      accreditation: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileAccreditations;
}

export async function getProfileAccreditationsByProfileSlug(
  slug: string,
  filter: { active: boolean } = { active: false }
) {
  const profileAccreditations = await prisma.profileAccreditation.findMany({
    where: {
      profile: {
        slug,
      },
      status: filter.active ? true : undefined,
    },
    include: {
      accreditation: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileAccreditations;
}

export async function getProfileAccreditations(
  filter: { active: boolean } = { active: false }
) {
  const supabase = createRouteHandlerClient({ cookies });
  const user = await supabase.auth.getUser();
  const profileAccreditations = await prisma.profileAccreditation.findMany({
    where: {
      profileId: user.data.user?.user_metadata.profileId,
      status: filter.active ? true : undefined,
    },
    include: {
      accreditation: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileAccreditations;
}

export async function getProfileAccreditationById(id: string) {
  const profileAccreditation = await prisma.profileAccreditation.findUnique({
    where: {
      id,
    },
    include: {
      accreditation: true,
    },
  });
  return profileAccreditation;
}

export async function searchProfileAccreditations(
  profileId: string,
  keyword: string,
  filter: { active: boolean } = { active: false }
) {
  const profileAccreditations = await prisma.profileAccreditation.findMany({
    where: {
      profileId,
      accreditation: {
        title: {
          contains: keyword,
          mode: "insensitive",
        },
      },
      status: filter.active ? true : undefined,
    },
    include: {
      accreditation: true,
    },
  });
  return profileAccreditations;
}

export async function deleteProfileAccreditationByProfileId(
  profileId: string,
  tx?: Prisma.TransactionClient
) {
  const prismaClient = tx || prisma;
  await prismaClient.profileAccreditation.deleteMany({
    where: {
      profileId,
    },
  });
}

export async function deleteProfileAccreditation(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    await prisma.profileAccreditation.delete({
      where: {
        id,
      },
    });
    revalidatePath("/profileAccreditation");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to delete profileAccreditation" };
  }
}
