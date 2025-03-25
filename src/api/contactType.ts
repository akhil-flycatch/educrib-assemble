"use server";

import { revalidatePath } from "next/cache";

import { ROUTES } from "@/constants/route";
import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";
import { slugify } from "@/utils/string";

export async function upsertContactType(formData: FormData) {
  try{
    const id = formData.get("id") as string
    const title = (formData.get("title") as string) || "NA";
    const icon = (formData.get("icon") as string) || null;
    const thumbnail = (formData.get("thumbnail") as string) || null;
    const status = formData.get("status") === "on";
    
    await prisma.contactType.upsert({
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
    revalidatePath(ROUTES.CONTACT_TYPES);
  } catch(e: any){
    const {errMessage} = errorMessageGenerator(e);
    return {message: errMessage || "Failed to upsert contactType"}
  }
}

export async function getAllContactTypes(filter:{active:boolean} = {active:false}) {
  const contactTypes = await prisma.contactType.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
  });
  return contactTypes;
}

export async function getLatestContactTypes(filter:{active:boolean} = {active:false}) {
  const contactTypes = await prisma.contactType.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
  return contactTypes;
}

export async function getContactTypeBySlug(slug: string) {
  const contactType = await prisma.contactType.findUnique({
    where: {
      slug,
    },
  });
  return contactType;
}

export async function searchContactTypes(keyword: string, filter:{active:boolean} = {active:false}){
  const contactTypes = await prisma.contactType.findMany({
    where:{
      title:{
        contains: keyword,
        mode: "insensitive",
      },
      status: filter.active ? true : undefined,
    }
  })
  return contactTypes
}

export async function deleteContactType(formData: FormData) {
  try{
    const id = formData.get('id') as string;
    await prisma.contactType.delete({
      where: {
        id,
      },
    });
    revalidatePath("/contactTypes");
  } catch(e: any){
    const {errMessage} = errorMessageGenerator(e);
    return {message: errMessage || "Failed to delete contactType"}
  }
}
