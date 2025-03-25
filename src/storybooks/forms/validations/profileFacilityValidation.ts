import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

import {
  // facilityIdRequired,
  facilityId,
  id,
  profileId,
} from "./base";
import { handleError } from "./handleError";

export const profileFacilitySchema = z.object({
  id,
  facilityId,
  profileId,
});

export const profileFacilityValidation = async (
  event: any,
  setError: Dispatch<SetStateAction<{ [x: string]: string } | undefined>>
) => {
  const formValues = event.target;
  try {
    const {
      id,
      facilityId,
      profileId,
    } = formValues;

    const parsedData = {
      id: id.value,
      profileId: profileId.value,
      facilityId: facilityId.value,
    };

    profileFacilitySchema.parse(parsedData);
  } catch (error) {
    handleError(error, setError, event);
  }
};