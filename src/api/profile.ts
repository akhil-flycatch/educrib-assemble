"use server";

import { ROUTES } from "@/constants/route";
import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";
import { slugify } from "@/utils/string";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import {
  deleteLocationByProfileId,
  deleteProfileAccreditationByProfileId,
  deleteProfileArticleByProfileId,
  deleteProfileContactByProfileId,
  deleteProfileEventByProfileId,
  deleteProfileFacilityByProfileId,
  deleteProfileHostelByProfileId,
  deleteProfileInternshipByProfileId,
  deleteProfileJobByProfileId,
  deleteProfileMediaByProfileId,
  deleteProfileNewsByProfileId,
  deleteProfilePlacementByProfileId,
  deleteProfileProgramByProfileId,
  deleteProfileRelationByProfileId,
  deleteProfileRequestByProfileId,
  deleteProfileReviewByProfileId,
  deleteProfileSocialByProfileId,
  deleteProfileStaffByProfileId,
  deleteSeoByProfileId,
  selectProfile,
  updateActivity,
} from ".";
import { deleteProfileScholarshipByProfileId } from "./profileScholarship";

export async function upsertProfile(formData: any) {
  try {
    const id = formData.get("id") as string;
    const title = (formData.get("title") as string) || "NA";
    const thumbnail = (formData.get("thumbnail") as string) || null;
    const status = formData.get("status") === "on";
    const alias = (formData.get("alias") as string) || undefined;
    const avatar = (formData.get("avatar") as string) || null;
    const description = (formData.get("description") as string) || undefined;
    const code = (formData.get("code") as string) || undefined;
    const establishedYear = formData.get("establishedYear")
      ? parseInt(formData.get("establishedYear") as string)
      : undefined;
    const verticalId = (formData.get("verticalId") as string) || undefined;
    const managementId = (formData.get("managementId") as string) || undefined;
    const universityId = (formData.get("universityId") as string) || undefined;
    const accreditationId =
      (formData.get("accreditationId") as string) || undefined;
    const typeId = (formData.get("typeId") as string) || undefined;
    const curriculumId = (formData.get("curriculumId") as string) || undefined;
    // const profileImages = (formData.get("profileImages") as unknown as string[]) || undefined;
    const featured = formData.get("featured") === "on";
    const recommended = formData.get("recommended") === "on";
    const verified = formData.get("verified") === "on";
    const published = formData.get("published") === "on";
    const phone = formData.get("phone");
    const website = formData.get("website");
    const email = formData.get("email");
    // // Validate that the typeId exists
    // const typeExists = await prisma.type.findUnique({
    //   where: { id: typeId },
    // });

    // if (!typeExists) {
    //   throw new Error(`Invalid typeId: ${typeId}. It does not exist.`);
    // }
    const profile = await prisma.profile.upsert({
      where: {
        id,
      },
      create: {
        // yearsOfExperience,
        title,
        slug: slugify(title),
        thumbnail,
        status,
        alias,
        avatar,
        description,
        code,
        establishedYear,
        verticalId,
        managementId,
        universityId,
        typeId,
        curriculumId,
        // profileImages,
        featured,
        recommended,
        verified,
        published,
        accreditationId,
        phone,
        email,
        website,
      },
      update: {
        yearsOfExperience: "1",
        title,
        slug: slugify(title),
        thumbnail,
        status,
        alias,
        avatar,
        description,
        code,
        establishedYear,
        verticalId,
        managementId,
        universityId,
        typeId,
        curriculumId,
        // profileImages,
        featured,
        recommended,
        verified,
        published,
        accreditationId,
        phone,
        email,
        website,
      },
    });
    // await updateActivity(profile.id);
    revalidatePath(ROUTES.PROFILES);
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to upsert profile" };
  }
}

