import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

import {
  canonical,
  description,
  id,
  keywords,
  profileId,
  thumbnail,
  title} from "./base";
import { handleError } from "./handleError";

export const seoSchema = z.object({
  id,
  profileId,
  title,
  description,
  keywords,
  canonical,
  thumbnail,
});

export const seoValidation = async (
  event: any,
  setError: Dispatch<SetStateAction<{ [x: string]: string } | undefined>>
) => {
  const formValues = event.target;
  try {
    const {
      profileId,
      title,
      description,
      keywords,
      canonical,
      thumbnail,
    } = formValues;

    const parsedData = {
      profileId: profileId.value,
      title: title.value,
      description: description.value,
      thumbnail: thumbnail.value,
      canonical: canonical.value,
      keywords: keywords.value,
    };
    seoSchema.parse(parsedData);
  } catch (error) {
    handleError(error, setError, event);
  }
};