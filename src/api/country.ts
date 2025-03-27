"use server";

import { revalidatePath } from "next/cache";

import { ROUTES } from "@/constants/route";
import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";
import { slugify } from "@/utils/string";

export async function upsertCountry(formData: FormData) {
  try{
    const id = formData.get("id") as string
    const title = (formData.get("title") as string) || "NA";
    const alias = (formData.get("alias") as string) || undefined;
    const code = (formData.get("code") as string) || undefined;
    const flag = (formData.get("flag") as string) || null;
    const locale = (formData.get("locale") as string) || undefined;
    const currency = (formData.get("currency") as string) || undefined;
    const status = formData.get("status") === "on";
    
    await prisma.country.upsert({
      where:{
        id,
      },
      create: {
        title,
        slug: slugify(title),
        alias,
        code,
        flag,
        locale,
        currency,
        status,
      },
      update:{
        title,
        slug: slugify(title),
        alias,
        code,
        flag,
        locale,
        currency,
        status,
      }
    });
    revalidatePath(ROUTES.COUNTRIES);
  } catch(e: any){
    const {errMessage} = errorMessageGenerator(e);
    return {message: errMessage || "Failed to upsert country"}
  }
}

export async function getAllCountries(filter:{active:boolean} = {active:false}) {
  const countries = await prisma.country.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
  });
  return countries;
}

export async function getLatestCountries(filter:{active:boolean} = {active:false}) {
  const countries = await prisma.country.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
  return countries;
}

export async function getCountryBySlug(slug: string) {
  const country = await prisma.country.findUnique({
    where: {
      slug,
    },
  });
  return country;
}

export async function searchCountries(keyword: string, filter:{active:boolean} = {active:false}){
  const countries = await prisma.country.findMany({
    where:{
      title:{
        contains: keyword,
        mode: "insensitive",
      },
      status: filter.active ? true : undefined,
    }
  })
  return countries
}

export async function deleteCountry(formData: FormData) {
  try{
    const id = formData.get('id') as string;
    await prisma.country.delete({
      where: {
        id,
      },
    });
    revalidatePath("/countries");
  } catch(e: any){
    const {errMessage} = errorMessageGenerator(e);
    return {message: errMessage || "Failed to delete country"}
  }
}