export async function upsertProfileOfUser(formData: FormData) {
  try {
    const id = (formData.get("id") as string) || undefined;
    const title = (formData.get("title") as string) || "NA";
    const thumbnail = (formData.get("thumbnail") as string) || null;
    const status = formData.get("status") === "on";
    const alias = (formData.get("alias") as string) || undefined;
    const avatar = (formData.get("avatar") as string) || null;
    const description = (formData.get("description") as string) || undefined;
    const code = (formData.get("code") as string) || undefined;
    const establishedYear = formData.get("establishedYear")
      ? parseInt(formData.get("establishedYear") as string)
      : undefined;
    const verticalId = (formData.get("verticalId") as string) || undefined;
    const managementId = (formData.get("managementId") as string) || undefined;
    // const universityId = (formData.get("universityId") as string) || undefined;
    const typeId = (formData.get("typeId") as string) || undefined;
    const curriculumId = (formData.get("curriculumId") as string) || undefined;
    // const profileImages = (formData.get("profileImages") as unknown as string[]) || undefined;
    const featured = formData.get("featured") === "on";
    const recommended = formData.get("recommended") === "on";
    const verified = formData.get("verified") === "on";
    const published = formData.get("published") === "on";
    const address = (formData.get("address") as string) || undefined;
    const city = (formData.get("address") as string) || undefined;
    const district = (formData.get("district") as string) || undefined;
    const email = (formData.get("email") as string) || undefined;
    const phone = (formData.get("phone") as string) || undefined;
    const pincode = (formData.get("pincode") as string) || undefined;
    const registrationNumber =
      (formData.get("registrationNumber") as string) || undefined;
    const state = (formData.get("state") as string) || undefined;
    const website = (formData.get("website") as string) || undefined;

    // Validate that the typeId exists
    const typeExists = await prisma.type.findUnique({
      where: { id: typeId },
    });

    if (!typeExists) {
      throw new Error(`Invalid typeId: ${typeId}. It does not exist.`);
    }

    const supabase = createServerActionClient({ cookies });
    const user = await supabase.auth.getUser();
    const profile = await prisma.profile.upsert({
      where: {
        id: undefined,
        title,
      },
      create: {
        title,
        slug: slugify(title),
        thumbnail,
        status,
        alias,
        avatar,
        description,
        code,
        establishedYear,
        verticalId,
        managementId,
        // universityId,
        typeId,
        curriculumId,
        // profileImages,
        featured,
        recommended,
        verified,
        published,
        address,
        city,
        district,
        email,
        phone,
        pincode,
        registrationNumber,
        state,
        website,
        userId: user?.data.user?.id,
      },
      update: {
        title,
        slug: slugify(title),
        thumbnail,
        status,
        alias,
        avatar,
        description,
        code,
        establishedYear,
        verticalId,
        managementId,
        // universityId,
        typeId,
        curriculumId,
        // profileImages,
        featured,
        recommended,
        verified,
        published,
        address,
        city,
        district,
        email,
        phone,
        pincode,
        registrationNumber,
        state,
        website,
        userId: user?.data?.user?.id,
      },
    });
    const f = new FormData();
    f.set("keyword", profile.id);
    await selectProfile(f);
    await updateActivity(profile.id);
    revalidatePath(ROUTES.PROFILES);
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to upsert profile" };
  }
}

export const publishProfile = async (formData: any) => {
  const id = formData.get("id") as string;
  const published = formData.get("published") === "on";
  try {
    const profile = await prisma.profile.findUnique({
      where: { id: id },
    });

    if (!profile) {
      return { message: "Profile not found" };
    }

    const resp = await prisma.profile.update({
      where: {
        id: id,
      },
      data: {
        published: published,
      },
    });

    return resp;
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to publish profile" };
  }
};

export const updateProfileImage = async (formData: any) => {
  const id = formData.get("id") as string;
  try {
    const profile = await prisma.profile.findUnique({
      where: { id: id },
    });

    if (!profile) {
      return { message: "Profile not found" };
    }

    const resp = await prisma.profile.update({
      where: {
        id: id,
      },
      data: {
        thumbnail: formData.get("cover") as string,
        // example: avatar: formData.get('avatar') as string,
      },
    });

    return resp;
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to publish profile" };
  }
};

