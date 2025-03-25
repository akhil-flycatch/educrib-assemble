"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";

import { errorMessageGenerator } from "@/utils/errorHandler";
import { slugify } from "@/utils/string";
import { Prisma } from "@prisma/client";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function upsertLocation(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const title = (formData.get("title") as string) || "NA";
    const status = formData.get("status") === "on";
    const alias = (formData.get("alias") as string) || undefined;
    const shortAddress = (formData.get("shortAddress") as string) || "NA";
    const area = (formData.get("area") as string) || undefined;
    const region = (formData.get("region") as string) || undefined;
    const state = (formData.get("state") as string) || undefined;
    const countryId = (formData.get("countryId") as string) || undefined;
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

    await prisma.location.upsert({
      where: {
        id,
      },
      create: {
        title,
        slug: slugify(title),
        status,
        alias,
        shortAddress,
        area,
        region,
        state,
        countryId,
        profileId: profile.id,
      },
      update: {
        title,
        slug: slugify(title),
        status,
        alias,
        shortAddress,
        area,
        region,
        state,
        countryId,
        profileId: profile.id,
      },
    });
    revalidatePath(`/profiles/${profile.id}/locations`);
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to upsert location" };
  }
}

export async function getAllLocations() {
  const locations = await prisma.location.findMany();
  return locations;
}

export async function getLatestLocations() {
  const locations = await prisma.location.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
  return locations;
}

export async function getLocationBySlug(slug: string) {
  const location = await prisma.location.findUnique({
    where: {
      slug,
    },
    include: {
      country: true,
    },
  });
  return location;
}

export async function getLocationByProfileId(profileId: string) {
  const location = await prisma.location.findUnique({
    where: {
      profileId,
    },
    include: {
      country: true,
    },
  });
  return location;
}

export async function getLocation() {
  const supabase = await createRouteHandlerClient({ cookies });
  const user = await supabase.auth.getUser();
  const location = await prisma.location.findFirst({
    where: {
      profileId: user.data.user?.user_metadata.profileId,
    },
    include: {
      country: true,
    },
  });
  return location;
}

export async function getLocationByProfileSlug(slug: string) {
  const location = await prisma.location.findFirst({
    where: {
      profile: {
        slug,
      },
    },
    include: {
      country: true,
    },
  });
  return location;
}

export async function searchLocations(keyword: string) {
  const locations = await prisma.location.findMany({
    where: {
      title: {
        contains: keyword,
        mode: "insensitive",
      },
    },
    include: {
      country: true,
    },
  });
  return locations;
}

export async function deleteLocationByProfileId(
  profileId: string,
  tx?: Prisma.TransactionClient
) {
  try {
    const prismaClient = tx || prisma;
    await prismaClient.location.deleteMany({
      where: {
        profileId,
      },
    });
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to delete location" };
  }
}

export async function deleteLocation(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    await prisma.location.delete({
      where: {
        id,
      },
    });
    revalidatePath("/locations");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to delete location" };
  }
}
