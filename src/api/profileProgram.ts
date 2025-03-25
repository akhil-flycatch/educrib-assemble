"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";

import {
  createMultipleProfileProgrammeFee,
  deleteProfileProgrammeFeeByProgrammeId,
} from ".";

export async function upsertProfileProgram(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const status = formData.get("status") === "on";
    const avatar = (formData.get("avatar") as string) || null;
    const thumbnail = (formData.get("thumbnail") as string) || null;
    const courseId = formData.get("courseId") as string;
    const specializationId = formData.get("specializationId") as string;
    const profileSlug = formData.get("profileId") as string;
    const intakeId = formData.get("intakeId") as string;
    const capacity = formData.get("capacity") as string;
    const levelId = formData.get("levelId") as string;
    const duration = formData.get("duration") as string;
    const durationTypeId = formData.get("durationTypeId") as string;
    const profileProgrammeFees =
      JSON.parse(formData.get("profileProgrammeFees") as string) || [];

    const convertedCapacity = parseInt(capacity);
    const convertedDuration = parseInt(duration);

    const profile = await prisma.profile.findFirst({
      where: {
        OR: [
          {
            slug: profileSlug,
          },
          {
            id: profileSlug,
          },
        ],
      },
    });
    if (!profile) return { message: "profileSlug is invalid" };

    await prisma.$transaction(async (tx) => {
      const profileProgram = await prisma.profileProgramme.upsert({
        where: {
          id,
        },
        create: {
          status,
          avatar,
          thumbnail,
          courseId,
          specializationId,
          profileId: profile.id,
          intakeId,
          capacity: convertedCapacity,
          levelId,
          duration: convertedDuration,
          durationTypeId,
        },
        update: {
          status,
          avatar,
          thumbnail,
          courseId,
          specializationId,
          profileId: profile.id,
          intakeId,
          capacity: convertedCapacity,
          levelId,
          duration: convertedDuration,
          durationTypeId,
        },
      });

      const profileProgrammeFeeObjects: Prisma.profileProgrammeFeeCreateInput[] =
        profileProgrammeFees.map((profileProgrammeFee: any) => {
          return {
            profileProgrammeId: profileProgram.id,
            title: profileProgrammeFee.title,
            amount: parseFloat(profileProgrammeFee.amount),
            currencyId: profileProgrammeFee.currencyId,
            frequencyId: profileProgrammeFee.frequencyId,
          };
        });

      await deleteProfileProgrammeFeeByProgrammeId(profileProgram.id, { tx });
      await createMultipleProfileProgrammeFee(profileProgrammeFeeObjects, {
        tx,
      });
    });

    revalidatePath("/profileProgrammes");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to upsert profileProgramme" };
  }
}

export async function getAllProfileProgrammes(
  filter: { active: boolean } = { active: false }
) {
  const profileProgrammes = await prisma.profileProgramme.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
  });
  return profileProgrammes;
}

export async function getLatestProfileProgrammes(
  filter: { active: boolean } = { active: false }
) {
  const profileProgrammes = await prisma.profileProgramme.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      course: true,
      specialization: true,
    },
    take: 10,
  });
  return profileProgrammes;
}

export async function getProfileProgramByProfileId(
  profileId: string,
  filter: { active: boolean } = { active: false }
) {
  const profileProgramme = await prisma.profileProgramme.findMany({
    where: {
      profileId,
      status: filter.active ? true : undefined,
    },
    include: {
      course: true,
      specialization: true,
      intake: true,
      level: true,
      durationType: true,
      profileProgrammeFees: { include: { currency: true, frequency: true } },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileProgramme;
}

export async function getProfilePrograms(
  filter: { active: boolean } = { active: false },
  id: any
) {
  // const supabase = createRouteHandlerClient({ cookies });
  // const user = await supabase.auth.getUser();
  const profileProgramme = await prisma.profileProgramme.findMany({
    where: {
      // profileId:"clrpz6nnn000mlf08dy5aqjdm",
      profileId: id || "clrpz6nnn000mlf08dy5aqjdm",
      status: filter.active ? true : undefined,
    },
    include: {
      course: true,
      specialization: true,
      intake: true,
      level: true,
      durationType: true,
      profileProgrammeFees: { include: { currency: true, frequency: true } },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileProgramme;
}

export async function getProfileProgramByProfileSlug(
  slug: string,
  filter: { active: boolean } = { active: false }
) {
  const profileProgramme = await prisma.profileProgramme.findMany({
    where: {
      profile: {
        slug,
      },
      status: filter.active ? true : undefined,
    },
    include: {
      course: true,
      specialization: true,
      intake: true,
      level: true,
      durationType: true,
      profileProgrammeFees: { include: { currency: true, frequency: true } },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileProgramme;
}

export async function searchProfileProgrammes(
  profileId: string,
  keyword: string,
  filter: { active: boolean } = { active: false }
) {
  const profileProgrammes = await prisma.profileProgramme.findMany({
    where: {
      profileId,
      OR: [
        {
          course: {
            is: {
              title: {
                contains: keyword,
                mode: "insensitive",
              },
            },
          },
        },
        {
          specialization: {
            is: {
              title: {
                contains: keyword,
                mode: "insensitive",
              },
            },
          },
        },
      ],
      status: filter.active ? true : undefined,
    },
  });
  return profileProgrammes;
}

export async function deleteProfileProgramByProfileId(
  profileId: string,
  tx?: Prisma.TransactionClient
) {
  const prismaClient = tx || prisma;
  await prismaClient.profileContact.deleteMany({
    where: {
      profileId,
    },
  });
}

export async function deleteProfileProgram(id: any) {
  try {
    // const id = formData.get("id") as string;
    await prisma.profileProgramme.delete({
      where: {
        id,
      },
    });
    revalidatePath("/profileProgrammes");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to delete profileProgramme" };
  }
}
