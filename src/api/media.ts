"use server";

import { revalidatePath } from "next/cache";

import { ROUTES } from "@/constants/route";
import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";
import { slugify } from "@/utils/string";

export async function upsertMedia(formData: FormData) {
  try{
    const id = formData.get("id") as string
    const title = (formData.get("title") as string) || "NA";
    const icon = (formData.get("icon") as string) || null;
    const thumbnail = (formData.get("thumbnail") as string) || null;
    const status = formData.get("status") === "on";

    await prisma.media.upsert({
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
    revalidatePath("/media");
  } catch(e: any){
    const {errMessage} = errorMessageGenerator(e);
    return {message: errMessage || "Failed to upsert media"}
  }
}

export async function getAllMedia(filter:{active:boolean} = {active:false}) {
  const media = await prisma.media.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
  });
  return media;
}

export async function getLatestMedia(filter:{active:boolean} = {active:false}) {
  const media = await prisma.media.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
  return media;
}

export async function getMediaBySlug(slug: string) {
  const media = await prisma.media.findUnique({
    where: {
      slug,
    },
  });
  return media;
}

export async function searchMedia(keyword: string, filter:{active:boolean} = {active:false}){
  const media = await prisma.media.findMany({
    where:{
      title:{
        contains: keyword,
        mode: "insensitive",
      },
      status: filter.active ? true : undefined,
    }
  })
  return media
}

export async function deleteMedia(formData: FormData) {
  try{
    const id = formData.get('id') as string;
    await prisma.media.delete({
      where: {
        id,
      },
    });
    revalidatePath(ROUTES.MEDIA);
  } catch(e: any){
    const {errMessage} = errorMessageGenerator(e);
    return {message: errMessage || "Failed to delete media"}
  }
}
