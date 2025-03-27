"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";

export async function upsertProfileReview(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const status = formData.get("status") === "on";
    const profileSlug = (formData.get("profileId") as string) || undefined;
    const title = (formData.get("title") as string) || "NA";
    const description = (formData.get("description") as string) || undefined;
    const location = (formData.get("location") as string) || undefined;
    const rating = (formData.get("rating") as string) || "0";
    const name = (formData.get("name") as string) || undefined;
    const email = (formData.get("email") as string) || "NA";
    const phone = (formData.get("phone") as string) || undefined;

    const convertedRating = parseInt(rating);

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

    await prisma.profileReview.upsert({
      where: {
        id,
      },
      create: {
        title,
        profileId: profile.id,
        description,
        location,
        rating: convertedRating,
        name,
        email,
        phone,
        status,
      },
      update: {
        title,
        profileId: profile.id,
        description,
        location,
        rating: convertedRating,
        name,
        email,
        phone,
        status,
      },
    });
    revalidatePath("/profileReview");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to upsert profileReview" };
  }
}

export async function getAllProfileReviews(
  filter: { active: boolean } = { active: false }
) {
  const profileReviews = await prisma.profileReview.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
  });
  return profileReviews;
}

export async function getProfileReviewsByProfileId(
  profileId: string,
  filter: { active: boolean } = { active: false }
) {
  const profileReviews = await prisma.profileReview.findMany({
    where: {
      profileId,
      status: filter.active ? true : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileReviews;
}

export async function getProfileReviews(
  filter: { active: boolean } = { active: false }
) {
  const supabase = createRouteHandlerClient({ cookies });
  const user = await supabase.auth.getUser();
  const profileReviews = await prisma.profileReview.findMany({
    where: {
      profileId: user.data.user?.user_metadata.profileId,
      status: filter.active ? true : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileReviews;
}

export async function getProfileReviewsByProfileSlug(
  slug: string,
  filter: { active: boolean } = { active: false }
) {
  const profileReviews = await prisma.profileReview.findMany({
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
  return profileReviews;
}

export async function getProfileReviewById(id: string) {
  const profileReview = await prisma.profileReview.findUnique({
    where: {
      id,
    },
  });
  return profileReview;
}

export async function searchProfileReviews(
  profileId: string,
  keyword: string,
  filter: { active: boolean } = { active: false }
) {
  const profileReviews = await prisma.profileReview.findMany({
    where: {
      profileId,
      title: {
        contains: keyword,
        mode: "insensitive",
      },
      status: filter.active ? true : undefined,
    },
  });
  return profileReviews;
}

export async function deleteProfileReviewByProfileId(
  profileId: string,
  tx?: Prisma.TransactionClient
) {
  try {
    const prismaClient = tx || prisma;
    await prismaClient.profileReview.deleteMany({
      where: {
        profileId,
      },
    });
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to delete profileReview" };
  }
}

export async function deleteProfileReview(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    await prisma.profileReview.delete({
      where: {
        id,
      },
    });
    revalidatePath("/profileReview");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to delete profileReview" };
  }
}
