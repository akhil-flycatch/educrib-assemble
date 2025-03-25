"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";
import { slugify } from "@/utils/string";

export async function upsertProfilePlacement(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const status = formData.get("status") === "on";
    const profileSlug = (formData.get("profileId") as string) || undefined;
    const title = (formData.get("title") as string) || "NA";
    const description = (formData.get("description") as string) || undefined;
    const avatar = (formData.get("avatar") as string) || null;
    const thumbnail = (formData.get("thumbnail") as string) || null;
    const website = (formData.get("website") as string) || "NA";
    const featured = formData.get("featured") === "on";
    const recommended = formData.get("recommended") === "on";
    const verified = formData.get("verified") === "on";
    const published = formData.get("published") === "on";
    const views = parseInt(formData.get("views") as string) || undefined;

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

    await prisma.profilePlacement.upsert({
      where: {
        id,
      },
      create: {
        title,
        slug: slugify(title),
        profileId: profile.id,
        description,
        avatar,
        thumbnail,
        website,
        featured,
        recommended,
        verified,
        published,
        views,
        status,
      },
      update: {
        title,
        slug: slugify(title),
        profileId: profile.id,
        description,
        avatar,
        thumbnail,
        website,
        featured,
        recommended,
        verified,
        published,
        views,
        status,
      },
    });
    revalidatePath("/profilePlacement");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to upsert profilePlacement" };
  }
}

export async function getAllProfilePlacements(
  filter: { active: boolean } = { active: false }
) {
  const profilePlacements = await prisma.profilePlacement.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
  });
  return profilePlacements;
}

export async function getProfilePlacementsByProfileId(
  profileId: string,
  filter: { active: boolean } = { active: false }
) {
  const profilePlacements = await prisma.profilePlacement.findMany({
    where: {
      profileId,
      status: filter.active ? true : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profilePlacements;
}

export async function getProfilePlacements(
  filter: { active: boolean } = { active: false }
) {
  const supabase = createRouteHandlerClient({ cookies });
  const user = await supabase.auth.getUser();
  const profilePlacements = await prisma.profilePlacement.findMany({
    where: {
      profileId: user.data.user?.user_metadata.profileId,
      status: filter.active ? true : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profilePlacements;
}

export async function getProfilePlacementsByProfileSlug(
  slug: string,
  filter: { active: boolean } = { active: false }
) {
  const profilePlacements = await prisma.profilePlacement.findMany({
    where: {
      profile: {
        slug,
      },
      status: filter.active ? true : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profilePlacements;
}

export async function getProfilePlacementById(id: string) {
  const profilePlacement = await prisma.profilePlacement.findUnique({
    where: {
      id,
    },
  });
  return profilePlacement;
}

export async function searchProfilePlacements(
  profileId: string,
  keyword: string,
  filter: { active: boolean } = { active: false }
) {
  const profilePlacements = await prisma.profilePlacement.findMany({
    where: {
      profileId,
      status: filter.active ? true : undefined,
      title: {
        contains: keyword,
        mode: "insensitive",
      },
    },
  });
  return profilePlacements;
}

export async function deleteProfilePlacementByProfileId(
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

export async function deleteProfilePlacement(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    await prisma.profilePlacement.delete({
      where: {
        id,
      },
    });
    revalidatePath("/profilePlacement");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to delete profilePlacement" };
  }
}
