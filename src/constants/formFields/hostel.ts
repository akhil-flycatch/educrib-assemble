import { formFiledsFinder } from "./finder";

const defaultFields = ['title', 'description', 'avatar', 'thumbnail', 'location', 'hostelFees', 'facilities', 'contactTypes', 'images', 'website', 'featured', 'recommended', 'verified', 'published', 'views', 'typeId', 'categoryId', 'status'];
export const fieldMapping: { [key: string]: string[] } = {
  schools: ['title', 'description', 'avatar', 'thumbnail', 'location', 'hostelFees', 'facilities', 'contactTypes', 'images', 'website', 'featured', 'recommended', 'verified', 'published', 'views', 'typeId', 'categoryId', 'status'],
  institutes: ['title', 'description', 'avatar', 'thumbnail', 'location', 'hostelFees', 'facilities', 'contactTypes', 'images', 'website', 'featured', 'recommended', 'verified', 'published', 'views', 'typeId', 'categoryId', 'status'],
};

export const hostelFormFields = () => formFiledsFinder(fieldMapping, defaultFields);