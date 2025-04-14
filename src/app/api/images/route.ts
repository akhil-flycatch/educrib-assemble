import { getImagesByAlbumId, addImageByAlbumId, deleteImageById } from "@/api/profileImages";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<any>({ cookies: () => cookieStore });

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      return new Response(
        JSON.stringify({ message: `Authentication error: ${userError.message}` }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { searchParams } = new URL(request.url);
    const albumId = searchParams.get("albumId");

    if (!albumId) {
      return new Response(
        JSON.stringify({ message: "Missing albumId query parameter" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const images = await getImagesByAlbumId(albumId);

    return new Response(
      JSON.stringify({ message: "Success", data: images }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error fetching images:", error);
    return new Response(
      JSON.stringify({ message: "An error occurred", error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST(request: Request) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<any>({ cookies: () => cookieStore });

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      return new Response(
        JSON.stringify({ message: `Authentication error: ${userError.message}` }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const body = await request.json();
    const { albumId, imageUrl } = body;

    if (!albumId || !imageUrl) {
      return new Response(
        JSON.stringify({ message: "Missing albumId or imageUrl in request body" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const result = await addImageByAlbumId(albumId, imageUrl);

    return new Response(
      JSON.stringify({ message: "Image added successfully", data: result }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error adding image:", error);
    return new Response(
      JSON.stringify({ message: "An error occurred", error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}




export async function DELETE(request: Request) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<any>({ cookies: () => cookieStore });

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      return new Response(
        JSON.stringify({ message: `Authentication error: ${userError.message}` }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const body = await request.json();
    const { imageId } = body;

    if (!imageId) {
      return new Response(
        JSON.stringify({ message: "Missing imageId in request body" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const result = await deleteImageById(imageId);

    return new Response(
      JSON.stringify({ message: "Image deleted successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error deleting image:", error);
    return new Response(
      JSON.stringify({ message: "An error occurred", error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}