"use server";

import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function createMultipleProfileHostelFacility(
  profileHostelFacilityObjects: Prisma.profileHostelFacilityCreateInput[],
  options?: { tx?: Prisma.TransactionClient }
) {
  const prismaClient = options?.tx || prisma;
  const profileHostelFacilitys =
    await prismaClient.profileHostelFacility.createMany({
      data: profileHostelFacilityObjects,
      skipDuplicates: true,
    });
  return profileHostelFacilitys;
}

export async function getAllProfileHostelFacilitys(
  filter: { active: boolean } = { active: false }
) {
  const profileHostelFacilitys = await prisma.profileHostelFacility.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
    include: {
      facility: true,
    },
  });
  return profileHostelFacilitys;
}

export async function deleteProfileHostelFacilityByHostelId(
  profileHostelId: string,
  options?: { tx?: Prisma.TransactionClient }
) {
  const prismaClient = options?.tx || prisma;
  await prismaClient.profileHostelFacility.deleteMany({
    where: {
      profileHostelId,
    },
  });
}
