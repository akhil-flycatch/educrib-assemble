"use server";


import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";
import { slugify } from "@/utils/string";

import {
    createMultipleProfileHostelContact,
    createMultipleProfileHostelFacility,
    createMultipleProfileHostelFee,
    deleteProfileHostelContactByHostelId,
    deleteProfileHostelFacilityByHostelId,
    deleteProfileHostelFeeByHostelId,
} from ".";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function upsertProfileHostel(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const status = formData.get("status") === "on";
    const profileSlug = (formData.get("profileId") as string) || undefined;
    const title = (formData.get("title") as string) || "NA";
    const description = (formData.get("description") as string) || undefined;
    const avatar = (formData.get("avatar") as string) || null;
    const thumbnail = (formData.get("thumbnail") as string) || null;
    const location = (formData.get("location") as string) || "NA";
    const typeId = (formData.get("typeId") as string) || "NA";
    const categoryId = (formData.get("categoryId") as string) || "NA";
    // const currencyId = formData.get("currencyId") as string || "NA";
    const facilities =
      JSON.parse(formData.get("facilities") as string) || undefined;
    const images = JSON.parse(formData.get("images") as string) || undefined;
    const website = (formData.get("website") as string) || "NA";
    const featured = formData.get("featured") === "on";
    const recommended = formData.get("recommended") === "on";
    const verified = formData.get("verified") === "on";
    const published = formData.get("published") === "on";
    const views = parseInt(formData.get("views") as string) || undefined;
    const profileHostelFees =
      JSON.parse(formData.get("profileHostelFees") as string) || [];
    const profileHostelContacts =
      JSON.parse(formData.get("profileHostelContacts") as string) || [];
    const profileHostelFacilities =
      JSON.parse(formData.get("profileHostelFacilities") as string) || [];

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
      const profileHostel = await tx.profileHostel.upsert({
        where: {
          id,
        },
        create: {
          title,
          slug: slugify(title),
          profileId: profile.id,
          description,
          avatar,
          thumbnail,
          location,
          typeId,
          categoryId,
          // currencyId,
          website,
          facilities,
          images,
          featured,
          recommended,
          verified,
          published,
          views,
          status,
        },
        update: {
          title,
          slug: slugify(title),
          profileId: profile.id,
          description,
          avatar,
          thumbnail,
          location,
          typeId,
          categoryId,
          // currencyId,
          website,
          facilities,
          images,
          featured,
          recommended,
          verified,
          published,
          views,
          status,
        },
      });

      const profileHostelFeeObjects: Prisma.profileHostelFeeCreateInput[] =
        profileHostelFees.map((profileHostelFee: any) => {
          return {
            profileHostelId: profileHostel.id,
            title: (profileHostelFee.title as string) || undefined,
            frequencyId: (profileHostelFee.frequencyId as string) || undefined,
            currencyId: (profileHostelFee.currencyId as string) || undefined,
            amount: parseFloat(profileHostelFee.amount) as number,
          };
        });

      const profileHostelFacilityObjects: Prisma.profileHostelFacilityCreateInput[] =
        profileHostelFacilities.map((profileHostelFacility: any) => {
          return {
            profileHostelId: profileHostel.id,
            facilityId:
              (profileHostelFacility.facilityId as string) || undefined,
          };
        });

      const profileHostelContactObjects: Prisma.profileHostelContactCreateInput[] =
        profileHostelContacts.map((profileHostelContact: any) => {
          return {
            profileHostelId: profileHostel.id,
            contactTypeId:
              (profileHostelContact.contactTypeId as string) || undefined,
          };
        });

      await deleteProfileHostelFeeByHostelId(profileHostel.id, { tx });
      await createMultipleProfileHostelFee(profileHostelFeeObjects, { tx });

      await deleteProfileHostelFacilityByHostelId(profileHostel.id, { tx });
      await createMultipleProfileHostelFacility(profileHostelFacilityObjects, {
        tx,
      });

      await deleteProfileHostelContactByHostelId(profileHostel.id, { tx });
      await createMultipleProfileHostelContact(profileHostelContactObjects, {
        tx,
      });
    });
    revalidatePath("/profileHostel");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to upsert profileHostel" };
  }
}

