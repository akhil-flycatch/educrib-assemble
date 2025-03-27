"use server";

import { revalidatePath } from "next/cache";

import { ROUTES } from "@/constants/route";
import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";
import { slugify } from "@/utils/string";

export async function upsertCurriculum(formData: FormData) {
  try{
    const id = formData.get("id") as string
    const title = (formData.get("title") as string) || "NA";
    const icon = (formData.get("icon") as string) || null;
    const thumbnail = (formData.get("thumbnail") as string) || null;
    const status = formData.get("status") === "on";
    
    await prisma.curriculum.upsert({
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
    revalidatePath("/curriculums");
  } catch(e: any){
    const {errMessage} = errorMessageGenerator(e);
    return {message: errMessage || "Failed to upsert curriculum"}
  }
}

export async function getAllCurriculums(filter:{active:boolean} = {active:false}) {
  const curriculums = await prisma.curriculum.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
  });
  return curriculums;
}

export async function getLatestCurriculums(filter:{active:boolean} = {active:false}) {
  const curriculums = await prisma.curriculum.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
  return curriculums;
}

export async function getCurriculumBySlug(slug: string) {
  const curriculum = await prisma.curriculum.findUnique({
    where: {
      slug,
    },
  });
  return curriculum;
}

export async function searchCurriculums(keyword: string, filter:{active:boolean} = {active:false}){
  const curriculums = await prisma.curriculum.findMany({
    where:{
      title:{
        contains: keyword,
        mode: "insensitive",
      },
      status: filter.active ? true : undefined,
    }
  })
  return curriculums
}

export async function deleteCurriculum(formData: FormData) {
  try{
    const id = formData.get('id') as string;
    await prisma.curriculum.delete({
      where: {
        id,
      },
    });
    revalidatePath(ROUTES.CURRICULUMS);
  } catch(e: any){
    const {errMessage} = errorMessageGenerator(e);
    return {message: errMessage || "Failed to delete curriculum"}
  }
}
