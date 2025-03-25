import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

import {
  icon,
  id,
  isFoundation,
  status,
  thumbnail,
  title,
} from "./base";
import { handleError } from "./handleError";

export const verticalSchema = z.object({
  id,
  title,
  icon,
  thumbnail,
  status,
  isFoundation,
});

export const verticalValidation = async (
  event: any,
  setError: Dispatch<SetStateAction<{ [x: string]: string } | undefined>>
) => {
  const formValues = event.target;
  try {
    const { title, icon, thumbnail, status, isFoundation } = formValues;
    const parsedData = {
      title: title.value,
      icon: icon.value,
      thumbnail: thumbnail.value,
      status: status.value === "on",
      isFoundation: isFoundation.value === "on",
    };
    verticalSchema.parse(parsedData);
  } catch (error) {
    handleError(error, setError, event);
  }
};