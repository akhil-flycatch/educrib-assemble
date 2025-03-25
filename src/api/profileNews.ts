"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";
import { slugify } from "@/utils/string";
import { Prisma } from "@prisma/client";

export async function upsertProfileNews(formData: FormData) {
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

    await prisma.profileNews.upsert({
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
    revalidatePath("/profileNews");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to upsert profileNews" };
  }
}

export async function getAllProfileNews(
  filter: { active: boolean } = { active: false }
) {
  const profileNews = await prisma.profileNews.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
    include: {
      profile: true,
    },
  });
  return profileNews;
}

export async function getProfileNewsByProfileId(
  profileId: string,
  filter: { active: boolean } = { active: false }
) {
  const profileNews = await prisma.profileNews.findMany({
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
  return profileNews;
}

export async function getProfileNews(
  filter: { active: boolean } = { active: false }
) {
  const supabase = createRouteHandlerClient({ cookies });
  const user = await supabase.auth.getUser();
  const profileNews = await prisma.profileNews.findMany({
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
  return profileNews;
}

export async function getProfileNewsByProfileSlug(
  slug: string,
  filter: { active: boolean } = { active: false }
) {
  const profileNews = await prisma.profileNews.findMany({
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
  return profileNews;
}

export async function getProfileNewsById(id: string) {
  const profileNews = await prisma.profileNews.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
    },
  });
  return profileNews;
}

export async function searchProfileNews(
  profileId: string,
  keyword: string,
  filter: { active: boolean } = { active: false }
) {
  const profileNews = await prisma.profileNews.findMany({
    where: {
      profileId,
      status: filter.active ? true : undefined,
      title: {
        contains: keyword,
        mode: "insensitive",
      },
    },
    include: {
      profile: true,
    },
  });
  return profileNews;
}

export async function deleteProfileNewsByProfileId(
  profileId: string,
  tx?: Prisma.TransactionClient
) {
  const prismaClient = tx || prisma;
  await prismaClient.profileNews.deleteMany({
    where: {
      profileId,
    },
  });
}

export async function deleteProfileNews(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    await prisma.profileNews.delete({
      where: {
        id,
      },
    });
    revalidatePath("/profileNews");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to delete profileNews" };
  }
}
