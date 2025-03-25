import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

import {
  id,
  linkRequired,
  mediaIdRequired,
  profileId,
  status,
} from "./base";
import { handleError } from "./handleError";

export const profileMediaSchema = z.object({
  id,
  status,
  mediaId: mediaIdRequired,
  link : linkRequired,
  profileId,

});

export const profileMediaValidation = async (
  event: any,
  setError: Dispatch<SetStateAction<{ [x: string]: string } | undefined>>
) => {
  const formValues = event.target;
  try {
    const {
      id,
      status,
      mediaId,
      profileId,
      link,
    } = formValues;

    const parsedData = {
      id: id.value,
      status: status.checked,
      profileId: profileId.value,
      mediaId: mediaId.value,
      link: link.value,
    };

    profileMediaSchema.parse(parsedData);
  } catch (error) {
    handleError(error, setError, event);
  }
};