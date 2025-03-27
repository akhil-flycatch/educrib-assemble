import { Prisma } from "@prisma/client";

export function errorMessageGenerator(e: any) {
  // check if instance of Prisma error
  let errMessage = "";
  console.log(">>>>>>>>>>>>>>>>>>>",e);
  // eslint-disable-next-line no-console
  process.env.NODE_ENV === "development" && console.log(e);
  if (e.code) {
    // console.log("here",e.code);
    errMessage = prismaClientKnownError(e);
  }
  return { errMessage };
}

function prismaClientKnownError(e: Prisma.PrismaClientKnownRequestError) {
  switch (e.code) {
    case "P2002":
      // handle unique constraint error
      // handle the slug case
      // console.log("here",e.meta?.target);
      const target: string[] = (e.meta?.target as string[]) || [];
      const fieldNames = target.join(", ");
      const fieldName =
        fieldNames === "slug" ? "title" : (fieldNames as string) || "";
      return `${fieldName} should be unique`;
    case "P2003":
      // handle foreign key constraint error
      return `Invalid input data: ${e.meta?.target || ""}`;
    case "P2011":
      // handle mandatory field missing error
      return `Mandatory field missing: ${e.meta?.target || ""}`;
    case "P2014":
      // handle invalid id error
      return `Invalid ID: ${e.meta?.target || ""}`;
    default:
      return "";
  }
}
