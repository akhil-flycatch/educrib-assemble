"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";

import {
  createMultipleProfileStaffContact,
  deleteProfileStaffContactByStaffId,
} from ".";
import { StaffFormValues } from "@/components/dashboard/staff/staffForm";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function upsertProfileStaff(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const status = formData.get("status") === "on";
    const profileSlug = (formData.get("profileId") as string) || undefined;
    const title = (formData.get("title") as string) || "NA";
    const avatar = (formData.get("avatar") as string) || null;
    const designationId =
      (formData.get("designationId") as string) || undefined;
    const profileStaffContacts =
      JSON.parse(formData.get("profileStaffContacts") as string) || [];

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

    await prisma.$transaction(async (tx: any) => {
      const profileStaff = await tx.profileStaff.upsert({
        where: {
          id,
        },
        create: {
          title,
          profileId: profile.id,
          avatar,
          designationId,
          status,
        },
        update: {
          title,
          profileId: profile.id,
          avatar,
          designationId,
          status,
        },
      });

      const profileStaffContactObjects: any = profileStaffContacts.map(
        (profileStaffContact: any) => {
          return {
            profileStaffId: profileStaff.id,
            title: profileStaffContact.title,
            phone: profileStaffContact.phone,
            email: profileStaffContact.email,
            website: profileStaffContact.website,
            contactTypeId: profileStaffContact.contactTypeId || undefined,
          };
        }
      );
      await deleteProfileStaffContactByStaffId(profileStaff.id, { tx });
      await createMultipleProfileStaffContact(profileStaffContactObjects, {
        tx,
      });
    });
    revalidatePath("/profileStaff");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to upsert profileStaff" };
  }
}

export async function getAllProfileStaffs(
  filter: { active: boolean } = { active: false }
) {
  const profileStaffs = await prisma.profileStaff.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
  });
  return profileStaffs;
}

export async function getProfileStaffsByProfileId(
  profileId: string,
  filter: { active: boolean } = { active: false }
) {
  const profileStaffs = await prisma.profileStaff.findMany({
    where: {
      profileId,
      status: filter.active ? true : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileStaffs;
}

export async function getProfileStaffs(
  filter: { active: boolean } = { active: false }
) {
  const supabase = createRouteHandlerClient({ cookies });
  const user = await supabase.auth.getUser();
  const profileStaffs = await prisma.profileStaff.findMany({
    where: {
      profileId: user.data.user?.user_metadata.profileId,
      status: filter.active ? true : undefined,
    },
    include: {
      designation: true,
      profileStaffContacts: { include: { contactType: true } },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileStaffs;
}

export async function getProfileStaffsByProfileSlug(
  slug: string,
  filter: { active: boolean } = { active: false }
) {
  const profileStaffs = await prisma.profileStaff.findMany({
    where: {
      profile: {
        slug,
      },
      status: filter.active ? true : undefined,
    },
    include: {
      designation: true,
      profileStaffContacts: { include: { contactType: true } },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return profileStaffs;
}

export async function getProfileStaffById(id: string) {
  const profileStaff = await prisma.profileStaff.findUnique({
    where: {
      id,
    },
    include: {
      designation: true,
    },
  });
  return profileStaff;
}

export async function searchProfileStaffs(
  profileId: string,
  keyword: string,
  filter: { active: boolean } = { active: false }
) {
  const profileStaffs = await prisma.profileStaff.findMany({
    where: {
      profileId,
      status: filter.active ? true : undefined,
      title: {
        contains: keyword,
        mode: "insensitive",
      },
    },
    include: {
      designation: true,
    },
  });
  return profileStaffs;
}

export async function deleteProfileStaffByProfileId(
  profileId: string,
  tx?: Prisma.TransactionClient
) {
  const prismaClient = tx || prisma;
  await prismaClient.profileStaff.deleteMany({
    where: {
      profileId,
    },
  });
}

export async function deleteProfileStaff(id: string) {
  try {
    await prisma.profileStaff.delete({
      where: {
        id,
      },
    });
    revalidatePath("/profileStaff");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to delete profileStaff" };
  }
}

export async function createProfileStaff(staff: StaffFormValues) {
  try {
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const user = await supabase.auth.getUser();
    const profileId = user.data.user?.user_metadata.profileId;
    await prisma.profileStaff.create({
      data: {
        title: staff.title,
        profileId,
        designation: staff.designation,
        avatar: staff.avatar,
        status: true,
        email: staff.email,
        phone: staff.phone,
      },
    });
    revalidatePath("/staffs");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to create profileStaff" };
  }
}

export async function editProfileStaff(staff: StaffFormValues) {
  try {
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const user = await supabase.auth.getUser();
    const profileId = user.data.user?.user_metadata.profileId;
    await prisma.profileStaff.update({
      where: {
        id: staff.id ?? '',
      },
      data: {
        title: staff.title,
        profileId,
        designation: staff.designation,
        avatar: staff.avatar,
        status: true,
        email: staff.email,
        phone: staff.phone,
      },
    });
    revalidatePath("/staffs");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to update profileStaff" };
  }
}
