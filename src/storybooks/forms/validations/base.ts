import { z } from "zod";

export const id = z.string().trim().optional();
export const icon = z.string().trim().optional();
export const thumbnail = z.string().trim().optional();
export const status = z.boolean().optional();
export const isFoundation = z.boolean().optional();
export const description = z.string().trim().optional();
export const link = z.string().trim().optional();
export const alias = z.string().trim().optional();
export const flag = z.string().trim().optional();
export const locale = z.string().trim().optional();
export const location = z.string().trim().optional();
export const currencyId = z.string().trim().optional();
export const capacity = z.string().optional();
export const courseId = z.string().trim().optional();
export const levelId = z.string().trim().optional();
export const specializationId = z.string().trim().optional();
export const intakeId = z.string().trim().optional();
export const duration = z.string().optional();
export const durationTypeId = z.string().trim().optional();
export const profileId = z.string().trim().optional();
export const facilityId = z.string().trim().optional();
export const avatar = z.string().trim().optional();
export const socialId = z.string().trim().optional();
export const mediaId = z.string().trim().optional();
export const countryId = z.string().trim().optional();
export const email = z.string().trim().optional();
export const website = z.string().trim().optional();
export const startDate = z.string().transform((str) => new Date(str)).optional();
export const endDate = z.string().transform((str) => new Date(str)).optional();
export const remuneration = z.string().trim().optional();
export const domain = z.string().trim().optional();
export const accomodation = z.boolean().optional();
export const benefits = z.string().trim().optional();
export const featured = z.boolean().optional();
export const recommended = z.boolean().optional();
export const verified = z.boolean().optional();
export const published = z.boolean().optional();
export const views = z.number().optional();
export const typeId = z.string().trim().optional();
export const categoryId = z.string().trim().optional();
export const name = z.string().trim().optional();
export const curriculumId = z.string().trim().optional();
export const managementId = z.string().trim().optional();
export const universityId = z.string().trim().optional();
export const establishedYear = z.string().optional();
export const canonical = z.string().trim().optional();
export const keywords = z.string().trim().optional();
export const designationId = z.string().trim().optional();
export const facilities = z.string().trim().optional();
export const images = z.string().trim().optional();
export const accreditationId = z.string().trim().optional();



export const rating = z.coerce.number().min(1, { message: "Rating must be at least 1" }).max(5, { message: "Rating cannot exceed 5" }).optional();
export const contactTypeId = z.string().trim().refine((value) => value !== undefined && value !== '', {
  message: "Contact Type is required",
});
export const phone = z.string().trim().regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/, { message: "Invalid phone number" }).refine((data) => data.trim() !== "", {
  message: "Phone number is required",
});
export const title = z.string().trim().min(3, { message: "Title must be at least 3 characters long" }).max(50, { message: "Title cannot exceed 50 characters" }).refine((data) => data.trim() !== "", { message: "Title is required" });
export const code = z.string().trim().regex(/^[A-Z]+$/, { message: "Code must contain only uppercase letters" })
.refine((data) => data.trim() !== "", {
  message: "Code is required",
});
export const verticalId = z.string().trim().refine((value) => value !== undefined && value !== '', {
  message: "Vertical is required",
});
export const countryIdRequired = z.string().trim().refine((value) => value !== undefined && value !== '', {
  message: "Country is required",
});
export const currencyIdRequired = z.string().trim().refine((value) => value !== undefined && value !== '', {
  message: "Currency is required",
});
export const localeRequired = z.string().trim().refine((value) => value !== undefined && value !== '', {
  message: "Locale is required",
});
export const shortAddress = z.string().trim().refine((value) => value !== undefined && value !== '', {
  message: "Short Address is required",
});
export const area = z.string().trim().refine((value) => value !== undefined && value !== '', {
  message: "Area is required",
});
export const region = z.string().trim().refine((value) => value !== undefined && value !== '', {
  message: "Region is required",
});
export const state = z.string().trim().refine((value) => value !== undefined && value !== '', {
  message: "State is required",
});

