"use server";

import { revalidatePath } from "next/cache";

import { ROUTES } from "@/constants/route";
import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";
import { slugify } from "@/utils/string";

export async function upsertIntake(formData: FormData) {
  try{
    const id = formData.get("id") as string
    const title = (formData.get("title") as string) || "NA";
    const icon = (formData.get("icon") as string) || null;
    const thumbnail = (formData.get("thumbnail") as string) || null;
    const status = formData.get("status") === "on";
    
    await prisma.intake.upsert({
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
    revalidatePath("/intakes");
  } catch(e: any){
    const {errMessage} = errorMessageGenerator(e);
    return {message: errMessage || "Failed to upsert intake"}
  }
}

export async function getAllIntakes(filter:{active:boolean} = {active:false}) {
  const intakes = await prisma.intake.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
  });
  return intakes;
}

export async function getLatestIntakes(filter:{active:boolean} = {active:false}) {
  const intakes = await prisma.intake.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
  return intakes;
}

export async function getIntakeBySlug(slug: string) {
  const intake = await prisma.intake.findUnique({
    where: {
      slug,
    },
  });
  return intake;
}

export async function getIntakeById(id: string) {
  const intake = await prisma.intake.findUnique({
    where: {
      id,
    },
  });
  return intake;
}

export async function searchIntakes(keyword: string,filter:{active:boolean} = {active:false}){
  const intakes = await prisma.intake.findMany({
    where:{
      title:{
        contains: keyword,
        mode: "insensitive",
      },
      status: filter.active ? true : undefined,
    }
  })
  return intakes
}

export async function deleteIntake(formData: FormData) {
  try{
    const id = formData.get('id') as string;
    await prisma.intake.delete({
      where: {
        id,
      },
    });
    revalidatePath(ROUTES.COURSE_INTAKES);
  } catch(e: any){
    const {errMessage} = errorMessageGenerator(e);
    return {message: errMessage || "Failed to delete intake"}
  }
}
