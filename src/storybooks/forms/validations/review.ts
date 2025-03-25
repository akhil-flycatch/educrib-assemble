import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

import {
  description,
  emailRequired,
  id,
  location,
  nameRequired,
  phone,
  profileId,
  rating,
  status,
  title
} from "./base";
import { handleError } from "./handleError";

export const reviewSchema = z.object({
  id,
  title,
  description,
  email : emailRequired,
  name : nameRequired,
  phone,
  location,
  rating,
  profileId,
  status
});

export const reviewValidation = async (
  event: any,
  setError: Dispatch<SetStateAction<{ [x: string]: string } | undefined>>
) => {
  const formValues = event.target;
  try {
    const {
      title,
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
      title: title.value,
      description: description.value,
      email: email.value,
      name: name.value,
      phone: phone.value,
      location: location.value,
      rating: rating.value,
      profileId: profileId.value,
      status: status.value === "on",
    };
    reviewSchema.parse(parsedData);
  } catch (error) {
    handleError(error, setError, event);
  }
};