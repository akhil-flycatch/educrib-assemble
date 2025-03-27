import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

import {
  description,
  emailRequired,
  id,
  location,
  nameRequired,
  phoneRequired,
  profileId,
  rating,
  status,} from "./base";
import { handleError } from "./handleError";

export const relationSchema = z.object({
  id,
  description,
  email : emailRequired,
  name: nameRequired,
  phone : phoneRequired,
  location,
  rating,
  profileId,
  status
});

export const relationValidation = async (
  event: any,
  setError: Dispatch<SetStateAction<{ [x: string]: string } | undefined>>
) => {
  const formValues = event.target;
  try {
    const {
      description,
      email,
      name,
      phone,
      location,
      rating,
      profileId,
      status
    } = formValues;
    const parsedData = {
      description: description.value,
      email: email.value,
      name: name.value,
      phone: phone.value,
      location: location.value,
      rating: rating.value,
      profileId: profileId.value,
      status: status.value === "on",
    };
    relationSchema.parse(parsedData);
  } catch (error) {
    handleError(error, setError, event);
  }
};