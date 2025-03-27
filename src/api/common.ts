import toast from "react-hot-toast";

import { TupsertFunction } from "@/types";

export async function upsertAction (formData: any, upsertFunction: TupsertFunction, successMessage: string, postAction: () => void) {
  const data = await upsertFunction(formData);
  if (data?.message) toast.error(data.message);
  else {
    if (successMessage !== "") {
      toast.success(successMessage);
    }
    postAction();
  }
}
