"use server";

import { revalidatePath } from "next/cache";

import { ROUTES } from "@/constants/route";
import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";
import { slugify } from "@/utils/string";

export async function upsertUniversity(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const title = (formData.get("title") as string) || "NA";
    const icon = (formData.get("icon") as string) || null;
    const thumbnail = (formData.get("thumbnail") as string) || null;
    const description = (formData.get("description") as string) || undefined;
    const link = (formData.get("link") as string) || undefined;
    const status = formData.get("status") === "on";

    await prisma.university.upsert({
      where: {
        id,
      },
      create: {
        title,
        slug: slugify(title),
        icon,
        thumbnail,
        status,
        description,
        link,
      },
      update: {
        title,
        slug: slugify(title),
        icon,
        thumbnail,
        status,
        description,
        link,
      },
    });
    revalidatePath("/universities");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to upsert university" };
  }
}

export async function getAllUniversities(filter:{active:boolean} = {active:false}) {
  const universities = await prisma.university.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
  });
  return universities;
}

export async function getLatestUniversities(filter:{active:boolean} = {active:false}) {
  const universities = await prisma.university.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
  return universities;
}

export async function getUniversityBySlug(slug: string) {
  const university = await prisma.university.findUnique({
    where: {
      slug,
    },
  });
  return university;
}

export async function searchUniversities(keyword: string, filter:{active:boolean} = {active:false}) {
  const universities = await prisma.university.findMany({
    where: {
      title: {
        contains: keyword,
        mode: "insensitive",
      },
      status: filter.active ? true : undefined,
    },
  });
  return universities;
}

export async function deleteUniversity(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    await prisma.university.delete({
      where: {
        id,
      },
    });
    revalidatePath(ROUTES.UNIVERSITIES);
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to delete university", errorMessage: e.message };
  }
}
