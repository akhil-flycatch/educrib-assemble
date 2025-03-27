import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

import {
  avatar,
  categoryIdRequired,
  description,
  endDateRequired,
  featured ,
  id,
  location,
  profileId,
  published ,
  recommended ,
  startDateRequired,
  status ,
  thumbnail,
  title,
  typeIdRequired,
  verified ,
  website} from "./base";
import { handleError } from "./handleError";

export const eventSchema = z.object({
  id,
  title,
  description,
  avatar,
  thumbnail,
  website,
  featured ,
  recommended ,
  verified ,
  published ,
  profileId,
  status ,
  location,
  startDate : startDateRequired,
  endDate : endDateRequired,
  typeId : typeIdRequired,
  categoryId : categoryIdRequired
});

export const eventValidation = async (
  event: any,
  setError: Dispatch<SetStateAction<{ [x: string]: string } | undefined>>
) => {
  const formValues = event.target;
  try {
    const {
      title,
      description,
      avatar,
      thumbnail,
      website,
      featured ,
      recommended ,
      verified ,
      published ,
      profileId,
      status ,
      location,
      startDate,
      endDate,
      typeId,
      categoryId
     } = formValues;
    const parsedData = {
      title: title.value,
      description: description.value,
      avatar: avatar.value,
      thumbnail: thumbnail.value,
      website: website.value,
      featured : featured.value === "on",
      recommended : recommended.value === "on",
      verified : verified.value === "on",
      published : published.value === "on",
      profileId: profileId.value,
      status : status.value === "on",
      location: location.value,
      startDate: startDate.value,
      endDate: endDate.value,
      typeId: typeId.value,
      categoryId: categoryId.value
    };
    eventSchema.parse(parsedData);
  } catch (error) {
    handleError(error, setError, event);
  }
};