// import {
//   accreditation,
//   category,
//   contactType,
//   country,
//   course,
//   currency,
//   curriculum,
//   designation,
//   durationType,
//   facility,
//   intake,
//   level,
//   management,
//   media,
//   social,
//   specialization,
//   type,
//   university,
//   vertical
// } from "@educrib/database/client";

import { ProfileJoin } from "@/types";

export type TOption = {
  label: string;
  value: string;
};

export type callback = (_: TOption[]) => void;

export type searchFn = (
  _: string
) => Promise<any[] | ProfileJoin[] | undefined | null>;

export type AutoCompleteProps = {
  defaultValue?: TOption | TOption[] | undefined;
  searchFn: searchFn;
  limit?: number;
  name: string;
  placeholder: string;
  slugAsValue?: boolean;
  acceptMultiple?: boolean;
  readOnly?: boolean;
  className?: string;
  value?: string | TOption;
  onChange?: (_: TOption) => void;
  required?: boolean;
  showImages?: boolean;
  navLink?: string;
  navComponent?: boolean;
  navTitle?: string;
  creatable?: boolean;
};