export async function getAllProfileHostels(
  filter: { active: boolean } = { active: false }
) {
  const profileHostels = await prisma.profileHostel.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
    include: {
      profile: true,
      category: true,
      type: true,
      // currency: true,
      profileHostelFees: {
        include: {
          currency: true,
          frequency: true,
        },
      },
      profileHostelContacts: {
        include: {
          contactType: true,
        },
      },
      profileHostelFacilities: {
        include: {
          facility: true,
        },
      },
    },
  });
  return profileHostels;
}

export async function getProfileHostelsByProfileSlug(
  slug: string,
  filter: { active: boolean } = { active: false }
) {
  const profileHostels = await prisma.profileHostel.findMany({
    where: {
      profile: {
        slug,
      },
      status: filter.active ? true : undefined,
    },
    include: {
      profile: true,
      category: true,
      type: true,
      // currency: true,
      profileHostelFees: {
        include: {
          currency: true,
          frequency: true,
        },
      },
      profileHostelContacts: {
        include: {
          contactType: true,
        },
      },
      profileHostelFacilities: {
        include: {
          facility: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileHostels;
}

export async function getProfileHostelsByProfileId(
  profileId: string,
  filter: { active: boolean } = { active: false }
) {
  const profileHostels = await prisma.profileHostel.findMany({
    where: {
      profileId,
      status: filter.active ? true : undefined,
    },
    include: {
      profile: true,
      category: true,
      type: true,
      // currency: true,
      profileHostelFees: {
        include: {
          currency: true,
          frequency: true,
        },
      },
      profileHostelContacts: {
        include: {
          contactType: true,
        },
      },
      profileHostelFacilities: {
        include: {
          facility: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileHostels;
}

export async function getProfileHostels(
  filter: { active: boolean } = { active: false }
) {
  const supabase = createRouteHandlerClient({ cookies });
  const user = await supabase.auth.getUser();
  const profileHostels = await prisma.profileHostel.findMany({
    where: {
      profileId: user.data.user?.user_metadata.profileId,
      status: filter.active ? true : undefined,
    },
    include: {
      profile: true,
      category: true,
      type: true,
      // currency: true,
      profileHostelFees: {
        include: {
          currency: true,
          frequency: true,
        },
      },
      profileHostelContacts: {
        include: {
          contactType: true,
        },
      },
      profileHostelFacilities: {
        include: {
          facility: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileHostels;
}

export async function getProfileHostelById(id: string) {
  const profileHostel = await prisma.profileHostel.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
      category: true,
      type: true,
      // currency: true,
      profileHostelFees: {
        include: {
          currency: true,
          frequency: true,
        },
      },
      profileHostelContacts: {
        include: {
          contactType: true,
        },
      },
      profileHostelFacilities: {
        include: {
          facility: true,
        },
      },
    },
  });
  return profileHostel;
}

export async function updataImageToProfileHostel(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const images =
      JSON.parse(formData.get("profileImages") as string) || undefined;

    await prisma.profileHostel.update({
      where: {
        id,
      },
      data: {
        images,
      },
    });
    revalidatePath("/profileHostel");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to update images" };
  }
}

export async function searchProfileHostels(
  profileId: string,
  keyword: string,
  filter: { active: boolean } = { active: false }
) {
  const profileHostels = await prisma.profileHostel.findMany({
    where: {
      profileId,
      title: {
        contains: keyword,
        mode: "insensitive",
      },
      status: filter.active ? true : undefined,
    },
    include: {
      profile: true,
      category: true,
      type: true,
      // currency: true,
      profileHostelFees: {
        include: {
          currency: true,
          frequency: true,
        },
      },
      profileHostelContacts: {
        include: {
          contactType: true,
        },
      },
      profileHostelFacilities: {
        include: {
          facility: true,
        },
      },
    },
  });
  return profileHostels;
}

export async function deleteProfileHostelByProfileId(
  profileId: string,
  tx?: Prisma.TransactionClient
) {
  const prismaClient = tx || prisma;
  await prismaClient.profileHostel.deleteMany({
    where: {
      profileId,
    },
  });
  await deleteProfileHostelFeeByHostelId(profileId, { tx });
}

export async function deleteProfileHostel(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    await prisma.$transaction(async (tx) => {
      await tx.profileHostel.delete({
        where: {
          id,
        },
      });
      await deleteProfileHostelFeeByHostelId(id, { tx });
    });
    revalidatePath("/profileHostel");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to delete profileHostel" };
  }
}
