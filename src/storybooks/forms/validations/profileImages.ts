import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

import {
  imagesRequired
} from "./base";
import { handleError } from "./handleError";

export const profileImageSchema = z.object({
  images: imagesRequired,
});

export const profileImageValidation = async (
  event: any,
  setError: Dispatch<SetStateAction<{ [x: string]: string } | undefined>>
) => {
  const formValues = event.target;
  try {
    const { image } = formValues;
    const parsedData = {
      images: image.value,
    };
    profileImageSchema.parse(parsedData);
  } catch (error) {
    handleError(error, setError, event);
  }
};