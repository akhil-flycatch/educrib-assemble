"use server";

import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function createMultipleProfileHostelFee(
  profileHostelFeeObjects: Prisma.profileHostelFeeCreateInput[],
  options?: { tx?: Prisma.TransactionClient }
) {
  const prismaClient = options?.tx || prisma;
  const profileHostelFees = await prismaClient.profileHostelFee.createMany({
    data: profileHostelFeeObjects,
    skipDuplicates: true,
  });
  return profileHostelFees;
}

export async function getAllProfileHostelFees(
  filter: { active: boolean } = { active: false }
) {
  const profileHostelFees = await prisma.profileHostelFee.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
    include: {
      frequency: true,
      currency: true,
    },
  });
  return profileHostelFees;
}

export async function deleteProfileHostelFeeByHostelId(
  profileHostelId: string,
  options?: { tx?: Prisma.TransactionClient }
) {
  const prismaClient = options?.tx || prisma;
  await prismaClient.profileHostelFee.deleteMany({
    where: {
      profileHostelId,
    },
  });
}