export const idRequired = id.refine((value) => value !== undefined && value !== '', {
  message: " is required",
});
export const titleRequired = title.refine((value) => value !== undefined && value !== '', {
  message: "Title is required",
});
export const iconRequired = icon.refine((value) => value !== undefined && value !== '', {
  message: "Icon is required",
});
export const thumbnailRequired = thumbnail.refine((value) => value !== undefined && value !== '', {
  message: "Thumbnail is required",
});
export const descriptionRequired = description.refine((value) => value !== undefined && value !== '', {
  message: "Description is required",
});
export const linkRequired = link.refine((value) => value !== undefined && value !== '', {
  message: "Link is required",
});
export const aliasRequired = alias.refine((value) => value !== undefined && value !== '', {
  message: "Alias is required",
});
export const codeRequired = code.refine((value) => value !== undefined && value !== '', {
  message: "Code is required",
});
export const flagRequired = flag.refine((value) => value !== undefined && value !== '', {
  message: "Flag is required",
});
export const locationRequired = location.refine((value) => value !== undefined && value !== '', {
  message: "Location is required",
});
export const capacityRequired = capacity.refine((value) => value !== undefined && value !== '', {
  message: "Capacity is required",
});
export const courseIdRequired = courseId.refine((value) => value !== undefined && value !== '', {
  message: "Course  is required",
});
export const levelIdRequired = levelId.refine((value) => value !== undefined && value !== '', {
  message: "Level  is required",
});
export const specializationIdRequired = specializationId.refine((value) => value !== undefined && value !== '', {
  message: "Specialization  is required",
});
export const intakeIdRequired = intakeId.refine((value) => value !== undefined && value !== '', {
  message: "Intake  is required",
});
export const durationRequired = duration.refine((value) => value !== undefined && value !== '', {
  message: "Duration is required",
});
export const durationTypeIdRequired = durationTypeId.refine((value) => value !== undefined && value !== '', {
  message: "Duration Type  is required",
});
export const profileIdRequired = profileId.refine((value) => value !== undefined && value !== '', {
  message: "Profile  is required",
});
export const facilityIdRequired = facilityId.refine((value) => value !== undefined && value !== '', {
  message: "Facility  is required",
});
export const avatarRequired = avatar.refine((value) => value !== undefined && value !== '', {
  message: "Avatar is required",
});
export const socialIdRequired = socialId.refine((value) => value !== undefined && value !== '', {
  message: "Social  is required",
});
export const mediaIdRequired = mediaId.refine((value) => value !== undefined && value !== '', {
  message: "Media  is required",
});
export const emailRequired = email.refine((value) => value !== undefined && value !== '', {
  message: "Email is required",
});
export const phoneRequired = phone.refine((value) => value !== undefined && value !== '', {
  message: "Phone is required",
});

export const websiteRequired = website.refine((value) => value !== undefined && value !== '', {
  message: "Website is required",
});
export const contactTypeIdRequired = contactTypeId.refine((value) => value !== undefined && value !== '', {
  message: "Contact Type  is required",
});
export const startDateRequired = startDate.refine((value) => value !== undefined && value instanceof Date && !isNaN(value.getTime()), {
  message: "Start Date is required",
});
export const endDateRequired = endDate.refine((value) => value !== undefined && value instanceof Date && !isNaN(value.getTime()), {
  message: "End Date is required",
});
export const remunerationRequired = remuneration.refine((value) => value !== undefined && value !== '', {
  message: "Remuneration is required",
});
export const domainRequired = domain.refine((value) => value !== undefined && value !== '', {
  message: "Domain is required",
});
export const benefitsRequired = benefits.refine((value) => value !== undefined && value !== '', {
  message: "Benefits is required",
});
export const typeIdRequired = typeId.refine((value) => value !== undefined && value !== '', {
  message: "Type  is required",
});
export const categoryIdRequired = categoryId.refine((value) => value !== undefined && value !== '', {
  message: "Category  is required",
});
export const nameRequired = name.refine((value) => value !== undefined && value !== '', {
  message: "Name is required",
});
export const ratingRequired = rating.refine((value) => value !== undefined , {
  message: "Rating is required",
});
export const curriculumIdRequired = curriculumId.refine((value) => value !== undefined && value !== '', {
  message: "Curriculum  is required",
});
export const managementIdRequired = managementId.refine((value) => value !== undefined && value !== '', {
  message: "Management  is required",
});
export const universityIdRequired = universityId.refine((value) => value !== undefined && value !== '', {
  message: "University  is required",
});
export const establishedYearRequired = establishedYear.refine((value) => value !== undefined, {
  message: "Established Year is required and should be a value less than the current year",
});
export const canonicalRequired = canonical.refine((value) => value !== undefined && value !== '', {
  message: "Canonical is required",
});
export const keywordsRequired = keywords.refine((value) => value !== undefined && value !== '', {
  message: "Keywords is required",
});
export const designationIdRequired = designationId.refine((value) => value !== undefined && value !== '', {
  message: "Designation  is required",
});
export const facilitiesRequired = facilities.refine((value) => value !== undefined && value !== '', {
  message: "Facilities is required",
});
export const imagesRequired = images.refine((value) => {
  if (typeof value !== 'string') {
    return false;
  }

  const links = value.split(',');
  const linkRegex = /^(http|https):\/\/[^ "]+$/;
  const filenameRegex = /^.*\.(jpg|jpeg|png|gif|webm|webp)$/;

  for (const link of links) {
    if (!linkRegex.test(link.trim()) && !filenameRegex.test(link.trim())) {
      return false;
    }
  }

  return true;
}, {
  message: "Images is required and should be with valid links",
});
export const accreditationIdRequired = accreditationId.refine((value) => value !== undefined && value !== '', {
  message: "Accreditation  is required",
});
export const verticalIdRequired = verticalId.refine((value) => value !== undefined && value !== '', {
  message: "Vertical  is required",
});
export const shortAddressRequired = shortAddress.refine((value) => value !== undefined && value !== '', {
  message: "Short Address is required",
});
export const areaRequired = area.refine((value) => value !== undefined && value !== '', {
  message: "Area is required",
});
export const regionRequired = region.refine((value) => value !== undefined && value !== '', {
  message: "Region is required",
});
export const stateRequired = state.refine((value) => value !== undefined && value !== '', {
  message: "State is required",
});
