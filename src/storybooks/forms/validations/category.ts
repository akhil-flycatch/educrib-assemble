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

export const categorySchema = z.object({
  id,
  title,
  icon,
  thumbnail,
  verticalId,
  status,
});

export const categoryValidation = async (
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
    categorySchema.parse(parsedData);
  } catch (error) {
    handleError(error, setError, event);
  }
};