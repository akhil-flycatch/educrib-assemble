import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

import {
  code,
  icon,
  id,
  status,
  title,
} from "./base";
import { handleError } from "./handleError";

export const currencieschema = z.object({
  id,
  title,
  icon,
  code,
  status,
});

export const currencyValidation = async (
  event: any,
  setError: Dispatch<SetStateAction<{ [x: string]: string } | undefined>>
) => {
  const formValues = event.target;
  try {
    const { title, icon, code, status } = formValues;
    const parsedData = {
      title: title.value,
      icon: icon.value,
      code: code.value,
      status: status.value === "on",
    };
    currencieschema.parse(parsedData);
  } catch (error) {
    handleError(error, setError, event);
  }
};