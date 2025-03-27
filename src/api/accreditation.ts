"use server"

import { revalidatePath } from "next/cache";

import { ROUTES } from "@/constants/route";
import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";
import { slugify } from "@/utils/string";

export async function upsertAccreditation(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const title = (formData.get("title") as string) || "NA";
    const icon = (formData.get("icon") as string) || null;
    const thumbnail = (formData.get("thumbnail") as string) || null;
    const description = (formData.get("description") as string) || undefined;
    const link = (formData.get("link") as string) || undefined;
    const status = formData.get("status") === "on";

    await prisma.accreditation.upsert({
      where: {
        id,
      },
      create: {
        title,
        slug: slugify(title),
        icon,
        thumbnail,
        description,
        link,
        status,
      },
      update: {
        title,
        slug: slugify(title),
        icon,
        thumbnail,
        description,
        link,
        status,
      },
    });
    revalidatePath("/accreditations");
  } catch (e: any) {
    const {errMessage} = errorMessageGenerator(e);
    return { message: errMessage || "Failed to upsert accreditation" };
  }
}

export async function getAllAccreditations(filter:{active:boolean} = {active:false}) {
  const accreditations = await prisma.accreditation.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
  });
  return accreditations;
}

export async function getLatestAccreditations(filter:{active:boolean} = {active:false}) {
  const accreditations = await prisma.accreditation.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
  return accreditations;
}

export async function getAccreditationsBySlug(slug: string) {
  const accreditation = await prisma.accreditation.findUnique({
    where: {
      slug,
    },
  });
  return accreditation;
}

export async function searchAccreditations(keyword: string, filter:{active:boolean} = {active:false}) {
  const accreditations = await prisma.accreditation.findMany({
    where: {
      title: {
        contains: keyword,
        mode: "insensitive",
      },
      status: filter.active ? true : undefined,
    },
  });
  return accreditations;
}

export async function deleteAccreditation(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    await prisma.accreditation.delete({
      where: {
        id,
      },
    });
    revalidatePath(ROUTES.ACCREDITATIONS);
  } catch (e: any) {
    const {errMessage} = errorMessageGenerator(e);
    return { message: errMessage || "Failed to delete accreditation" };
  }
}
