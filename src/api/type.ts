"use server";

import { revalidatePath } from "next/cache";

import { ROUTES } from "@/constants/route";
import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";
import { slugify } from "@/utils/string";

export async function upsertType(formData: FormData) {
  try{
    const id = formData.get("id") as string
    const title = (formData.get("title") as string) || "NA";
    const icon = (formData.get("icon") as string) || null;
    const thumbnail = (formData.get("thumbnail") as string) || null;
    const status = formData.get("status") === "on";
    const verticalId = (formData.get("verticalId") as string) || undefined;
    
    await prisma.type.upsert({
      where:{
        id,
      },
      create: {
        title,
        slug: slugify(title),
        icon,
        thumbnail,
        status,
        verticalId,
      },
      update:{
        title,
        slug: slugify(title),
        icon,
        thumbnail,
        status,
        verticalId,
      }
    });
    revalidatePath("/types");
  } catch (e: any) {
    const {errMessage} = errorMessageGenerator(e);
    return { message: errMessage || "Failed to upsert type" };
  }
}

export async function getAllTypes(filter:{active:boolean} = {active:false}) {
  const types = await prisma.type.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
  });
  return types;
}

export async function getLatestTypes(filter:{active:boolean} = {active:false}) {
  const types = await prisma.type.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
  return types;
}

export async function getTypeBySlug(slug: string) {
  const type = await prisma.type.findUnique({
    where: {
      slug,
    },
  });
  return type;
}

export async function searchTypes(keyword: string, filter:{active:boolean} = {active:false}){
  const types = await prisma.type.findMany({
    where:{
      title:{
        contains: keyword,
        mode: "insensitive",
      },
      status: filter.active ? true : undefined,
    }
  })
  return types
}

export async function deleteType(formData: FormData) {
  try{
    const id = formData.get('id') as string;
    await prisma.type.delete({
      where: {
        id,
      },
    });
    revalidatePath(ROUTES.TYPES);
  } catch (e: any) {
    const {errMessage} = errorMessageGenerator(e);
    return { message: errMessage || "Failed to delete type" };
  }
}
