"use server";

import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function createMultipleProfileProgrammeFee(
  profileProgrammeFeeObjects: Prisma.profileProgrammeFeeCreateInput[],
  options?: { tx?: Prisma.TransactionClient }
) {
  const prismaClient = options?.tx || prisma;
  const profileProgrammeFees =
    await prismaClient.profileProgrammeFee.createMany({
      data: profileProgrammeFeeObjects,
      skipDuplicates: true,
    });
  return profileProgrammeFees;
}

export async function getAllProfileProgrammeFees(
  filter: { active: boolean } = { active: false }
) {
  const profileProgrammeFees = await prisma.profileProgrammeFee.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
    include: {
      frequency: true,
      currency: true,
    },
  });
  return profileProgrammeFees;
}

export async function deleteProfileProgrammeFeeByProgrammeId(
  profileProgrammeId: string,
  options?: { tx?: Prisma.TransactionClient }
) {
  const prismaClient = options?.tx || prisma;
  await prismaClient.profileProgrammeFee.deleteMany({
    where: {
      profileProgrammeId,
    },
  });
}
