"use server";

import { revalidatePath } from "next/cache";

import { ROUTES } from "@/constants/route";
import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";
import { slugify } from "@/utils/string";

export async function upsertSocial(formData: FormData) {
  try{
    const id = formData.get("id") as string
    const title = (formData.get("title") as string) || "NA";
    const icon = (formData.get("icon") as string) || null;
    const thumbnail = (formData.get("thumbnail") as string) || null;
    const status = formData.get("status") === "on";
    
    await prisma.social.upsert({
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
    revalidatePath("/socials");
  } catch(e: any){
    const {errMessage} = errorMessageGenerator(e);
    return {message: errMessage || "Failed to upsert social"}
  }
}

export async function getAllSocials(filter:{active:boolean} = {active:false}) {
  const socials = await prisma.social.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
  });
  return socials;
}

export async function getLatestSocials(filter:{active:boolean} = {active:false}) {
  const socials = await prisma.social.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
  return socials;
}

export async function getSocialBySlug(slug: string) {
  const social = await prisma.social.findUnique({
    where: {
      slug,
    },
  });
  return social;
}

export async function searchSocials(keyword: string,  filter:{active:boolean} = {active:false}){
  const socials = await prisma.social.findMany({
    where:{
      title:{
        contains: keyword,
        mode: "insensitive",
      },
      status: filter.active ? true : undefined,
    }
  })
  return socials
}

export async function deleteSocial(formData: FormData) {
  try{
    const id = formData.get('id') as string;
    await prisma.social.delete({
      where: {
        id,
      },
    });
    revalidatePath(ROUTES.SOCIALS);
  } catch(e: any){
    const {errMessage} = errorMessageGenerator(e);
    return {message: errMessage || "Failed to delete social"}
  }
}
