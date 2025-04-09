"use server";


import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function upsertProfileMedia(formData: FormData) {
  try {
    const id = formData.get("id") as string || undefined;
    const status = formData.get("status") === "on";
    const link = (formData.get("link") as string) || undefined;
    const profileSlug = (formData.get("profileId") as string);
    const mediaId = (formData.get("mediaId") as string) || undefined;
    const isSocialLink = formData.get("isSocialLink") as string || undefined;
    const ismediaVideoType = formData.get("ismediaVideoType") as string || undefined;
    

    // Step 1: Check if the profile and media entry already exists
    const existingProfileMedia = await prisma.profileMedia.findFirst({
      where: {
        profileId: profileSlug,
        mediaId: mediaId,  // Ensure the combination of profileId and mediaId is unique
      },
    });

    if (existingProfileMedia) {
      // Step 2: If the entry exists, update it
      await prisma.profileMedia.update({
        where: {
          id: existingProfileMedia.id,  // Use the existing ID for update
        },
        data: {
          link,
          status,
          isSocialLink: isSocialLink === "true",
          ismediaVideoType: ismediaVideoType === "true",
        },
      });
    } else {
      // Step 3: If no entry exists, create a new one
      await prisma.profileMedia.create({
        data: {
          link,
          profileId: profileSlug,
          mediaId,
          isSocialLink: isSocialLink === "true",
          ismediaVideoType: ismediaVideoType === "true",
          status,
        },
      });
    }

    // Revalidate the path to ensure the data is updated
    revalidatePath("/profileMedia");

  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Prisma Known Request Error');
      console.error('Error Code:', e.code);
      console.error('Error Message:', e.message);
      console.error('Error Meta:', e.meta);  // This will include details like unique constraint errors
      return { message: e.message || "Failed to upsert profileMedia" };
    } else if (e instanceof Prisma.PrismaClientUnknownRequestError) {
      console.error('Prisma Unknown Request Error');
      console.error('Error Message:', e.message);
    } else if (e instanceof TypeError) {
      console.error('Type Error:', e.message);
    } else {
      console.error('Unexpected Error:', e);
    }
  }
}

export async function getAllProfileMedias(
  filter: { active: boolean } = { active: false }
) {
  const profileMedia = await prisma.profileMedia.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
  });
  return profileMedia;
}

export async function getProfileMediasByProfileId(
  profileId?: string,
  filter: { active: boolean } = { active: false }
) {
   const supabase = await createRouteHandlerClient({ cookies });
    const user = await supabase.auth.getUser();
  const profileMedia = await prisma.profileMedia.findMany({
    where: {
      profileId: user.data.user?.user_metadata.profileId,
      status: filter.active ? true : undefined,
    },
    include: {
      media: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileMedia;
}

export async function getProfileMedias(
  filter: { active: boolean } = { active: false }
) {
  const supabase = createRouteHandlerClient({ cookies });
  const user = await supabase.auth.getUser();
  const profileMedia = await prisma.profileMedia.findMany({
    where: {
      profileId: user.data.user?.user_metadata.profileId,
      status: filter.active ? true : undefined,
    },
    include: {
      media: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileMedia;
}

export async function getProfileMediasByProfileSlug(
  slug: string,
  filter: { active: boolean } = { active: false }
) {
  const profileMedia = await prisma.profileMedia.findMany({
    where: {
      profile: {
        slug,
      },
      status: filter.active ? true : undefined,
    },
    include: {
      media: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileMedia;
}

export async function searchProfileMedias(
  profileId: string,
  keyword: string,
  filter: { active: boolean } = { active: false }
) {
  const profileMedia = await prisma.profileMedia.findMany({
    where: {
      profileId,
      status: filter.active ? true : undefined,
      media: {
        title: {
          contains: keyword,
          mode: "insensitive",
        },
      },
    },
    include: {
      media: true,
    },
  });
  return profileMedia;
}

export async function deleteProfileMediaByProfileId(
  profileId: string,
  tx?: Prisma.TransactionClient
) {
  const prismaClient = tx || prisma;
  await prismaClient.profileMedia.deleteMany({
    where: {
      profileId,
    },
  });
}

export async function deleteProfileMedia(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    await prisma.profileMedia.delete({
      where: {
        id,
      },
    });
    revalidatePath("/profileMedia");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to delete profileMedia" };
  }
}
