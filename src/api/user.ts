"use server";

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";
import { slugify } from "@/utils/string";
import { createRouteHandlerClient, createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { getProfileById, getProfileBySlug } from ".";

export async function getUserMetadata(): Promise<
  | {
      user?: {
        isUserProfileComplete: boolean;
        profileId: string | null | undefined;
        verticalId: string | null | undefined;
      };
      sucess: true;
    }
  | { message: string; sucess: false }
> {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const user = await supabase.auth.getUser();
    if (!user.data.user?.user_metadata)
      throw new Error("User metadata not found");
    return {
      user: user.data.user.user_metadata as {
        isUserProfileComplete: boolean;
        profileId: string | null | undefined;
        verticalId: string | null | undefined;
      },
      sucess: true,
    };
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to fetch userdata", sucess: false };
  }
}

export async function updateUser(formData: FormData) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerActionClient<any>({
      cookies: () => cookieStore,
    });
    const user = await supabase.auth.getUser();
    user.data.user?.user_metadata;
    const image = (formData.get("image") as string) || null;
    const name = (formData.get("name") as string) || "NA";
    const phone = (formData.get("phone") as string) || null;
    const email = (formData.get("email") as string) || undefined;

    const updateduser = await supabase.auth.updateUser({
      data: {
        name,
        slug: slugify(name),
        phone,
        email,
        image,
        isUserProfileComplete: true,
      },
    });

    console.dir(updateduser?.data?.user?.user_metadata, "updateduser");
    return updateduser?.data?.user?.user_metadata;

    // await prisma.user.update({
    //   where: {
    //     id: user.data.user?.id,
    //   },
    //   data: {
    //     name,
    //     phone,
    //     email,
    //     role: "assemble_user",
    //   },
    // });
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to update userdata" };
  }
}

export async function selectCategory(formData: FormData) {
  try {
    const supabase = await createRouteHandlerClient<any>({
      cookies,
    });
    const verticalId = (formData.get("verticalId") as string) || null;
    const user = await supabase.auth.getUser();
    const user_metadata = user.data.user?.user_metadata;
    await supabase.auth.updateUser({
      data: {
        ...user_metadata,
        verticalId: verticalId,
      },
    });
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to uppdate userdata" };
  }
}

export async function selectProfile(formData: FormData) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerActionClient<any>({
      cookies: () => cookieStore,
    });

    const profileSlugOrId = (formData.get("keyword") as string) || "";
    const isNew = Boolean(formData.get("new-option") as string);
    const verticalId = (formData.get("verticalId") as string) || null;
    const profile = await getProfileBySlug(profileSlugOrId);
    const user = await supabase.auth.getUser();
    const user_metadata = user.data.user?.user_metadata;

      const fullProfile = profile
        ? profile
        : await getProfileById(profileSlugOrId);
      if (!fullProfile) return { message: "Profile not found" };
      await prisma.profile.update({
        where: {
          id: fullProfile.id,
        },
        data: {
          userId: user.data.user?.id,
          published: false,
        },
      });

      await supabase.auth.updateUser({
        data: {
          ...user_metadata,
          profileId: fullProfile.id,
        },
      });
    
    // else {
    //   const createdProfile = await prisma.profile.create({
    //     data: {
    //       userId: user.data.user?.id,
    //       published: false,
    //       status: true,
    //       title: profileSlugOrId,
    //       slug: profileSlugOrId.split(" ").join("-").toLowerCase(),
    //       verified: false,
    //       verticalId,
    //     },
    //   });
    //   await supabase.auth.updateUser({
    //     data: {
    //       ...user_metadata,
    //       profileId: createdProfile.id,
    //     },
    //   });
    // }
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to update userdata" };
  }
}

export async function checkProfilePublished(): Promise<
  { sucess: true; published: boolean } | { sucess: false; message: string }
> {
  try {
    const user_metadata = await getUserMetadata();
    if (!user_metadata.sucess)
      return { sucess: false, message: "Failed to get profile data" };
    const profileId = user_metadata.user?.profileId;
    if (!profileId) return { sucess: false, message: "Profile not found" };
    const profile = await prisma.profile.findUnique({
      where: {
        id: profileId,
      },
    });
    if (!profile) return { sucess: false, message: "Profile not found" };
    return { sucess: true, published: profile.published };
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return {
      sucess: false,
      message: errMessage || "Failed to get profile data",
    };
  }
}
