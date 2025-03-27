import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

import {
  icon,
  id,
  status,
  thumbnail,
  title,
} from "./base";
import { handleError } from "./handleError";

export const contactTypeSchema = z.object({
  id,
  title,
  icon,
  thumbnail,
  status,
});

export const contactTypeValidation = async (
  event: any,
  setError: Dispatch<SetStateAction<{ [x: string]: string } | undefined>>
) => {
  const formValues = event.target;
  try {
    const { title, icon, thumbnail, status } = formValues;
    const parsedData = {
      title: title.value,
      icon: icon.value,
      thumbnail: thumbnail.value,
      status: status.value === "on",
    };
    contactTypeSchema.parse(parsedData);
  } catch (error) {
    handleError(error, setError, event);
  }
};