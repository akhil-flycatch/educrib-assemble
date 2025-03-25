"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";
import { slugify } from "@/utils/string";

export async function upsertProfileInternship(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const status = formData.get("status") === "on";
    const profileSlug = (formData.get("profileId") as string) || undefined;
    const title = (formData.get("title") as string) || "NA";
    const description = (formData.get("description") as string) || undefined;
    const avatar = (formData.get("avatar") as string) || null;
    const thumbnail = (formData.get("thumbnail") as string) || null;
    const location = (formData.get("location") as string) || "NA";
    const duration = parseInt(formData.get("duration") as string) || 0;
    const durationTypeId = (formData.get("durationTypeId") as string) || "NA";
    const domain = (formData.get("domain") as string) || "NA";
    const remuneration = parseInt(formData.get("remuneration") as string) || 0;
    const currencyId = (formData.get("currencyId") as string) || "NA";
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

    await prisma.profileInternship.upsert({
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

    revalidatePath("/profileInternship");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to upsert profileInternship" };
  }
}

export async function getAllProfileInternships(
  filter: { active: boolean } = { active: false }
) {
  const profileInternships = await prisma.profileInternship.findMany({
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
  return profileInternships;
}

export async function getProfileInternshipsByProfileId(
  profileId: string,
  filter: { active: boolean } = { active: false }
) {
  const profileInternships = await prisma.profileInternship.findMany({
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
  return profileInternships;
}

export async function getProfileInternships(
  filter: { active: boolean } = { active: false }
) {
  const supabase = createRouteHandlerClient({ cookies });
  const user = await supabase.auth.getUser();
  const profileInternships = await prisma.profileInternship.findMany({
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
  return profileInternships;
}

export async function getProfileInternshipsByProfileSlug(
  slug: string,
  filter: { active: boolean } = { active: false }
) {
  const profileInternships = await prisma.profileInternship.findMany({
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
  return profileInternships;
}

export async function getProfileInternshipById(id: string) {
  const profileInternship = await prisma.profileInternship.findUnique({
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
  return profileInternship;
}

export async function searchProfileInternships(
  profileId: string,
  keyword: string,
  filter: { active: boolean } = { active: false }
) {
  const profileInternships = await prisma.profileInternship.findMany({
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
      currency: true,
      durationType: true,
      type: true,
      category: true,
    },
  });
  return profileInternships;
}

export async function deleteProfileInternshipByProfileId(
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

export async function deleteProfileInternship(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    await prisma.profileInternship.delete({
      where: {
        id,
      },
    });
    revalidatePath("/profileInternship");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to delete profileInternship" };
  }
}
