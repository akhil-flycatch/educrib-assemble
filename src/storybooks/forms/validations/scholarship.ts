import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

import {
  avatar,
  description,
  featured ,
  id,
  profileId,
  published ,
  recommended ,
  status,
  thumbnail,
  title,
  verified ,
  websiteRequired} from "./base";
import { handleError } from "./handleError";

export const scholarshipSchema = z.object({
  id,
  title,
  description,
  avatar,
  thumbnail,
  website : websiteRequired,
  featured ,
  recommended ,
  verified ,
  published ,
  profileId,
  status
});

export const scholarshipValidation = async (
  event: any,
  setError: Dispatch<SetStateAction<{ [x: string]: string } | undefined>>
) => {
  const formValues = event.target;
  try {
    const { title, description, avatar, website, featured, recommended, verified, published, thumbnail, status } = formValues;
    const parsedData = {
      title: title.value,
      thumbnail: thumbnail.value,
      status: status.value === "on",
      description: description.value,
      avatar: avatar.value,
      website: website.value,
      featured: featured.value === "on",
      recommended: recommended.value === "on",
      verified: verified.value === "on",
      published: published.value === "on",
    };
    scholarshipSchema.parse(parsedData);
  } catch (error) {
    handleError(error, setError, event);
  }
};