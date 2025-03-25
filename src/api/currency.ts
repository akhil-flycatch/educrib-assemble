"use server";

import { revalidatePath } from "next/cache";

import { ROUTES } from "@/constants/route";
import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";
import { slugify } from "@/utils/string";

export async function upsertCurrency(formData: FormData) {
  try{
    const id = formData.get("id") as string
    const title = (formData.get("title") as string) || "NA";
    const icon = (formData.get("icon") as string) || null;
    const code = (formData.get("code") as string) || "NA";
    const status = formData.get("status") === "on";
    
    await prisma.currency.upsert({
      where:{
        id,
      },
      create: {
        title,
        slug: slugify(title),
        icon,
        code,
        status,
      },
      update:{
        title,
        slug: slugify(title),
        icon,
        code,
        status,
      }
    });
    revalidatePath(ROUTES.CURRENCIES);
  } catch(e: any){
    const {errMessage} = errorMessageGenerator(e);
    return {message: errMessage || "Failed to upsert currency"}
  }
}

export async function getAllCurrencies(filter:{active:boolean} = {active:false}) {
  const currencies = await prisma.currency.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
  });
  return currencies;
}

export async function getLatestCurrencies(filter:{active:boolean} = {active:false}) {
  const currencies = await prisma.currency.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
  return currencies;
}

export async function getCurrencyBySlug(slug: string) {
  const currency = await prisma.currency.findUnique({
    where: {
      slug,
    },
  });
  return currency;
}

export async function getCurrencyById(id: string) {
  const currency = await prisma.currency.findUnique({
    where: {
      id,
    },
  });
  return currency;
}

export async function searchCurrencies(keyword: string, filter:{active:boolean} = {active:false}){
  const currencies = await prisma.currency.findMany({
    where:{
      title:{
        contains: keyword,
        mode: "insensitive",
      },
      status: filter.active ? true : undefined,
    }
  })
  return currencies
}

export async function deleteCurrency(formData: FormData) {
  try{
    const id = formData.get('id') as string;
    await prisma.currency.delete({
      where: {
        id,
      },
    });
    revalidatePath("/currencies");
  } catch(e: any){
    const {errMessage} = errorMessageGenerator(e);
    return {message: errMessage || "Failed to delete currency"}
  }
}