"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";

export async function upsertSeo(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const title = (formData.get("title") as string) || "NA";
    const status = formData.get("status") === "on";
    const description = (formData.get("description") as string) || undefined;
    const keywords =
      JSON.parse(formData.get("keywords") as string) || undefined;
    const canonical = (formData.get("canonical") as string) || undefined;
    const thumbnail = (formData.get("thumbnail") as string) || null;
    const profileSlug = (formData.get("profileId") as string) || "NA";

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

    await prisma.seo.upsert({
      where: {
        id,
      },
      create: {
        title,
        status,
        description,
        keywords,
        canonical,
        thumbnail,
        profileId: profile.id,
      },
      update: {
        title,
        status,
        description,
        keywords,
        canonical,
        thumbnail,
        profileId: profile.id,
      },
    });
    revalidatePath(`/dashboard/seo`);
  } catch (e: any) {
    return { message: "Failed to upsert seo" };
  }
}

export async function getAllSeos() {
  const seos = await prisma.seo.findMany();
  return seos;
}

export async function getLatestSeos() {
  const seos = await prisma.seo.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
  return seos;
}

export async function getSeoByProfileId(profileId: string) {
  const seo = await prisma.seo.findUnique({
    where: {
      profileId,
    },
  });
  return seo;
}

export async function getSeo() {
  const supabase = createRouteHandlerClient({ cookies });
  const user = await supabase.auth.getUser();
  const seo = await prisma.seo.findUnique({
    where: {
      profileId: user.data.user?.user_metadata.profileId,
    },
  });
  return seo;
}

export async function getSeoByProfileSlug(slug: string) {
  const seo = await prisma.seo.findFirst({
    where: {
      profile: {
        slug,
      },
    },
  });
  return seo;
}

export async function searchSeos(keyword: string) {
  const seos = await prisma.seo.findMany({
    where: {
      title: {
        contains: keyword,
        mode: "insensitive",
      },
    },
  });
  return seos;
}

export async function deleteSeoByProfileId(
  profileId: string,
  tx?: Prisma.TransactionClient
) {
  try {
    const prismaClient = tx || prisma;
    await prismaClient.seo.deleteMany({
      where: {
        profileId,
      },
    });
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to delete seo" };
  }
}

export async function deleteSeo(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    await prisma.seo.delete({
      where: {
        id,
      },
    });
    revalidatePath("/seo");
  } catch (e: any) {
    return { message: "Failed to delete seo" };
  }
}
