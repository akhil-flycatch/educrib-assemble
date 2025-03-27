"use server";

import { revalidatePath } from "next/cache";

import { ROUTES } from "@/constants/route";
import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";
import { slugify } from "@/utils/string";

export async function upsertLevel(formData: FormData) {
  try{
    const id = formData.get("id") as string
    const title = (formData.get("title") as string) || "NA";
    const icon = (formData.get("icon") as string) || null;
    const thumbnail = (formData.get("thumbnail") as string) || null;
    const status = formData.get("status") === "on";

    await prisma.level.upsert({
      where:{
        id,
      },
      create: {
        title,
        slug: slugify(title),
        icon,
        thumbnail,
        status,
      },
      update:{
        title,
        slug: slugify(title),
        icon,
        thumbnail,
        status,
      }
    });
    revalidatePath("/levels");
  } catch(e: any){
    const {errMessage} = errorMessageGenerator(e);
    return {message: errMessage || "Failed to upsert level"}
  }
}

export async function getAllLevels(filter:{active:boolean} = {active:false}) {
  const levels = await prisma.level.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
  });
  return levels;
}

export async function getLatestLevels(filter:{active:boolean} = {active:false}) {
  const levels = await prisma.level.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
  return levels;
}

export async function getLevelBySlug(slug: string) {
  const level = await prisma.level.findUnique({
    where: {
      slug,
    },
  });
  return level;
}

export async function getLevelById(id: string) {
  const level = await prisma.level.findUnique({
    where: {
      id,
    },
  });
  return level;
}

export async function searchLevels(keyword: string, filter:{active:boolean} = {active:false}){
  const levels = await prisma.level.findMany({
    where:{
      title:{
        contains: keyword,
        mode: "insensitive",
      },
      status: filter.active ? true : undefined,
    }
  })
  return levels
}

export async function deleteLevel(formData: FormData) {
  try{
    const id = formData.get('id') as string;
    await prisma.level.delete({
      where: {
        id,
      },
    });
    revalidatePath(ROUTES.COURSE_LEVELS);
  } catch(e: any){
    const {errMessage} = errorMessageGenerator(e);
    return {message: errMessage || "Failed to delete level"}
  }
}
