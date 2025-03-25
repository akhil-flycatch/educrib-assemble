"use server";

import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function createMultipleProfileHostelContact(
  profileHostelContactObjects: Prisma.profileHostelContactCreateInput[],
  options?: { tx?: Prisma.TransactionClient }
) {
  const prismaClient = options?.tx || prisma;
  const profileHostelContacts =
    await prismaClient.profileHostelContact.createMany({
      data: profileHostelContactObjects,
      skipDuplicates: true,
    });
  return profileHostelContacts;
}

export async function getAllProfileHostelContacts(
  filter: { active: boolean } = { active: false }
) {
  const profileHostelContacts = await prisma.profileHostelContact.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
    include: {
      contactType: true,
    },
  });
  return profileHostelContacts;
}

export async function deleteProfileHostelContactByHostelId(
  profileHostelId: string,
  options?: { tx?: Prisma.TransactionClient }
) {
  const prismaClient = options?.tx || prisma;
  await prismaClient.profileHostelContact.deleteMany({
    where: {
      profileHostelId,
    },
  });
}
