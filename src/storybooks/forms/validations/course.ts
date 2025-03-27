import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

import {
  description,
  icon,
  id,
  link,
  status,
  thumbnail,
  title,
} from "./base";
import { handleError } from "./handleError";


export const courseSchema = z.object({
  id,
  title,
  icon,
  thumbnail,
  status,
  description,
  link,
});



export const courseValidation = async (
  event: any,
  setError: Dispatch<SetStateAction<{ [x: string]: string } | undefined>>
) => {
  const formValues = event.target;
  try {
    const { title, icon, thumbnail, status, description, link } = formValues;
    const parsedData = {
      title: title.value,
      icon: icon.value,
      thumbnail: thumbnail.value,
      status: status.value === "on",
      description: description.value,
      link: link.value,
    };
    courseSchema.parse(parsedData);
  } catch (error) {
    handleError(error, setError, event);
  }
};