export const updateavatarImage = async (formData: any) => {
  const id = formData.get("id") as string;
  try {
    const profile = await prisma.profile.findUnique({
      where: { id: id },
    });

    if (!profile) {
      return { message: "Profile not found" };
    }
    const resp = await prisma.profile.update({
      where: {
        id: id,
      },
      data: {
        avatar: formData.get("avatar") as string,
        // example: avatar: formData.get('avatar') as string,
      },
    });

    return resp;
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to publish profile" };
  }
};

export async function getAllProfiles(
  filter: { active: boolean } = { active: false }
) {
  const profiles = await prisma.profile.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
  });
  return profiles;
}

export async function getLatestProfiles(
  filter: { active: boolean } = { active: false }
) {
  const profiles = await prisma.profile.findMany({
    where: {
      status: filter.active ? true : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
  return profiles;
}

export async function getProfileBySlug(slug: string) {
  const profile = await prisma.profile.findUnique({
    where: {
      slug,
    },
    include: {
      vertical: true,
      management: true,
      university: true,
      type: true,
      curriculum: true,
      profileAccreditations: { include: { accreditation: true } },
      profileProgrammes: { include: { course: true } },
    },
  });
  profile;
  return profile;
}

export async function getProfile() {
  const supabase = createServerActionClient({ cookies });
  const user = await supabase.auth.getUser();
  const profile = await prisma.profile.findUnique({
    where: {
      // id: "2",
      id: user.data.user?.user_metadata.profileId || "",
    },
    include: {
      vertical: true,
      management: true,
      university: true,
      type: true,
      curriculum: true,
      profileAccreditations: { include: { accreditation: true } },
      profileProgrammes: { include: { course: true } },
    },
  });
  profile;
  return profile;
}

export async function searchProfiles(
  keyword: string,
  filter: { active?: boolean; vertical?: string; notClaimed?: boolean } = {
    active: false,
  }
) {
  const profiles = await prisma.profile.findMany({
    where: {
      title: {
        contains: keyword,
        mode: "insensitive",
      },
      status: filter.active ? true : undefined,
      verticalId: filter.vertical ? filter.vertical : undefined,
      userId: filter.notClaimed ? null : undefined,
    },
    include: {
      vertical: true,
      management: true,
      university: true,
      type: true,
      curriculum: true,
      profileAccreditations: { include: { accreditation: true } },
      profileProgrammes: { include: { course: true } },
    },
  });
  return profiles;
}

export async function getProfileById(id?: string) {
  const supabase = createServerActionClient({ cookies });
  const user = await supabase.auth.getUser();
  const profile = await prisma.profile.findUnique({
    where: {
      id: user.data.user?.user_metadata.profileId || id,
    },
    include: {
      vertical: true,
      management: true,
      university: true,
      type: true,
      curriculum: true,
      // profileAccreditations: { include: { accreditation: true } },
      accreditation: true,
      profileProgrammes: { include: { course: true } },
      profileContacts: true,
      // address:true,
      // district:true,
      // city:true,
      // state:true,
    },
  });
  profile;
  return profile;
}

export async function updataImageToProfile(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const profileImages =
      JSON.parse(formData.get("profileImages") as string) || undefined;

    await prisma.profile.update({
      where: {
        id,
      },
      data: {
        profileImages,
      },
    });
    revalidatePath(ROUTES.PROFILES);
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to update images" };
  }
}

export async function deleteProfile(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    await prisma.$transaction(
      async (tx: any) => {
        const dbAction1 = deleteLocationByProfileId(id, tx);
        const dbAction2 = deleteSeoByProfileId(id, tx);
        const dbAction3 = deleteProfileAccreditationByProfileId(id, tx);
        const dbAction4 = deleteProfileArticleByProfileId(id, tx);
        const dbAction5 = deleteProfileContactByProfileId(id, tx);
        const dbAction6 = deleteProfileEventByProfileId(id, tx);
        const dbAction7 = deleteProfileFacilityByProfileId(id, tx);
        const dbAction8 = deleteProfileHostelByProfileId(id, tx);
        const dbAction9 = deleteProfileInternshipByProfileId(id, tx);
        const dbAction10 = deleteProfileJobByProfileId(id, tx);
        const dbAction11 = deleteProfileMediaByProfileId(id, tx);
        const dbAction12 = deleteProfileNewsByProfileId(id, tx);
        const dbAction13 = deleteProfilePlacementByProfileId(id, tx);
        const dbAction14 = deleteProfileProgramByProfileId(id, tx);
        const dbAction15 = deleteProfileRelationByProfileId(id, tx);
        const dbAction16 = deleteProfileRequestByProfileId(id, tx);
        const dbAction17 = deleteProfileReviewByProfileId(id, tx);
        const dbAction18 = deleteProfileScholarshipByProfileId(id, tx);
        const dbAction19 = deleteProfileSocialByProfileId(id, tx);
        const dbAction20 = deleteProfileStaffByProfileId(id, tx);
        await Promise.all([
          dbAction1,
          dbAction2,
          dbAction3,
          dbAction4,
          dbAction5,
          dbAction6,
          dbAction7,
          dbAction8,
          dbAction9,
          dbAction10,
          dbAction11,
          dbAction12,
          dbAction13,
          dbAction14,
          dbAction15,
          dbAction16,
          dbAction17,
          dbAction18,
          dbAction19,
          dbAction20,
        ]);
        await tx.profile.delete({
          where: {
            id,
          },
        });
      },
      {
        timeout: 10000,
      }
    );
    revalidatePath("/profiles");
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to delete profile" };
  }
}

export async function institutionOnboard(formData: FormData) {
  try {
    const website = (formData.get("website") as string) || undefined;
    const address = (formData.get("address") as string) || undefined;
    const city = (formData.get("city") as string) || undefined;
    const district = (formData.get("district") as string) || undefined;
    const state = (formData.get("state") as string) || undefined;
    const pincode = (formData.get("pincode") as string) || undefined;
    const phone = (formData.get("phone") as string) || undefined;
    const email = (formData.get("email") as string) || undefined;
    const title = (formData.get("title") as string) || "NA";
    const establishedYear = formData.get("establishedYear")
      ? parseInt(formData.get("establishedYear") as string)
      : undefined;
    const accreditationId =
      (formData.get("accreditationId") as string) || undefined;
    const universityId = (formData.get("universityId") as string) || undefined;
    const status = true;
    const type = (formData.get("type") as string) || undefined;
    const typeId = "42f1177a-872f-43a4-bb88-ad77cac0fd50";
    const published = false;
    const verified = true;
    const featured = true;
    const recommended = true;
    const slug = title.toLowerCase().split(" ").join("-");

    // Validate that the typeId exists
    // const typeExists = await prisma.type.findUnique({
    //   where: { id: typeId },
    // });

    // if (!typeExists) {
    //   throw new Error(`Invalid typeId: ${typeId}. It does not exist.`);
    // }

    const supabase = createServerActionClient({ cookies });
    const user = await supabase.auth.getUser();
    const verticalId = user?.data.user?.user_metadata?.verticalId;
    const userId = user?.data.user?.id;

    // console.log(
    //   "###################",
    //   {
    //     website,
    //     address,
    //     city,
    //     district,
    //     state,
    //     pincode,
    //     phone,
    //     email,
    //     title,
    //     establishedYear,
    //     accreditationId,
    //     universityId,
    //     status,
    //     typeId,
    //     published,
    //     verified,
    //     featured,
    //     recommended,
    //     verticalId,
    //     userId,
    //     slug,
    //   },
    //   "###################"
    // );

    const profile = await prisma.profile.create({
      data: {
        website,
        address,
        city,
        district,
        state,
        pincode,
        phone,
        email,
        title,
        establishedYear,
        accreditationId,
        universityId,
        status,
        typeId,
        published,
        verified,
        featured,
        recommended,
        verticalId,
        userId,
        slug,
      },
    });

    await supabase.auth.updateUser({
      data: {
        ...user.data.user?.user_metadata,
        profileId: profile.id,
      },
    });
    //const f = new FormData();
    //f.set("keyword", profile.id);
    // await selectProfile(f);
    // await updateActivity(profile.id);
    // revalidatePath(ROUTES.PROFILES);
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to upsert profile" };
  }
}
