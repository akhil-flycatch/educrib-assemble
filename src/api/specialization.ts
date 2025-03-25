"use server"

import { revalidatePath } from "next/cache";

import { ROUTES } from "@/constants/route";
import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";
import { slugify } from "@/utils/string";

export async function upsertSpecialization(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const title = (formData.get("title") as string) || "NA";
    const icon = (formData.get("icon") as string) || null;
    const thumbnail = (formData.get("thumbnail") as string) || null;
    const description = (formData.get("description") as string) || undefined;
    const link = (formData.get("link") as string) || undefined;
    const status = formData.get("status") === "on";

    await prisma.specialization.upsert({
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
    revalidatePath("/specializations");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to upsert specialization" };
  }
}

export async function getAllSpecializations(filter:{active:boolean} = {active:false}) {
  const specializations = await prisma.specialization.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
  });
  return specializations;
}

export async function getLatestSpecializations(filter:{active:boolean} = {active:false}) {
  const specializations = await prisma.specialization.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
  return specializations;
}

export async function getSpecializationBySlug(slug: string) {
  const specialization = await prisma.specialization.findUnique({
    where: {
      slug,
    },
  });
  return specialization;
}

export async function getSpecializationById(id: string) {
  const specialization = await prisma.specialization.findUnique({
    where: {
      id,
    },
  });
  return specialization;
}

export async function searchSpecialization(keyword: string, filter:{active:boolean} = {active:false}) {
  const specializations = await prisma.specialization.findMany({
    where: {
      title: {
        contains: keyword,
        mode: "insensitive",
      },
      status: filter.active ? true : undefined,
    },
  });
  return specializations;
}

export async function deleteSpecialization(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    await prisma.specialization.delete({
      where: {
        id,
      },
    });
    revalidatePath(ROUTES.SPECIALIZATIONS);
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to delete specialization" };
  }
}
