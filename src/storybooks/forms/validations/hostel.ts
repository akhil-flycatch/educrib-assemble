import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

import {
  avatar,
  categoryIdRequired,
  description,
  facilityId,
  featured ,
  id,
  images,
  location,
  profileId,
  published ,
  recommended ,
  status ,
  thumbnail,
  title,
  typeIdRequired,
  verified ,
  website} from "./base";
import { handleError } from "./handleError";

export const profileHostelSchema = z.object({
  avatar,
  categoryId : categoryIdRequired,
  description,
  facilityId,
  featured ,
  id,
  images,
  location,
  profileId,
  published ,
  recommended ,
  status ,
  thumbnail,
  title,
  typeId : typeIdRequired,
  verified ,
  website
});

export const profileHostelValidation = async (
  event: any,
  setError: Dispatch<SetStateAction<{ [x: string]: string } | undefined>>
) => {
  const formValues = event.target;
  try {
    const {
      avatar,
      categoryId,
      description,
      facilityId,
      featured ,
      id,
      images,
      location,
      profileId,
      published ,
      recommended ,
      status ,
      thumbnail,
      title,
      typeId,
      verified ,
      website
    } = formValues;

    const parsedData = {
      avatar: avatar.value,
      categoryId: categoryId.value,
      description: description.value,
      facilities: facilityId.value,
      featured : featured.value === "on",
      id: id.value,
      images: images.value,
      location: location.value,
      profileId: profileId.value,
      published : published.value === "on",
      recommended : recommended.value === "on",
      status : status.value === "on",
      thumbnail: thumbnail.value,
      title: title.value,
      typeId: typeId.value,
      verified : verified.value === "on",
      website: website.value
    };

    profileHostelSchema.parse(parsedData);
  } catch (error) {
    handleError(error, setError, event);
  }
};