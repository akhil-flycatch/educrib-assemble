import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

import {
  icon,
  id,
  status,
  thumbnail,
  title,
  verticalId,
} from "./base";
import { handleError } from "./handleError";

export const typeSchema = z.object({
  id,
  title,
  icon,
  thumbnail,
  status,
  verticalId
});

export const typeValidation = async (
  event: any,
  setError: Dispatch<SetStateAction<{ [x: string]: string } | undefined>>
) => {
  const formValues = event.target;
  try {
    const { title, icon, thumbnail, status, verticalId } = formValues;
    const parsedData = {
      title: title.value,
      icon: icon.value,
      thumbnail: thumbnail.value,
      status: status.value === "on",
      verticalId: verticalId.value,
    };
    typeSchema.parse(parsedData);
  } catch (error) {
    handleError(error, setError, event);
  }
};