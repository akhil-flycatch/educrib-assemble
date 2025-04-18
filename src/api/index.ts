export { deleteAccreditation,getAccreditationsBySlug,getAllAccreditations, getLatestAccreditations, searchAccreditations, upsertAccreditation} from "./accreditation";
export { deleteCategory, getCategoryBySlug, getLatestCategories, searchCategories, upsertCategory } from "./category";
export { upsertAction } from "./common";
export { deleteContactType,getAllContactTypes, getContactTypeBySlug,getLatestContactTypes, searchContactTypes, upsertContactType} from "./contactType";
export { deleteCountry,getAllCountries, getCountryBySlug, getLatestCountries, searchCountries, upsertCountry } from "./country";
export { deleteCourse, getAllCourses,getCourseById, getCourseBySlug, getLatestCourses, searchCourse, upsertCourse } from "./course";
export { deleteCurrency,getAllCurrencies,getCurrencyById, getCurrencyBySlug, getLatestCurrencies, searchCurrencies, upsertCurrency } from "./currency";
export { deleteCurriculum,getAllCurriculums, getCurriculumBySlug, getLatestCurriculums, searchCurriculums, upsertCurriculum } from "./curriculum";
export { deleteDesignation,getAllDesignations, getDesignationBySlug, getLatestDesignations, searchDesignations, upsertDesignation } from "./designation";
export { deleteDurationType,getAllDurationTypes,getDurationTypeById, getDurationTypeBySlug, getLatestDurationTypes, searchDurationTypes, upsertDurationType} from "./durationType";
export { deleteFacility,getAllFacilities, getFacilityBySlug,getLatestFacilities, searchFacilities, upsertFacility} from "./facility";
export { deleteFrequency,getAllFrequencies, getFrequencyBySlug, getLatestFrequencies, searchFrequencies, upsertFrequency} from "./frequency";
export { deleteIntake,getAllIntakes,getIntakeById, getIntakeBySlug, getLatestIntakes, searchIntakes, upsertIntake } from "./intake";
export { deleteLevel,getAllLevels, getLatestLevels,getLevelById, getLevelBySlug, searchLevels, upsertLevel } from "./level";
export { deleteLocation,deleteLocationByProfileId, getAllLocations, getLatestLocations, getLocation, getLocationByProfileId, getLocationByProfileSlug, getLocationBySlug, searchLocations, upsertLocation } from "./location";
export { deleteManagement, getAllManagements, getLatestManagements, getManagementBySlug,searchManagement, upsertManagement } from './management'
export { deleteMedia, getAllMedia, getLatestMedia, getMediaBySlug, searchMedia,upsertMedia } from "./media";
export { deleteProfile,getAllProfiles, getLatestProfiles, getProfile, getProfileById, getProfileBySlug, searchProfiles,updataImageToProfile, upsertProfile,upsertProfileOfUser } from "./profile";
export { createMultipleProfileAccreditations,deleteProfileAccreditation, deleteProfileAccreditationByProfileId, getAllProfileAccreditations, getProfileAccreditationById, getProfileAccreditations, getProfileAccreditationsByProfileId, getProfileAccreditationsByProfileSlug, searchProfileAccreditations, upsertProfileAccreditation} from "./profileAccreditation";
export { updateActivity} from "./profileActivity";
export { deleteProfileArticle,deleteProfileArticleByProfileId, getAllProfileArticles, getProfileArticleById, getProfileArticles, getProfileArticlesByProfileId, getProfileArticlesByProfileSlug, searchProfileArticles, upsertProfileArticle} from "./profileArticle";
export { deleteProfileContact, deleteProfileContactByProfileId, getAllProfileContacts, getProfileContacts, getProfileContactsByProfileId, getProfileContactsByProfileSlug, searchProfileContacts, upsertProfileContact} from "./profileContact";
export { deleteProfileEvent, deleteProfileEventByProfileId, getAllProfileEvents,getProfileEventById, getProfileEvents, getProfileEventsByProfileId, getProfileEventsByProfileSlug, searchProfileEvents, upsertProfileEvent} from "./profileEvent";
export { createMultipleProfileEventTicket,deleteProfileEventTicketByEventId, getAllProfileEventTickets } from "./profileEventTicket";
export { createMultipleProfileFacilities,deleteProfileFacility, deleteProfileFacilityByProfileId, getAllProfileFacilities, getProfileFacilities, getProfileFacilitiesByProfileId, getProfileFacilitiesByProfileSlug, searchProfileFacilities, upsertProfileFacility} from "./profileFacility";
export { deleteProfileHostel, deleteProfileHostelByProfileId, getAllProfileHostels, getProfileHostelById, getProfileHostels, getProfileHostelsByProfileId, getProfileHostelsByProfileSlug, searchProfileHostels, updataImageToProfileHostel, upsertProfileHostel} from "./profileHostel";
export { createMultipleProfileHostelContact,deleteProfileHostelContactByHostelId, getAllProfileHostelContacts } from "./profileHostelContact";
export { createMultipleProfileHostelFacility, deleteProfileHostelFacilityByHostelId, getAllProfileHostelFacilitys } from "./profileHostelFacility";
export { createMultipleProfileHostelFee, deleteProfileHostelFeeByHostelId, getAllProfileHostelFees} from "./profileHostelFee";
export { deleteProfileInternship,deleteProfileInternshipByProfileId, getAllProfileInternships, getProfileInternshipById, getProfileInternships, getProfileInternshipsByProfileId, getProfileInternshipsByProfileSlug, searchProfileInternships, upsertProfileInternship} from "./profileInternship";
export { deleteProfileJob, deleteProfileJobByProfileId, getAllProfileJobs, getProfileJobById, getProfileJobs, getProfileJobsByProfileId, getProfileJobsByProfileSlug, searchProfileJobs, upsertProfileJob} from "./profileJob";
export { deleteProfileMedia, deleteProfileMediaByProfileId, getAllProfileMedias, getProfileMedias, getProfileMediasByProfileId, getProfileMediasByProfileSlug, searchProfileMedias, upsertProfileMedia} from "./profileMedia";
export { deleteProfileNews,deleteProfileNewsByProfileId, getAllProfileNews, getProfileNews, getProfileNewsById, getProfileNewsByProfileId, getProfileNewsByProfileSlug, searchProfileNews, upsertProfileNews} from "./profileNews";
export { deleteProfilePlacement,deleteProfilePlacementByProfileId, getAllProfilePlacements, getProfilePlacementById, getProfilePlacements, getProfilePlacementsByProfileId, getProfilePlacementsByProfileSlug, searchProfilePlacements, upsertProfilePlacement} from "./profilePlacement";
export { deleteProfileProgram,deleteProfileProgramByProfileId, getAllProfileProgrammes, getLatestProfileProgrammes, getProfileProgramByProfileId, getProfileProgramByProfileSlug, getProfilePrograms, searchProfileProgrammes, upsertProfileProgram} from "./profileProgram";
export { createMultipleProfileProgrammeFee,deleteProfileProgrammeFeeByProgrammeId, getAllProfileProgrammeFees } from "./profileProgrammeFee";
export { deleteProfileRelation,deleteProfileRelationByProfileId, getAllProfileRelations, getProfileRelations, getProfileRelationsByProfileId, getProfileRelationsByProfileSlug, searchProfileRelations, upsertProfileRelation} from "./profileRelation";
export { deleteProfileRequestByProfileId, getProfileRequestByProfileId, getProfileRequestByProfileSlug, getProfileRequests,searchProfileRequest } from "./profileRequest";
export { deleteProfileReview, deleteProfileReviewByProfileId, getAllProfileReviews, getProfileReviewById, getProfileReviews, getProfileReviewsByProfileId, getProfileReviewsByProfileSlug, searchProfileReviews, upsertProfileReview} from "./profileReview";
export { deleteProfileScholarship, deleteProfileScholarshipByProfileId, getAllProfileScholarships, getProfileScholarshipById, getProfileScholarships,getProfileScholarshipsByProfileId, getProfileScholarshipsByProfileSlug, searchProfileScholarships, upsertProfileScholarship} from "./profileScholarship";
export { deleteProfileSocial, deleteProfileSocialByProfileId,getAllProfileSocials, getProfileSocials, getProfileSocialsByProfileId, getProfileSocialsByProfileSlug, searchProfileSocials, upsertProfileSocial} from "./profileSocial";
export { deleteProfileStaff, deleteProfileStaffByProfileId,getAllProfileStaffs, getProfileStaffById, getProfileStaffs, getProfileStaffsByProfileId, getProfileStaffsByProfileSlug, searchProfileStaffs, upsertProfileStaff} from "./profileStaff";
export { createMultipleProfileStaffContact, deleteProfileStaffContactByStaffId, getAllProfileStaffContacts } from "./profileStaffContact";
export { deleteSeo, deleteSeoByProfileId,getAllSeos, getLatestSeos, getSeo, getSeoByProfileId, getSeoByProfileSlug, searchSeos, upsertSeo} from "./seo";
export { deleteSocial,getAllSocials, getLatestSocials, getSocialBySlug,searchSocials, upsertSocial} from "./social";
export { deleteSpecialization,getAllSpecializations, getLatestSpecializations, getSpecializationById, getSpecializationBySlug,searchSpecialization, upsertSpecialization } from "./specialization";
export { deleteType,getAllTypes, getLatestTypes, getTypeBySlug, searchTypes, upsertType } from "./type"
export { deleteUniversity,getAllUniversities, getLatestUniversities, getUniversityBySlug, searchUniversities, upsertUniversity} from "./university";
export { checkProfilePublished,getUserMetadata,selectCategory,selectProfile,updateUser } from "./user"
export { deleteVertical,getAllVerticals, getLatestVerticals, getVerticalById, getVerticalBySlug,searchVerticals, upsertVertical} from "./vertical";