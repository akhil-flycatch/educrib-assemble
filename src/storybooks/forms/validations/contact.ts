import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

import {
  contactTypeId,
  email,
  phone,
  profileId,
  status,
  title,
  website} from "./base";
import { handleError } from "./handleError";

export const contactSchema = z.object({
  title,
  phone,
  email,
  website,
  contactTypeId,
  profileId,
  status
});

export const contactValidation = async (
  event: any,
  setError: Dispatch<SetStateAction<{ [x: string]: string } | undefined>>
) => {
  const formValues = event.target;
  try {
    const { title, phone, email, website, contactTypeId, profileId , status } = formValues;
    const parsedData = {
      title: title.value,
      phone: phone.value,
      email: email.value,
      website: website.value,
      contactTypeId: contactTypeId.value,
      profileId: profileId.value,
      status: status.value === "on",
    };
    contactSchema.parse(parsedData);
  } catch (error) {
    handleError(error, setError, event);
  }
};



