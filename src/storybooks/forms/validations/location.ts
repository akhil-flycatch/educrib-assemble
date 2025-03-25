import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

import {
  alias,
  area,
  countryIdRequired,
  id,
  profileId,
  region,
  shortAddress,
  state,
  title,
} from "./base";
import { handleError } from "./handleError";

export const locationSchema = z.object({
  id,
  title,
  alias,
  shortAddress,
  area,
  region,
  state,
  countryId : countryIdRequired,
  profileId,
});

export const locationValidation = async (
  event: any,
  setError: Dispatch<SetStateAction<{ [x: string]: string } | undefined>>
) => {
  const formValues = event.target;
  try {
    const {title, alias, shortAddress, area, region, state, countryId, profileId } = formValues;
    const parsedData = {
      title: title.value,
      alias: alias.value,
      shortAddress: shortAddress.value,
      area: area.value,
      region: region.value,
      state: state.value,
      countryId: countryId.value,
      profileId: profileId.value,
    };
    locationSchema.parse(parsedData);
  } catch (error) {
    handleError(error, setError, event);
  }
};