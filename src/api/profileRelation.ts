"use server";


import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";

export async function upsertProfileRelation(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const status = formData.get("status") === "on";
    const description = (formData.get("description") as string) || "NA";
    const name = (formData.get("name") as string) || undefined;
    const email = (formData.get("email") as string) || undefined;
    const phone = (formData.get("phone") as string) || undefined;
    const location = (formData.get("location") as string) || undefined;
    const rating = parseInt((formData.get("rating") as string) || "0");
    const profileSlug = (formData.get("profileId") as string) || undefined;

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

    await prisma.profileRelation.upsert({
      where: {
        id,
      },
      create: {
        description,
        name,
        email,
        phone,
        location,
        rating,
        profileId: profile.id,
        status,
      },
      update: {
        description,
        name,
        email,
        phone,
        location,
        rating,
        profileId: profile.id,
        status,
      },
    });
    revalidatePath("/profileRelation");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to upsert profileRelation" };
  }
}

export async function getAllProfileRelations(
  filter: { active: boolean } = { active: false }
) {
  const profileRelation = await prisma.profileRelation.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
  });
  return profileRelation;
}

export async function getProfileRelationsByProfileId(
  profileId: string,
  filter: { active: boolean } = { active: false }
) {
  const profileRelation = await prisma.profileRelation.findMany({
    where: {
      profileId,
      status: filter.active ? true : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileRelation;
}

export async function getProfileRelations(
  filter: { active: boolean } = { active: false }
) {
  const supabase = createRouteHandlerClient({ cookies });
  const user = await supabase.auth.getUser();
  const profileRelation = await prisma.profileRelation.findMany({
    where: {
      profileId: user.data.user?.user_metadata.profileId,
      status: filter.active ? true : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileRelation;
}

export async function getProfileRelationsByProfileSlug(
  slug: string,
  filter: { active: boolean } = { active: false }
) {
  const profileRelation = await prisma.profileRelation.findMany({
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
  return profileRelation;
}

export async function searchProfileRelations(
  profileId: string,
  keyword: string,
  filter: { active: boolean } = { active: false }
) {
  const profileRelation = await prisma.profileRelation.findMany({
    where: {
      profileId,
      name: {
        contains: keyword,
        mode: "insensitive",
      },
      status: filter.active ? true : undefined,
    },
  });
  return profileRelation;
}

export async function deleteProfileRelationByProfileId(
  profileId: string,
  tx?: Prisma.TransactionClient
) {
  const prismaClient = tx || prisma;
  await prismaClient.profileRelation.deleteMany({
    where: {
      profileId,
    },
  });
}

export async function deleteProfileRelation(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    await prisma.profileRelation.delete({
      where: {
        id,
      },
    });
    revalidatePath("/profileRelation");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to delete profileRelation" };
  }
}
