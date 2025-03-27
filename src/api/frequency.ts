"use server";

import { revalidatePath } from "next/cache";

import { ROUTES } from "@/constants/route";
import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";
import { slugify } from "@/utils/string";

export async function upsertFrequency(formData: FormData) {
  try{
    const id = formData.get("id") as string
    const title = (formData.get("title") as string) || "NA";
    const icon = (formData.get("icon") as string) || null;
    const thumbnail = (formData.get("thumbnail") as string) || null;
    const status = formData.get("status") === "on";
    
    await prisma.frequency.upsert({
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
    revalidatePath("/frequencies");
  } catch(e: any){
    const {errMessage} = errorMessageGenerator(e);
    return {message: errMessage || "Failed to upsert frequency"}
  }
}

export async function getAllFrequencies(filter:{active:boolean} = {active:false}) {
  const frequencies = await prisma.frequency.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
  });
  return frequencies;
}

export async function getLatestFrequencies(filter:{active:boolean} = {active:false}) {
  const frequencies = await prisma.frequency.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
  return frequencies;
}

export async function getFrequencyBySlug(slug: string) {
  const frequency = await prisma.frequency.findUnique({
    where: {
      slug,
    },
  });
  return frequency;
}

export async function searchFrequencies(keyword: string, filter:{active:boolean} = {active:false}){
  const frequencies = await prisma.frequency.findMany({
    where:{
      title:{
        contains: keyword,
        mode: "insensitive",
      },
      status: filter.active ? true : undefined,
    }
  })
  return frequencies
}

export async function deleteFrequency(formData: FormData) {
  try{
    const id = formData.get('id') as string;
    await prisma.frequency.delete({
      where: {
        id,
      },
    });
    revalidatePath(ROUTES.FREQUENCIES);
  } catch(e: any){
    const {errMessage} = errorMessageGenerator(e);
    return {message: errMessage || "Failed to delete frequency"}
  }
}
