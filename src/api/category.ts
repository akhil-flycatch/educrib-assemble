"use server";

import { revalidatePath } from "next/cache";

import { ROUTES } from "@/constants/route";
import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";
import { slugify } from "@/utils/string";

export async function upsertCategory(formData: FormData) {
  try{
    const id = formData.get("id") as string
    const title = (formData.get("title") as string) || "NA";
    const icon = (formData.get("icon") as string) || null;
    const thumbnail = (formData.get("thumbnail") as string) || null;
    const status = formData.get("status")  === "on";
    const verticalId = (formData.get("verticalId") as string) || undefined;
    
    await prisma.category.upsert({
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
    revalidatePath(ROUTES.CATEGORIES);
  } catch(e: any){
    const {errMessage} = errorMessageGenerator(e);
    return {message: errMessage || "Failed to upsert category"}
  }
}

export async function getAllCategories(filter:{active:boolean} = {active:false}) {
  const categories = await prisma.category.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
  });
  return categories;
}

export async function getLatestCategories(filter:{active:boolean} = {active:false}) {
  const categories = await prisma.category.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
  return categories;
}

export async function getCategoryBySlug(slug: string) {
  const category = await prisma.category.findUnique({
    where: {
      slug,
    },
  });
  return category;
}

export async function searchCategories(keyword: string, filter:{active:boolean} = {active:false}){
  const categories = await prisma.category.findMany({
    where:{
      title:{
        contains: keyword,
        mode: "insensitive",
      },
      status: filter.active ? true : undefined,
    },
  });
  return categories
}

export async function deleteCategory(formData: FormData) {
  try{
    const id = formData.get("id") as string
    await prisma.category.delete({
      where:{
        id,
      },
    });
    revalidatePath("/categories");
  } catch(e: any){
    const {errMessage} = errorMessageGenerator(e);
    return {message: errMessage || "Failed to delete category"}
  }
}
