"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function upsertProfileContact(formData: FormData) {
  console.log("entered formData", formData);
  try {
    const id = formData.get("id") as string;
    const title = (formData.get("title") as string) || "NA";

    const status = formData.get("status") === "on";
    const phone = (formData.get("phone") as string) || undefined;
    const email = (formData.get("email") as string) || undefined;
    const website = (formData.get("website") as string) || undefined;
    const contactTypeId =
      (formData.get("contactTypeId") as string) || undefined;
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
    console.log(">>>>>>>ehetre", profileSlug, profile);
    if (!profile) return { message: "profileSlug is invalid" };

    await prisma.profileContact.upsert({
      where: {
        id: id,
      },
      create: {
        title,
        status,
        phone,
        email,
        website,
        contactTypeId,
        profileId: profile.id,
      },
      update: {
        title,
        status,
        phone,
        email,
        website,
        contactTypeId,
        profileId: profile.id,
      },
    });
    revalidatePath("/profileContacts");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to upsert profileContact" };
  }
}

export async function getAllProfileContacts(
  filter: { active: boolean } = { active: false }
) {
  const profileContacts = await prisma.profileContact.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
  });
  return profileContacts;
}

export async function getProfileContactsByProfileId(
  profileId: string,
  filter: { active: boolean } = { active: false }
) {
  const profileContacts = await prisma.profileContact.findMany({
    where: {
      profileId,
      status: filter.active ? true : undefined,
    },
    include: {
      contactType: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileContacts;
}

export async function getProfileContactsByProfileSlug(
  slug: string,
  filter: { active: boolean } = { active: false }
) {
  const profileContacts = await prisma.profileContact.findMany({
    where: {
      profile: {
        slug,
      },
      status: filter.active ? true : undefined,
    },
    include: {
      contactType: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileContacts;
}

export async function getProfileContacts(
  filter: { active: boolean } = { active: false }
) {
  const supabase = createRouteHandlerClient({ cookies });
  const user = await supabase.auth.getUser();
  const profileContacts = await prisma.profileContact.findMany({
    where: {
      profileId: user.data.user?.user_metadata.profileId,
      status: filter.active ? true : undefined,
    },
    include: {
      contactType: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileContacts;
}

export async function searchProfileContacts(
  profileId: string,
  keyword: string,
  filter: { active: boolean } = { active: false }
) {
  const profileContacts = await prisma.profileContact.findMany({
    where: {
      profileId,
      title: {
        contains: keyword,
        mode: "insensitive",
      },
      status: filter.active ? true : undefined,
    },
    include: {
      contactType: true,
    },
  });
  return profileContacts;
}

export async function deleteProfileContactByProfileId(
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

export async function deleteProfileContact(id: string) {
  try {
    // const id = formData.get("id") as string;
    await prisma.profileContact.delete({
      where: {
        id,
      },
    });
    revalidatePath("/profileContacts");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to delete profileContact" };
  }
}
