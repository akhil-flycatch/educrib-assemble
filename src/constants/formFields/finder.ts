import { getProfile } from "@/api/index";

export const formFiledsFinder = async (
  fieldMapping: { [key: string]: string[] },
  defaultFields: string[]
) => {
  const profile = await getProfile();
  if (!profile) return defaultFields;
  const category = profile?.vertical?.slug ?? "";
  return fieldMapping[category] || defaultFields;
};
