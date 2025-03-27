import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

import {
  avatar,
  designationId,
  id,
  profileId,
  status,
  title} from "./base";
import { handleError } from "./handleError";

export const staffSchema = z.object({
  id,
  profileId,
  designationId,
  avatar,
  title,
  status
});

export const staffValidation = async (
  event: any,
  setError: Dispatch<SetStateAction<{ [x: string]: string } | undefined>>
) => {
  const formValues = event.target;
  try {
    const {
      profileId,
      designationId,
      avatar,
      title,
      status } = formValues;
    const parsedData = {
      profileId: profileId.value,
      designationId: designationId.value,
      avatar: avatar.value,
      title: title.value,
      status: status.value === "on",
    };
    staffSchema.parse(parsedData);
  } catch (error) {
    handleError(error, setError, event);
  }
};