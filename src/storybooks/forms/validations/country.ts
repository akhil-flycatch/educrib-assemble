import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

import {
  alias,
  code,
  currencyIdRequired,
  flag,
  localeRequired,
  status,
  title,
} from "./base";
import { handleError } from "./handleError";

export const countrySchema = z.object({
  title,
  alias,
  code,
  flag,
  locale: localeRequired,
  currencyId : currencyIdRequired,
  status,
});

export const countryValidation = async (
  event: any,
  setError: Dispatch<SetStateAction<{ [x: string]: string } | undefined>>
) => {
  const formValues = event.target;
  try {
    const { title, alias, code, flag, locale, currencyId, status } = formValues;
    const parsedData = {
      title: title.value,
      alias: alias.value,
      code: code.value,
      flag: flag.value,
      locale: locale.value,
      currencyId: currencyId.value,
      status: status.value === "on",
    };
    countrySchema.parse(parsedData);
  } catch (error) {
    handleError(error, setError, event);
  }
};



