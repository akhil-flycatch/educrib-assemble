import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

import {
  accreditationId,
  id,
  profileId,
} from "./base";
import { handleError } from "./handleError";

export const profileAccreditationSchema = z.object({
  id,
  accreditationId,
  profileId,
});

export const profileAccreditationValidation = async (
  event: any,
  setError: Dispatch<SetStateAction<{ [x: string]: string } | undefined>>
) => {
  const formValues = event.target;
  try {
    const {
      id,
      accreditationId,
      profileId,
    } = formValues;

    const parsedData = {
      id: id.value,
      profileId: profileId.value,
      accreditationId: accreditationId.value,
    };
    profileAccreditationSchema.parse(parsedData);
  } catch (error) {
    handleError(error, setError, event);
  }
};