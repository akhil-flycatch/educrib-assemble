"use server";

import { revalidatePath } from "next/cache";

import { ROUTES } from "@/constants/route";
import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";
import { slugify } from "@/utils/string";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function upsertVertical(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const title = (formData.get("title") as string) || "NA";
    const icon = (formData.get("icon") as string) || null;
    const thumbnail = (formData.get("thumbnail") as string) || null;
    const isFoundation = formData.get("isFoundation") === "on";
    const status = formData.get("status") === "on";

    await prisma.vertical.upsert({
      where: {
        id,
      },
      create: {
        title,
        slug: slugify(title),
        icon,
        thumbnail,
        isFoundation,
        status,
      },
      update: {
        title,
        slug: slugify(title),
        icon,
        thumbnail,
        isFoundation,
        status,
      },
    });
    //this is no longer used with progresive enhancement, redirect will throw error
    // id ? revalidatePath("/verticals") : redirect("/verticals");
    revalidatePath("/verticals");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to upsert vertical" };
  }
}

export async function getAllVerticals(filter:{active:boolean} = {active:false}) {
  const verticals = await prisma.vertical.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
  });
  return verticals;
}

export async function getFoundationVerticals(filter:{active:boolean} = {active:false}) {
  const verticals = await prisma.vertical.findMany({
    where: {
      status: filter.active ? true : undefined,
      isFoundation: true,
    },
  });
  return verticals;
}

export async function getLatestVerticals(filter:{active:boolean} = {active:false}) {
  const verticals = await prisma.vertical.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
  return verticals;
}

export async function getVerticalBySlug(slug: string) {
  const vertical = await prisma.vertical.findUnique({
    where: {
      slug,
    },
  });
  return vertical;
}

export async function getVerticalById() {
   const supabase = await createRouteHandlerClient({ cookies });
    const user = await supabase.auth.getUser();

  const vertical = await prisma.vertical.findUnique({
    where: {
      id: user.data.user?.user_metadata.verticalId,
    },
  });
  return vertical;
}

export async function searchVerticals(keyword: string, filter:{active:boolean} = {active:false}) {
  const verticals = await prisma.vertical.findMany({
    where: {
      title: {
        contains: keyword,
        mode: "insensitive",
      },
      status: filter.active ? true : undefined,
    },
  });
  return verticals;
}

export async function deleteVertical(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    await prisma.vertical.delete({
      where: {
        id,
      },
    });
    revalidatePath(ROUTES.VERTICALS);
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to delete vertical", errorMessage: e.message };
  }
}
