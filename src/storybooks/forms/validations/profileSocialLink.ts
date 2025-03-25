import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

import {
  id,
  linkRequired,
  profileId,
  socialIdRequired,
  status,
} from "./base";
import { handleError } from "./handleError";

export const profileSocialLinkSchema = z.object({
  id,
  status,
  socialId: socialIdRequired,
  link : linkRequired,
  profileId,
});

export const profileSocialLinkValidation = async (
  event: any,
  setError: Dispatch<SetStateAction<{ [x: string]: string } | undefined>>
) => {
  const formValues = event.target;
  try {
    const {
      id,
      status,
      socialId,
      profileId,
      link,
    } = formValues;

    const parsedData = {
      id: id.value,
      status: status.checked,
      profileId: profileId.value,
      socialId: socialId.value,
      link: link.value,
    };

    profileSocialLinkSchema.parse(parsedData);
  } catch (error) {
    handleError(error, setError, event);
  }
};