"use server";


import { prisma } from "@/lib/prisma";
import { errorMessageGenerator } from "@/utils/errorHandler";





export async function upsertProfileAlbum(formData: FormData) {
  try{
    const id = formData.get("id") as string
    const url = (formData.get("url") as string) || "NA";
    const albumId = formData.get("albumId") as string;

    
    await prisma.image.upsert({
      where:{
        id,
      },
      create: {
        url,
        albumId,
      },
      update:{
        url,
        albumId,
      }
    });
  } catch(e: any){
    const {errMessage} = errorMessageGenerator(e);
    return {message: errMessage || "Failed to upsert contactType"}
  }
}


export async function getImagesByAlbumId(albumId: string) {
  try {
    const images = await prisma.image.findMany({
      where: {
        albumId: albumId, // Correctly filter by albumId
      },
    });
    return images;
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to get images" };
  }
}

export async function addImagesByAlbumId(albumId: string, imageUrls: string[]) {
  try {
    const createdImages = await prisma.image.createMany({
      data: imageUrls.map((url) => ({
        url,
        albumId,
      })),
    });
    return { message: "Images added successfully", count: createdImages.count };
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to add images" };
  }
}

export async function addImageByAlbumId(albumId: string, imageUrl: string) {

  console.log( imageUrl, "albumId and imageUrl");
  try {
    const createdImage = await prisma.image.create({
      data: {
        url: imageUrl.fileUrl,
        albumId,
      },
    });
    return { message: "Image added successfully", image: createdImage };
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to add image" };
  }
}

export async function deleteImageById(imageId: string) {
  console.log(imageId, "imageId");
  try {
    const deletedImage = await prisma.image.delete({
      where: {
        id: imageId,
      },
    });
    return { message: "Image deleted successfully", image: deletedImage };
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to delete image" };
  }
}




