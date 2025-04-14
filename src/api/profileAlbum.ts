"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { slugify } from "@/utils/string";
import { ROUTES } from "@/constants/route";
import { errorMessageGenerator } from "@/utils/errorHandler";
import { cookies } from "next/headers";
import { createRouteHandlerClient, createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function createProfileAlbum(formData: FormData) {
  const supabase = await createServerActionClient({ cookies });
  const user = await supabase.auth.getUser();

  try {
    const title = (formData.get("title") as string) || "NA";
    const images = formData.getAll("images") as string[];
    const profileId = user.data.user?.user_metadata.profileId;

    console.log(images, "images inside upsertProfileAlbum");

    // Create a new album
    const album = await prisma.album.create({
      data: {
        title,
        slug: slugify(title),
        profileId,
      },
    });

    // Add images to the album if provided
    if (images.length > 0) {
      const albumId = album.id;
      await prisma.image.createMany({
        data: images.map((image) => ({
          url: image,
          albumId,
        })),
      });
    }

    revalidatePath(ROUTES.CONTACT_TYPES);
    return { message: "Album created successfully" };
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to create album" };
  }
}

export async function upsertProfileAlbumTitle(formData: FormData) {
  const supabase = await createServerActionClient({ cookies });
  const user = await supabase.auth.getUser();

  try {
    const albumId = formData.get("id") as string; // Get the album ID from the form data
    const newTitle = (formData.get("title") as string) || "NA"; // Get the new title
    const profileId = user.data.user?.user_metadata.profileId;

    if (!albumId) {
      return { message: "Album ID is required to update the title" };
    }

    // Update the album title
    const updatedAlbum = await prisma.album.update({
      where: {
        id: albumId,
        profileId: profileId, // Ensure the album belongs to the current user
      },
      data: {
        title: newTitle,
        slug: slugify(newTitle), // Update the slug based on the new title
      },
    });

    revalidatePath(ROUTES.CONTACT_TYPES);
    return { message: "Album title updated successfully", album: updatedAlbum };
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to update album title" };
  }
}


export async function getAllProfileAlbums(filter: { active: boolean} = { active: false}) {
    const supabase = await createServerActionClient({ cookies });
    const user = await supabase.auth.getUser();

    const profileId = user.data.user?.user_metadata.profileId;

  const albums = await prisma.album.findMany({
    where: {
      profileId: profileId,
    },
  });
  return albums;
}

export async function getLatestProfileAlbums(filter: { active: boolean} = { active: false}) {

    const supabase = await createServerActionClient({ cookies });
    const user = await supabase.auth.getUser();

    const profileId = user.data.user?.user_metadata.profileId;
  const albums = await prisma.album.findMany({
    where: {
      profileId: profileId,
    },
    orderBy: {
      created_at: "desc",
    },
    include: {
      image: true,
    },
  });
  return albums;
}

export async function deleteAlbumById(albumId: string) {
  try {
    // Delete associated images first
    await prisma.image.deleteMany({
      where: {
        albumId: albumId,
      },
    });

    // Delete the album
    await prisma.album.delete({
      where: {
        id: albumId,
      },
    });
    revalidatePath(ROUTES.IMAGES);
    return { message: "Album deleted successfully" };
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to delete album" };
  }
}


