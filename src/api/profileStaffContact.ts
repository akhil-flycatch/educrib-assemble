"use server";

import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function createMultipleProfileStaffContact(
  profileStaffContactObjects: Prisma.profileStaffContactCreateInput[],
  options?: { tx?: Prisma.TransactionClient }
) {
  const prismaClient = options?.tx || prisma;
  const profileStaffContacts =
    await prismaClient.profileStaffContact.createMany({
      data: profileStaffContactObjects,
      skipDuplicates: true,
    });
  return profileStaffContacts;
}

export async function getAllProfileStaffContacts(
  filter: { active: boolean } = { active: false }
) {
  const profileHostels = await prisma.profileStaffContact.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
    include: {
      contactType: true,
    },
  });
  return profileHostels;
}

export async function deleteProfileStaffContactByStaffId(
  profileStaffId: string,
  options?: { tx?: Prisma.TransactionClient }
) {
  const prismaClient = options?.tx || prisma;
  await prismaClient.profileStaffContact.deleteMany({
    where: {
      profileStaffId,
    },
  });
}
