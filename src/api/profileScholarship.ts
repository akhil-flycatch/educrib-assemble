"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";
import { slugify } from "@/utils/string";

export async function upsertProfileScholarship(formData: FormData) {
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

    await prisma.profileScholarship.upsert({
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
    revalidatePath("/profileScholarship");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to upsert profileScholarship" };
  }
}

export async function getAllProfileScholarships(
  filter: { active: boolean } = { active: false }
) {
  const profileScholarships = await prisma.profileScholarship.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
    include: {
      profile: true,
    },
  });
  return profileScholarships;
}

export async function getProfileScholarshipsByProfileId(
  profileId: string,
  filter: { active: boolean } = { active: false }
) {
  const profileScholarships = await prisma.profileScholarship.findMany({
    where: {
      profileId,
      status: filter.active ? true : undefined,
    },
    include: {
      profile: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileScholarships;
}

export async function getProfileScholarships(
  filter: { active: boolean } = { active: false }
) {
  const supabase = createRouteHandlerClient({ cookies });
  const user = await supabase.auth.getUser();
  const profileScholarships = await prisma.profileScholarship.findMany({
    where: {
      profileId: user.data.user?.user_metadata.profileId,
      status: filter.active ? true : undefined,
    },
    include: {
      profile: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileScholarships;
}

export async function getProfileScholarshipsByProfileSlug(
  slug: string,
  filter: { active: boolean } = { active: false }
) {
  const profileScholarships = await prisma.profileScholarship.findMany({
    where: {
      profile: {
        slug,
      },
      status: filter.active ? true : undefined,
    },
    include: {
      profile: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileScholarships;
}

export async function getProfileScholarshipById(id: string) {
  const profileScholarship = await prisma.profileScholarship.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
    },
  });
  return profileScholarship;
}

export async function searchProfileScholarships(
  profileId: string,
  keyword: string,
  filter: { active: boolean } = { active: false }
) {
  const profileScholarships = await prisma.profileScholarship.findMany({
    where: {
      profileId,
      title: {
        contains: keyword,
        mode: "insensitive",
      },
      status: filter.active ? true : undefined,
    },
    include: {
      profile: true,
    },
  });
  return profileScholarships;
}

export async function deleteProfileScholarshipByProfileId(
  profileId: string,
  tx?: Prisma.TransactionClient
) {
  const prismaClient = tx || prisma;
  await prismaClient.profileScholarship.deleteMany({
    where: {
      profileId,
    },
  });
}

export async function deleteProfileScholarship(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    await prisma.profileScholarship.delete({
      where: {
        id,
      },
    });
    revalidatePath("/profileScholarship");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to delete profileScholarship" };
  }
}
