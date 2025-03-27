"use server";

import { revalidatePath } from "next/cache";

import { ROUTES } from "@/constants/route";
import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";
import { slugify } from "@/utils/string";

export async function upsertManagement(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const title = (formData.get("title") as string) || "NA";
    const icon = (formData.get("icon") as string) || null;
    const thumbnail = (formData.get("thumbnail") as string) || null;
    const description = (formData.get("description") as string) || undefined;
    const link = (formData.get("link") as string) || undefined;
    const status = formData.get("status") === "on";

    await prisma.management.upsert({
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
    revalidatePath("/managements");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to upsert management" };
  }
}

export async function getAllManagements(
  filter: { active: boolean } = { active: false }
) {
  const managements = await prisma.management.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
  });
  return managements;
}

export async function getLatestManagements(
  filter: { active: boolean } = { active: false }
) {
  const managements = await prisma.management.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
  return managements;
}

export async function getManagementBySlug(slug: string) {
  const management = await prisma.management.findUnique({
    where: {
      slug,
    },
  });
  return management;
}

export async function searchManagement(
  keyword: string,
  filter: { active: boolean } = { active: false }
) {
  const managements = await prisma.management.findMany({
    where: {
      title: {
        contains: keyword,
        mode: "insensitive",
      },
      status: filter.active ? true : undefined,
    },
  });
  return managements;
}

export async function deleteManagement(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    await prisma.management.delete({
      where: {
        id,
      },
    });
    revalidatePath(ROUTES.MANAGEMENETS);
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to delete management" };
  }
}
