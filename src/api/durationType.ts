"use server";

import { revalidatePath } from "next/cache";

import { ROUTES } from "@/constants/route";
import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";
import { slugify } from "@/utils/string";

export async function upsertDurationType(formData: FormData) {
  try{
    const id = formData.get("id") as string
    const title = (formData.get("title") as string) || "NA";
    const icon = (formData.get("icon") as string) || null;
    const thumbnail = (formData.get("thumbnail") as string) || null;
    const status = formData.get("status") === "on";
    
    await prisma.durationType.upsert({
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
    revalidatePath("/durationTypes");
  } catch(e: any){
    const {errMessage} = errorMessageGenerator(e);
    return {message: errMessage || "Failed to upsert durationType"}
  }
}

export async function getAllDurationTypes(filter:{active:boolean} = {active:false}) {
  const durationTypes = await prisma.durationType.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
  });
  return durationTypes;
}

export async function getLatestDurationTypes(filter:{active:boolean} = {active:false}) {
  const durationTypes = await prisma.durationType.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
  return durationTypes;
}

export async function getDurationTypeBySlug(slug: string) {
  const durationType = await prisma.durationType.findUnique({
    where: {
      slug,
    },
  });
  return durationType;
}

export async function getDurationTypeById(id: string) {
  const durationType = await prisma.durationType.findUnique({
    where: {
      id,
    },
  });
  return durationType;
}

export async function searchDurationTypes(keyword: string, filter:{active:boolean} = {active:false}){
  const durationTypes = await prisma.durationType.findMany({
    where:{
      title:{
        contains: keyword,
        mode: "insensitive",
      },
      status: filter.active ? true : undefined,
    }
  })
  return durationTypes
}

export async function deleteDurationType(formData: FormData) {
  try{
    const id = formData.get('id') as string;
    await prisma.durationType.delete({
      where: {
        id,
      },
    });
    revalidatePath(ROUTES.DURATION_TYPES);
  } catch(e: any){
    const {errMessage} = errorMessageGenerator(e);
    return {message: errMessage || "Failed to delete durationType"}
  }
}
