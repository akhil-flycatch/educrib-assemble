"use server";

import { cookies } from "next/headers";

import { errorMessageGenerator } from "@/utils/errorHandler";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function updateActivity(profileId: string) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const user = await supabase.auth.getUser();
    console.log("the vlu", user.data.user?.id);

    await supabase.auth.updateUser({
      data: {
        ...user.data.user?.user_metadata,
        profileId: profileId,
      },
    });
  } catch (e: any) {
    const { errMessage } = errorMessageGenerator(e);
    return { message: errMessage || "Failed to update activity" };
  }
}
