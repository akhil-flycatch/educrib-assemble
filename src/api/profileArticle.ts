"use server";


import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";
import { slugify } from "@/utils/string";

export async function upsertProfileArticle(formData: FormData) {
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
    const views = parseInt(formData.get("views") as string) || 0;

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

    await prisma.profileArticle.upsert({
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
    revalidatePath("/profileArticle");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to upsert profileArticle" };
  }
}

export async function getAllProfileArticles(
  filter: { active: boolean } = { active: false }
) {
  const profileArticles = await prisma.profileArticle.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
    include: {
      profile: true,
    },
  });
  return profileArticles;
}

export async function getProfileArticlesByProfileId(
  profileId: string,
  filter: { active: boolean } = { active: false }
) {
  const profileArticles = await prisma.profileArticle.findMany({
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
  return profileArticles;
}

export async function getProfileArticlesByProfileSlug(
  slug: string,
  filter: { active: boolean } = { active: false }
) {
  const profileArticles = await prisma.profileArticle.findMany({
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
  return profileArticles;
}

export async function getProfileArticles(
  filter: { active: boolean } = { active: false }
) {
  const supabase = createRouteHandlerClient({ cookies });
  const user = await supabase.auth.getUser();
  const profileArticles = await prisma.profileArticle.findMany({
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
  return profileArticles;
}

export async function getProfileArticleById(id: string) {
  const profileArticle = await prisma.profileArticle.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
    },
  });
  return profileArticle;
}

export async function searchProfileArticles(
  profileId: string,
  keyword: string,
  filter: { active: boolean } = { active: false }
) {
  const profileArticles = await prisma.profileArticle.findMany({
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
  return profileArticles;
}

export async function deleteProfileArticleByProfileId(
  profileId: string,
  tx?: Prisma.TransactionClient
) {
  const prismaClient = tx || prisma;
  await prismaClient.profileArticle.deleteMany({
    where: {
      profileId,
    },
  });
}

export async function deleteProfileArticle(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    await prisma.profileArticle.delete({
      where: {
        id,
      },
    });
    revalidatePath("/profileArticle");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to delete profileArticle" };
  }
}
