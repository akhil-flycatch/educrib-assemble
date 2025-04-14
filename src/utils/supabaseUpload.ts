import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

/**
 * Uploads a file to Supabase storage and returns its public URL.
 * @param bucketName - The name of the Supabase storage bucket.
 * @param file - The file to upload.
 * @returns The public URL of the uploaded file or null if the upload fails.
 */
export const uploadFileToSupabase = async (bucketName: string, file: File): Promise<string | null> => {
  const uuid = crypto.randomUUID().replace(/-/g, "");
  const fileName = `${uuid}_${file.name}`;

  try {
    // Upload the file to Supabase storage
    const { data, error } = await supabase.storage.from(bucketName).upload(fileName, file);

    if (error) {
      console.error("Upload Error:", error.message);
      return null;
    }

    // Retrieve the public URL of the uploaded file
    const { data: publicUrlData, error: publicUrlError } = await supabase.storage
      .from(bucketName)
      .getPublicUrl(data.path);

    if (publicUrlError) {
      console.error("Error retrieving public URL:", publicUrlError.message);
      return null;
    }

    return publicUrlData.publicUrl || null;
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
};