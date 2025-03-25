import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

import {
  accomodation,
  avatar,
  benefits,
  categoryIdRequired,
  currencyIdRequired,
  description,
  domain,
  durationRequired,
  durationTypeIdRequired,
  featured,
  id,
  locationRequired,
  profileId,
  published,
  recommended,
  remuneration,
  status,
  thumbnail,
  title,
  typeId,
  verified,
  websiteRequired,
} from "./base";
import { handleError } from "./handleError";

export const profileJobSchema = z.object({
  id,
  status,
  profileId,
  title,
  description,
  avatar,
  thumbnail,
  location : locationRequired,
  duration : durationRequired,
  durationTypeId : durationTypeIdRequired,
  domain,
  remuneration,
  currencyId : currencyIdRequired,
  accomodation,
  benefits,
  website : websiteRequired,
  featured,
  recommended,
  verified,
  published,
  typeId,
  categoryId : categoryIdRequired
});

export const profileJobValidation = async (
  event: any,
  setError: Dispatch<SetStateAction<{ [x: string]: string } | undefined>>
) => {
  const formValues = event.target;
  try {
    const {
      id,
      status,
      profileId,
      title,
      description,
      avatar,
      thumbnail,
      location,
      duration,
      durationTypeId,
      domain,
      remuneration,
      currencyId,
      accomodation,
      benefits,
      website,
      featured,
      recommended,
      verified,
      published,
      typeId,
      categoryId,
    } = formValues;

    const parsedData = {
      id: id.value,
      status: status.checked,
      profileId: profileId.value,
      title: title.value,
      description: description.value,
      avatar: avatar.value,
      thumbnail: thumbnail.value,
      location: location.value,
      duration: duration.value,
      durationTypeId: durationTypeId.value,
      domain: domain.value,
      remuneration: remuneration.value,
      currencyId: currencyId.value,
      accomodation: accomodation.checked,
      benefits: benefits.value,
      website: website.value,
      featured: featured.checked,
      recommended: recommended.checked,
      verified: verified.checked,
      published: published.checked,
      typeId: typeId.value,
      categoryId: categoryId.value,
    };

    profileJobSchema.parse(parsedData);
  } catch (error) {
    handleError(error, setError, event);
  }
};