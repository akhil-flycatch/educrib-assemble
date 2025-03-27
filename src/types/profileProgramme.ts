export interface ProfileProgramme {
  id: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  avatar?: null;
  thumbnail?: null;
  courseId: string;
  specializationId: string;
  profileId: string;
  intakeId: string;
  capacity: number;
  levelId: string;
  duration: number;
  durationTypeId: string;
  createdById?: null;
  updatedById?: null;
  upatedBy?: null;
  course: CourseOrSpecialization;
  durationType: FrequencyOrDurationTypeOrIntakeOrLevel;
  intake: FrequencyOrDurationTypeOrIntakeOrLevel;
  level: FrequencyOrDurationTypeOrIntakeOrLevel;
  specialization: CourseOrSpecialization;
  profileProgrammeFees?: ProfileProgrammeFeesEntity[] | null;
}
export interface CourseOrSpecialization {
  id: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  title: string;
  slug: string;
  icon?: null;
  thumbnail?: null;
  description?: null;
  link?: null;
  createdById?: null;
  updatedById?: null;
}
export interface FrequencyOrDurationTypeOrIntakeOrLevel {
  id: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  title: string;
  slug: string;
  icon?: null;
  thumbnail?: null;
  createdById?: null;
  updatedById?: null;
}
export interface ProfileProgrammeFeesEntity {
  id: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  title: string;
  amount: number;
  currencyId: string;
  frequencyId: string;
  profileProgrammeId: string;
  createdById?: null;
  updatedById?: null;
  currency: Currency;
  frequency: FrequencyOrDurationTypeOrIntakeOrLevel;
}
export interface Currency {
  id: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  title: string;
  code: string;
  slug: string;
  icon?: null;
  createdById?: null;
  updatedById?: null;
}
