"use server";

import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function createMultipleProfileEventTicket(
  profileEventTicketObjects: Prisma.profileEventTicketCreateInput[],
  options?: { tx?: Prisma.TransactionClient }
) {
  const prismaClient = options?.tx || prisma;
  const profileEventTickets = await prismaClient.profileEventTicket.createMany({
    data: profileEventTicketObjects,
    skipDuplicates: true,
  });
  return profileEventTickets;
}

export async function getAllProfileEventTickets(
  filter: { active: boolean } = { active: false }
) {
  const profileEventTickets = await prisma.profileEventTicket.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
    include: {
      currency: true,
    },
  });
  return profileEventTickets;
}

export async function deleteProfileEventTicketByEventId(
  profileEventId: string,
  options?: { tx?: Prisma.TransactionClient }
) {
  const prismaClient = options?.tx || prisma;
  await prismaClient.profileEventTicket.deleteMany({
    where: {
      profileEventId,
    },
  });
}
