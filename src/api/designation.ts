"use server";

import { revalidatePath } from "next/cache";

import { ROUTES } from "@/constants/route";
import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";
import { slugify } from "@/utils/string";

export async function upsertDesignation(formData: FormData) {
  try{
    const id = formData.get("id") as string
    const title = (formData.get("title") as string) || "NA";
    const icon = (formData.get("icon") as string) || null;
    const thumbnail = (formData.get("thumbnail") as string) || null;
    const status = formData.get("status") === "on";
    
    await prisma.designation.upsert({
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
    revalidatePath("/designations");
  } catch(e: any){
    const {errMessage} = errorMessageGenerator(e);
    return {message: errMessage || "Failed to upsert designation"}
  }
}

export async function getAllDesignations(filter:{active:boolean} = {active:false}) {
  const designations = await prisma.designation.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
  });
  return designations;
}

export async function getLatestDesignations(filter:{active:boolean} = {active:false}) {
  const designations = await prisma.designation.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
  return designations;
}

export async function getDesignationBySlug(slug: string) {
  const designation = await prisma.designation.findUnique({
    where: {
      slug,
    },
  });
  return designation;
}

export async function searchDesignations(keyword: string, filter:{active:boolean} = {active:false}){
  const designations = await prisma.designation.findMany({
    where:{
      title:{
        contains: keyword,
        mode: "insensitive",
      },
      status: filter.active ? true : undefined,
    }
  })
  return designations
}

export async function deleteDesignation(formData: FormData) {
  try{
    const id = formData.get('id') as string;
    await prisma.designation.delete({
      where: {
        id,
      },
    });
    revalidatePath(ROUTES.DESIGNATIONS);
  } catch(e: any){
    const {errMessage} = errorMessageGenerator(e);
    return {message: errMessage || "Failed to delete designation"}
  }
}
