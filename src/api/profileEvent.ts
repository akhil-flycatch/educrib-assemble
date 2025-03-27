"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";
import { slugify } from "@/utils/string";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import {
  createMultipleProfileEventTicket,
  deleteProfileEventTicketByEventId,
} from ".";

export async function upsertProfileEvent(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const status = formData.get("status") === "on";
    const profileSlug = (formData.get("profileId") as string) || undefined;
    const title = (formData.get("title") as string) || "NA";
    const description = (formData.get("description") as string) || undefined;
    const avatar = (formData.get("avatar") as string) || null;
    const thumbnail = (formData.get("thumbnail") as string) || null;
    const location = (formData.get("location") as string) || undefined;
    const startDate = (formData.get("startDate") as string) || undefined;
    const endDate = (formData.get("endDate") as string) || undefined;
    const website = (formData.get("website") as string) || undefined;
    const typeId = (formData.get("typeId") as string) || undefined;
    const categoryId = (formData.get("categoryId") as string) || undefined;
    const featured = formData.get("featured") === "on";
    const recommended = formData.get("recommended") === "on";
    const verified = formData.get("verified") === "on";
    const published = formData.get("published") === "on";
    const views = parseInt(formData.get("views") as string) || undefined;
    const profileEventTickets =
      JSON.parse(formData.get("profileEventTickets") as string) || [];

    const convertedStartDate = startDate
      ? new Date(startDate).toISOString()
      : undefined;
    const convertedEndDate = endDate
      ? new Date(endDate).toISOString()
      : undefined;

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

    await prisma.$transaction(async (tx) => {
      const profileEvent = await tx.profileEvent.upsert({
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
          startDate: convertedStartDate,
          endDate: convertedEndDate,
          website,
          typeId,
          categoryId,
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
          startDate: convertedStartDate,
          endDate: convertedEndDate,
          website,
          typeId,
          categoryId,
          featured,
          recommended,
          verified,
          published,
          views,
          status,
        },
      });

      const profileEventTicketObjects: Prisma.profileEventTicketCreateInput[] =
        profileEventTickets.map((profileEventTicket: any) => {
          return {
            profileEventId: profileEvent.id,
            title: profileEventTicket.title,
            amount: parseFloat(profileEventTicket.amount),
            currencyId: profileEventTicket.currencyId,
          };
        });

      await deleteProfileEventTicketByEventId(id, { tx });
      await createMultipleProfileEventTicket(profileEventTicketObjects, { tx });
    });

    revalidatePath("/profileEvent");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to upsert profileEvent" };
  }
}

export async function getAllProfileEvents(
  filter: { active: boolean } = { active: false }
) {
  const profileEvents = await prisma.profileEvent.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
  });
  return profileEvents;
}

export async function getProfileEventsByProfileId(
  profileId: string,
  filter: { active: boolean } = { active: false }
) {
  const profileEvents = await prisma.profileEvent.findMany({
    where: {
      profileId,
      status: filter.active ? true : undefined,
    },
    include: {
      type: true,
      category: true,
      profileEventTickets: { include: { currency: true } },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileEvents;
}

export async function getProfileEventsByProfileSlug(
  slug: string,
  filter: { active: boolean } = { active: false }
) {
  const profileEvents = await prisma.profileEvent.findMany({
    where: {
      profile: {
        slug,
      },
      status: filter.active ? true : undefined,
    },
    include: {
      type: true,
      category: true,
      profileEventTickets: { include: { currency: true } },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileEvents;
}

export async function getProfileEvents(
  filter: { active: boolean } = { active: false }
) {
  const supabase = createRouteHandlerClient({ cookies });
  const user = await supabase.auth.getUser();
  const profileEvents = await prisma.profileEvent.findMany({
    where: {
      profileId: user.data.user?.user_metadata.profileId,
      status: filter.active ? true : undefined,
    },
    include: {
      type: true,
      category: true,
      profileEventTickets: { include: { currency: true } },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileEvents;
}

export async function getProfileEventById(id: string) {
  const profileEvent = await prisma.profileEvent.findUnique({
    where: {
      id,
    },
    include: {
      type: true,
      category: true,
    },
  });
  return profileEvent;
}

export async function searchProfileEvents(
  profileId: string,
  keyword: string,
  filter: { active: boolean } = { active: false }
) {
  const profileEvents = await prisma.profileEvent.findMany({
    where: {
      profileId,
      title: {
        contains: keyword,
        mode: "insensitive",
      },
      status: filter.active ? true : undefined,
    },
    include: {
      type: true,
      category: true,
    },
  });
  return profileEvents;
}

export async function updataImageToProfileEvent(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const images =
      JSON.parse(formData.get("profileImages") as string) || undefined;

    await prisma.profileEvent.update({
      where: {
        id,
      },
      data: {
        images,
      },
    });
    revalidatePath("/profileEvent");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to update images" };
  }
}

export async function deleteProfileEventByProfileId(
  profileId: string,
  tx?: Prisma.TransactionClient
) {
  const prismaClient = tx || prisma;
  await prismaClient.profileEvent.deleteMany({
    where: {
      profileId,
    },
  });
}

export async function deleteProfileEvent(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    await prisma.profileEvent.delete({
      where: {
        id,
      },
    });
    revalidatePath("/profileEvent");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to delete profileEvent" };
  }
}
