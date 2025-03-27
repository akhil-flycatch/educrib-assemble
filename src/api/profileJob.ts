"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";
import { slugify } from "@/utils/string";

export async function upsertProfileJob(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const status = formData.get("status") === "on";
    const profileSlug = (formData.get("profileId") as string) || undefined;
    const title = (formData.get("title") as string) || "NA";
    const description = (formData.get("description") as string) || undefined;
    const avatar = (formData.get("avatar") as string) || null;
    const thumbnail = (formData.get("thumbnail") as string) || null;
    const location = (formData.get("location") as string) || undefined;
    const duration = parseInt(formData.get("duration") as string) || 0;
    const durationTypeId =
      (formData.get("durationTypeId") as string) || undefined;
    const domain = (formData.get("domain") as string) || undefined;
    const remuneration = parseInt(formData.get("remuneration") as string) || 0;
    const currencyId = (formData.get("currencyId") as string) || undefined;
    const accomodation = formData.get("accomodation") === "on";
    const benefits =
      JSON.parse(formData.get("benefits") as string) || undefined;
    const website = (formData.get("website") as string) || "NA";
    const featured = formData.get("featured") === "on";
    const recommended = formData.get("recommended") === "on";
    const verified = formData.get("verified") === "on";
    const published = formData.get("published") === "on";
    const views = parseInt(formData.get("views") as string) || undefined;
    const typeId = (formData.get("typeId") as string) || undefined;
    const categoryId = (formData.get("categoryId") as string) || undefined;

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

    await prisma.profileJob.upsert({
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
        location,
        duration,
        durationTypeId,
        domain,
        remuneration,
        accomodation,
        benefits,
        typeId,
        categoryId,
        currencyId,
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
        location,
        duration,
        durationTypeId,
        domain,
        remuneration,
        accomodation,
        benefits,
        typeId,
        categoryId,
        currencyId,
        website,
        featured,
        recommended,
        verified,
        published,
        views,
        status,
      },
    });
    revalidatePath("/profileJob");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to upsert profileJob" };
  }
}

export async function getAllProfileJobs(
  filter: { active: boolean } = { active: false }
) {
  const profileHostels = await prisma.profileJob.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
    include: {
      profile: true,
      currency: true,
      durationType: true,
      type: true,
      category: true,
    },
  });
  return profileHostels;
}

export async function getProfileJobsByProfileId(
  profileId: string,
  filter: { active: boolean } = { active: false }
) {
  const profileHostels = await prisma.profileJob.findMany({
    where: {
      profileId,
      status: filter.active ? true : undefined,
    },
    include: {
      profile: true,
      currency: true,
      durationType: true,
      type: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileHostels;
}

export async function getProfileJobs(
  filter: { active: boolean } = { active: false }
) {
  const supabase = createRouteHandlerClient({ cookies });
  const user = await supabase.auth.getUser();
  const profileHostels = await prisma.profileJob.findMany({
    where: {
      profileId: user.data.user?.user_metadata.profileId,
      status: filter.active ? true : undefined,
    },
    include: {
      profile: true,
      currency: true,
      durationType: true,
      type: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileHostels;
}

export async function getProfileJobsByProfileSlug(
  slug: string,
  filter: { active: boolean } = { active: false }
) {
  const profileHostels = await prisma.profileJob.findMany({
    where: {
      profile: {
        slug,
      },
      status: filter.active ? true : undefined,
    },
    include: {
      profile: true,
      currency: true,
      durationType: true,
      type: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileHostels;
}

export async function getProfileJobById(id: string) {
  const profileJob = await prisma.profileJob.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
      currency: true,
      durationType: true,
      type: true,
      category: true,
    },
  });
  return profileJob;
}

export async function searchProfileJobs(
  profileId: string,
  keyword: string,
  filter: { active: boolean } = { active: false }
) {
  const profileHostels = await prisma.profileJob.findMany({
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
      currency: true,
      durationType: true,
      type: true,
      category: true,
    },
  });
  return profileHostels;
}

export async function deleteProfileJobByProfileId(
  profileId: string,
  tx?: Prisma.TransactionClient
) {
  const prismaClient = tx || prisma;
  await prismaClient.profileJob.deleteMany({
    where: {
      profileId,
    },
  });
}

export async function deleteProfileJob(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    await prisma.profileJob.delete({
      where: {
        id,
      },
    });
    revalidatePath("/profileJob");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to delete profileJob" };
  }
}
