"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";
export async function upsertProfileSocial(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const status = formData.get("status") === "on";
    const link = (formData.get("link") as string) || undefined;
    const profileSlug = (formData.get("profileId") as string) || undefined;
    const socialId = (formData.get("socialId") as string) || undefined;

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

    await prisma.profileSocial.upsert({
      where: {
        id,
      },
      create: {
        link,
        profileId: profile.id,
        socialId,
        status,
      },
      update: {
        link,
        profileId: profile.id,
        socialId,
        status,
      },
    });
    revalidatePath("/profileSocials");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to upsert profileSocial" };
  }
}

export async function getAllProfileSocials(
  filter: { active: boolean } = { active: false }
) {
  const profileSocials = await prisma.profileSocial.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
  });
  return profileSocials;
}

export async function getProfileSocialsByProfileId(
  profileId: string,
  filter: { active: boolean } = { active: false }
) {
  const profileSocials = await prisma.profileSocial.findMany({
    where: {
      profileId,
      status: filter.active ? true : undefined,
    },
    include: {
      social: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileSocials;
}

export async function getProfileSocials(
  filter: { active: boolean } = { active: false }
) {
  const supabase = createRouteHandlerClient({ cookies });
  const user = await supabase.auth.getUser();
  const profileSocials = await prisma.profileSocial.findMany({
    where: {
      profileId: user.data.user?.user_metadata.profileId,
      status: filter.active ? true : undefined,
    },
    include: {
      social: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileSocials;
}

export async function getProfileSocialsByProfileSlug(
  slug: string,
  filter: { active: boolean } = { active: false }
) {
  const profileSocials = await prisma.profileSocial.findMany({
    where: {
      profile: {
        slug,
      },
      status: filter.active ? true : undefined,
    },
    include: {
      social: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileSocials;
}

export async function searchProfileSocials(
  profileId: string,
  keyword: string,
  filter: { active: boolean } = { active: false }
) {
  const profileSocials = await prisma.profileSocial.findMany({
    where: {
      profileId,
      status: filter.active ? true : undefined,
      social: {
        title: {
          contains: keyword,
          mode: "insensitive",
        },
      },
    },
    include: {
      social: true,
    },
  });
  return profileSocials;
}

export async function deleteProfileSocialByProfileId(
  profileId: string,
  tx?: Prisma.TransactionClient
) {
  const prismaClient = tx || prisma;
  await prismaClient.profileContact.deleteMany({
    where: {
      profileId,
    },
  });
}

export async function deleteProfileSocial(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    await prisma.profileSocial.delete({
      where: {
        id,
      },
    });
    revalidatePath("/profileSocials");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to delete profileSocial" };
  }
}
