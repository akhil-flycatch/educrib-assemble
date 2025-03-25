import * as z from "zod";

export const InstitutionOnboardFieldMapping: { [key: string]: string[] } = {
  college: ["title", "establishedYear", "accreditationId", "type", "universityId"],
  school: [
    "title",
    "establishedYear",
    "registrationNumber",
    "type",
    "curiculum",
  ],
  playschool: [
    "title",
    "establishedYear",
    "registrationNumber",
    "type",
    "curiculum",
  ],
  institutes: [
    "title",
    "establishedYear",
    "accreditationId",
    "type",
    "universityId",
  ],
  consulatants: [
    "title",
    "establishedYear",
    "accreditationId",
    "countries",
    "services",
  ],
  tutors: [
    "title",
    "experience",
    "subjects",
    "qualification",
    "mode",
    "availability",
  ],
  classes: [
    "title",
    "experience",
    "subjects",
    "qualification",
    "mode",
    "availability",
  ],
  internships: [
    "title",
    "companyName",
    "type",
    "description",
    "eligibility",
    "stipend",
  ],
};

export const LabelMapping = {
  college: {
    title: "College Name",
    establishedYear: "Established Year",
    accreditationId: "Accreditation",
    type: "Type",
    universityId: "University",
  },
  school: {
    title: "School Name",
    establishedYear: "Established Year",
    registrationNumber: "License/Registration Number",
    type: "School Type",
    curiculum: "Curriculum",
  },
  playschool: {
    title: "Playschool Name",
    establishedYear: "Established Year",
    registrationNumber: "License/Registration Number",
    type: "Type Of Playschool",
    curiculum: "Curriculum",
  },
  institutes: {
    title: "Institute Name",
    establishedYear: "Established Year",
    accreditationId: "Accreditations and Cerifications",
    type: "Course Type",
    universityId: "University Affiliation",
  },
  consulatants: {
    title: "Agency Name",
    establishedYear: "Established Year",
    accreditationId: "Accreditation",
    countries: "Countries Specialized In",
    services: "Services Offered",
  },
  tutors: {
    title: "Tutor/Institution Name",
    experience: "Years of Experience",
    subjects: "Subjects/Skills Taught",
    qualification: "Professional Qualification",
    mode: "Mode of Instruction",
    availability: "Timing & Availability",
  },
  classes: {
    title: "Tutor/Institutions Name",
    experience: "Years ofExperience",
    subjects: "Subjects/Skills Taught",
    qualification: "Professional Qualification",
    mode: "Mode of Instruction",
    availability: "Timing & Availability",
  },
  internships: {
    title: "Job/Internship Title",
    companyName: "Company/Organisation Name",
    type: "Internship Type",
    description: "Job/Internship Description",
    eligibility: "Eligibility Criteia",
    stipend: "Stipend/Salary",
  },
};

export const ZodValidations = {
  college: z.object({
    title: z.string().optional(),
    establishedYear: z
      .number()
      .min(1, "Year must be atleast 1")
      .max(new Date().getFullYear(), "Year must not be in the future")
      .optional()
      .nullable(),
    accreditationId: z.string().optional(),
    type: z.string().optional(),
    universityId: z.string().optional(),
  }),
  school: z.object({
    title: z.string().optional(),
    establishedYear: z
      .number()
      .min(1, "Year must be atleast 1")
      .max(new Date().getFullYear(), "Year must not be in the future")
      .optional(),
    registrationNumber: z.string().optional(),
    type: z.string().optional().nullable(),
    curiculum: z.string().optional(),
  }),
  playschool: z.object({
    title: z.string().optional(),
    establishedYear: z
      .number()
      .min(1, "Year must be atleast 1")
      .max(new Date().getFullYear(), "Year must not be in the future")
      .optional(),
    registrationNumber: z.string().optional(),
    type: z.string().optional().nullable(),
    curiculum: z.string().optional(),
  }),
  institutes: z.object({
    title: z.string().optional(),
    establishedYear: z
      .number()
      .min(1, "Year must be atleast 1")
      .max(new Date().getFullYear(), "Year must not be in the future")
      .optional()
      .nullable(),
    accreditationId: z.string().optional(),
    type: z.string().optional(),
    universityId: z.string().optional(),
  }),
  consulatants: z.object({
    title: z.string().optional(),
    establishedYear: z
      .number()
      .min(1, "Year must be atleast 1")
      .max(new Date().getFullYear(), "Year must not be in the future")
      .optional(),
    accreditationId: z.string().optional(),
    countries: z.string().optional(),
    services: z.string().optional(),
  }),
  tutors: z.object({
    title: z.string().optional(),
    experience: z
      .number()
      .min(0, "Experience must be a positive number")
      .optional()
      .nullable(),
    subjects: z.string().optional(),
    qualification: z.string().optional(),
    mode: z.string().optional(),
    availability: z.string().optional(),
  }),
  classes: z.object({
    title: z.string().optional(),
    experience: z
      .number()
      .min(0, "Experience must be a positive number")
      .optional()
      .nullable(),
    subjects: z.string().optional(),
    qualification: z.string().optional(),
    mode: z.string().optional(),
    availability: z.string().optional(),
  }),
  internships: z.object({
    title: z.string().optional(),
    companyName: z.string().optional(),
    type: z.string().optional(),
    description: z.string().optional(),
    eligibility: z.string().optional(),
    stipend: z.number().optional().nullable(),
  }),
};

export const unique = [
  "title",
  "establishedYear",
  "accreditationId",
  "type",
  "universityId",
  "registrationNumber",
  "curiculum",
  "countries",
  "services",
  "experience",
  "subjects",
  "qualification",
  "mode",
  "availability",
  "companyName",
  "description",
  "eligibility",
  "stipend",
  "website",
  "address",
  "city",
  "state",
  "district",
  "pincode",
  "email",
  "phone",
];
