"use server";


import { Prisma } from "@prisma/client";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";

export async function getProfileRequestByProfileId(
  profileId: string,
  filter: { active: boolean } = { active: false }
) {
  const profileRequests = await prisma.profileRequest.findMany({
    where: {
      profileId,
      status: filter.active ? true : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileRequests;
}

export async function getProfileRequests(
  filter: { active: boolean } = { active: false }
) {
  const supabse = createRouteHandlerClient({ cookies });
  const user = await supabse.auth.getUser();
  const profileRequests = await prisma.profileRequest.findMany({
    where: {
      profileId: user.data.user?.user_metadata.profileId,
      status: filter.active ? true : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileRequests;
}

export async function getProfileRequestByProfileSlug(
  slug: string,
  filter: { active: boolean } = { active: false }
) {
  const profileRequests = await prisma.profileRequest.findMany({
    where: {
      profile: {
        slug,
      },
      status: filter.active ? true : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileRequests;
}

export async function searchProfileRequest(
  profileId: string,
  keyword: string,
  filter: { active: boolean } = { active: false }
) {
  const profileRequests = await prisma.profileRequest.findMany({
    where: {
      profileId,
      title: {
        contains: keyword,
        mode: "insensitive",
      },
      status: filter.active ? true : undefined,
    },
  });
  return profileRequests;
}

export async function deleteProfileRequestByProfileId(
  profileId: string,
  tx?: Prisma.TransactionClient
) {
  const prismaClient = tx || prisma;
  await prismaClient.profileRequest.deleteMany({
    where: {
      profileId,
    },
  });
}
