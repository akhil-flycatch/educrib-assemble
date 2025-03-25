"use server";

import { revalidatePath } from "next/cache";

import { ROUTES } from "@/constants/route";
import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";
import { slugify } from "@/utils/string";

export async function upsertCourse(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const title = (formData.get("title") as string) || "NA";
    const icon = (formData.get("icon") as string) || null;
    const thumbnail = (formData.get("thumbnail") as string) || null;
    const description = (formData.get("description") as string) || undefined;
    const link = (formData.get("link") as string) || undefined;
    const status = formData.get("status") === "on";

    await prisma.course.upsert({
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
    revalidatePath(ROUTES.COURSES);
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to upsert course" };
  }
}



export async function getAllCourses(
  filter: { active: boolean } = { active: false }
) {
  const courses = await prisma.course.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
  });
  return courses;
}

export async function getLatestCourses(
  filter: { active: boolean } = { active: false }
) {
  const courses = await prisma.course.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
  return courses;
}

export async function getCourseBySlug(slug: string) {
  const course = await prisma.course.findUnique({
    where: {
      slug,
    },
  });
  return course;
}

export async function getCourseById(id: string) {
  const course = await prisma.course.findUnique({
    where: {
      id,
    },
  });
  return course;
}

export async function searchCourse(
  keyword: string,
  filter: { active: boolean } = { active: false }
) {
  const courses = await prisma.course.findMany({
    where: {
      title: {
        contains: keyword,
        mode: "insensitive",
      },
      status: filter.active ? true : undefined,
    },
  });
  return courses;
}

export async function deleteCourse(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    await prisma.course.delete({
      where: {
        id,
      },
    });
    revalidatePath("/courses");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to delete course" };
  }
}
