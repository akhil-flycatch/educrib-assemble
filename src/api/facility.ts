"use server";

import { revalidatePath } from "next/cache";

import { ROUTES } from "@/constants/route";
import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";
import { slugify } from "@/utils/string";

export async function upsertFacility(formData: FormData) {
  try{
    const id = formData.get("id") as string
    const title = (formData.get("title") as string) || "NA";
    const icon = (formData.get("icon") as string) || null;
    const thumbnail = (formData.get("thumbnail") as string) || null;
    const status = formData.get("status") === "on";
    
    await prisma.facility.upsert({
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
    revalidatePath("/facilities");
  } catch(e: any){
    const {errMessage} = errorMessageGenerator(e);
    return {message: errMessage || "Failed to upsert facility"}
  }
}

export async function getAllFacilities(filter:{active:boolean} = {active:false}) {
  const facilities = await prisma.facility.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
  });
  return facilities;
}

export async function getLatestFacilities(filter:{active:boolean} = {active:false}) {
  const facilities = await prisma.facility.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
  return facilities;
}

export async function getFacilityBySlug(slug: string) {
  const facility = await prisma.facility.findUnique({
    where: {
      slug,
    },
  });
  return facility;
}

export async function searchFacilities(keyword: string, filter:{active:boolean} = {active:false}){
  const facilities = await prisma.facility.findMany({
    where:{
      title:{
        contains: keyword,
        mode: "insensitive",
      },
      status: filter.active ? true : undefined,
    }
  })
  return facilities
}

export async function deleteFacility(formData: FormData) {
  try{
    const id = formData.get('id') as string;
    await prisma.facility.delete({
      where: {
        id,
      },
    });
    revalidatePath(ROUTES.FACILITIES);
  } catch(e: any){
    const {errMessage} = errorMessageGenerator(e);
    return {message: errMessage || "Failed to delete facility"}
  }
}
