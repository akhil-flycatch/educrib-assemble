import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

const handleZodError = (error: z.ZodError, setError: Dispatch<SetStateAction<{ [x: string]: string } | undefined>>) => {
  const errors = error.errors.reduce((acc, curr) => {
    const key = curr.path[0];
    return { ...acc, [key]: curr.message };
  }, {});
  setError(errors);
};

export const handleError = (error: unknown, setError: Dispatch<SetStateAction<{ [x: string]: string } | undefined>>, event: any) => {
  if (error instanceof z.ZodError) {
    handleZodError(error, setError);
  }
  if (event.preventDefault) event.preventDefault();
}



