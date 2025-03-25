-- CreateTable
CREATE TABLE "vertical" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT,
    "thumbnail" TEXT,
    "isFoundation" BOOLEAN NOT NULL DEFAULT true,
    "createdById" BIGINT,
    "updatedById" TEXT,

    CONSTRAINT "vertical_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT,
    "thumbnail" TEXT,
    "verticalId" TEXT,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "type" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT,
    "thumbnail" TEXT,
    "verticalId" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,

    CONSTRAINT "type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "country" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "alias" TEXT,
    "code" TEXT,
    "locale" TEXT,
    "currency" TEXT,
    "flag" TEXT,

    CONSTRAINT "country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "alias" TEXT,
    "shortAddress" TEXT NOT NULL,
    "area" TEXT,
    "region" TEXT,
    "state" TEXT,
    "countryId" TEXT,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "currency" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,

    CONSTRAINT "currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contactType" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT,
    "thumbnail" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,

    CONSTRAINT "contactType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "curriculum" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT,
    "thumbnail" TEXT,

    CONSTRAINT "curriculum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accreditation" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT,
    "thumbnail" TEXT,
    "description" TEXT,
    "link" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,

    CONSTRAINT "accreditation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "university" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT,
    "thumbnail" TEXT,
    "description" TEXT,
    "link" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,

    CONSTRAINT "university_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "management" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT,
    "thumbnail" TEXT,
    "description" TEXT,
    "link" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,

    CONSTRAINT "management_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "facility" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT,
    "thumbnail" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,

    CONSTRAINT "facility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "designation" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT,
    "thumbnail" TEXT,

    CONSTRAINT "designation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT,
    "thumbnail" TEXT,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT,
    "thumbnail" TEXT,

    CONSTRAINT "social_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "durationType" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT,
    "thumbnail" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,

    CONSTRAINT "durationType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "frequency" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT,
    "thumbnail" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,

    CONSTRAINT "frequency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "intake" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT,
    "thumbnail" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,

    CONSTRAINT "intake_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "level" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT,
    "thumbnail" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,

    CONSTRAINT "level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT,
    "thumbnail" TEXT,
    "description" TEXT,
    "link" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,

    CONSTRAINT "course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specialization" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT,
    "thumbnail" TEXT,
    "description" TEXT,
    "link" TEXT,
    "updatedById" TEXT,
    "createdById" TEXT,

    CONSTRAINT "specialization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "alias" TEXT,
    "slug" TEXT NOT NULL,
    "avatar" TEXT,
    "thumbnail" TEXT,
    "description" TEXT,
    "code" TEXT,
    "establishedYear" INTEGER,
    "verticalId" TEXT,
    "managementId" TEXT,
    "universityId" TEXT,
    "typeId" TEXT,
    "curriculumId" TEXT,
    "profileImages" TEXT[],
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "recommended" BOOLEAN NOT NULL DEFAULT false,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "views" INTEGER NOT NULL DEFAULT 1,
    "createdById" TEXT,
    "updatedById" TEXT,
    "userId" TEXT,
    "registrationNumber" TEXT,
    "countryId" TEXT[],
    "services" TEXT[],
    "yearsOfExperience" TEXT,
    "subjects" TEXT[],
    "qualifications" TEXT,
    "modeOfClassess" TEXT,
    "availability" TEXT,
    "companyName" TEXT,
    "eligibilty" TEXT,
    "stipend" DECIMAL,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "district" TEXT,
    "pincode" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "accreditationId" TEXT,
    "website" TEXT,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seo" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "keywords" TEXT[],
    "canonical" TEXT,
    "thumbnail" TEXT,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "seo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profileCategory" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profileId" TEXT,
    "categoryId" TEXT,

    CONSTRAINT "profileCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profileAccreditation" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profileId" TEXT,
    "accreditationId" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,

    CONSTRAINT "profileAccreditation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profileContact" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "website" TEXT,
    "contactTypeId" TEXT,
    "profileId" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,

    CONSTRAINT "profileContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profileStaff" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "avatar" TEXT,
    "title" TEXT NOT NULL,
    "designationId" TEXT,
    "profileId" TEXT,

    CONSTRAINT "profileStaff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profileStaffContact" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "website" TEXT,
    "contactTypeId" TEXT,
    "profileStaffId" TEXT,

    CONSTRAINT "profileStaffContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profileProgramme" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "avatar" TEXT,
    "thumbnail" TEXT,
    "courseId" TEXT,
    "specializationId" TEXT,
    "profileId" TEXT,
    "intakeId" TEXT,
    "capacity" INTEGER,
    "levelId" TEXT,
    "duration" INTEGER,
    "durationTypeId" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "upatedBy" BIGINT,

    CONSTRAINT "profileProgramme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profileProgrammeFee" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "amount" DOUBLE PRECISION,
    "currencyId" TEXT,
    "frequencyId" TEXT,
    "profileProgrammeId" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,

    CONSTRAINT "profileProgrammeFee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profileMedia" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "link" TEXT,
    "profileId" TEXT,
    "mediaId" TEXT,

    CONSTRAINT "profileMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profileSocial" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profileId" TEXT,
    "socialId" TEXT,
    "link" TEXT,

    CONSTRAINT "profileSocial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profileFacility" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profileId" TEXT,
    "facilityId" TEXT,
    "updatedById" TEXT,
    "createdById" TEXT,

    CONSTRAINT "profileFacility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profileReport" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "name" TEXT DEFAULT 'Anonymous',
    "phone" TEXT,
    "email" TEXT,
    "location" TEXT,
    "profileId" TEXT,

    CONSTRAINT "profileReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profileRequest" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "name" TEXT,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "location" TEXT,
    "profileId" TEXT,

    CONSTRAINT "profileRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profileRelation" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "location" TEXT,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "profileId" TEXT,

    CONSTRAINT "profileRelation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profileReview" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "name" TEXT,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "location" TEXT,
    "profileId" TEXT,
    "rating" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "profileReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profileEvent" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "profileId" TEXT,
    "avatar" TEXT,
    "categoryId" TEXT,
    "currencyId" TEXT,
    "description" TEXT,
    "endDate" TIMESTAMP(3),
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "images" TEXT[],
    "location" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "recommended" BOOLEAN NOT NULL DEFAULT false,
    "slug" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "thumbnail" TEXT,
    "ticket" INTEGER,
    "typeId" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "views" INTEGER NOT NULL DEFAULT 1,
    "website" TEXT,

    CONSTRAINT "profileEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profileEventTicket" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "amount" DOUBLE PRECISION,
    "currencyId" TEXT,
    "profileEventId" TEXT,

    CONSTRAINT "profileEventTicket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profileHostel" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "profileId" TEXT,
    "admissionFees" DOUBLE PRECISION,
    "avatar" TEXT,
    "categoryId" TEXT,
    "cautionDeposit" DOUBLE PRECISION,
    "currencyId" TEXT,
    "description" TEXT,
    "email" TEXT[],
    "facilities" TEXT[],
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "images" TEXT[],
    "laundryFees" DOUBLE PRECISION,
    "location" TEXT,
    "messFees" DOUBLE PRECISION,
    "phone" TEXT[],
    "published" BOOLEAN NOT NULL DEFAULT false,
    "recommended" BOOLEAN NOT NULL DEFAULT false,
    "slug" TEXT NOT NULL,
    "thumbnail" TEXT,
    "typeId" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "views" INTEGER NOT NULL DEFAULT 1,
    "website" TEXT,

    CONSTRAINT "profileHostel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profileHostelFee" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "amount" DOUBLE PRECISION,
    "currencyId" TEXT,
    "frequencyId" TEXT,
    "profileHostelId" TEXT,

    CONSTRAINT "profileHostelFee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profileHostelFacility" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profileHostelId" TEXT,
    "facilityId" TEXT,

    CONSTRAINT "profileHostelFacility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profileHostelContact" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "contactTypeId" TEXT,
    "profileHostelId" TEXT,

    CONSTRAINT "profileHostelContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profileJob" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "profileId" TEXT,
    "accomodation" BOOLEAN NOT NULL DEFAULT false,
    "avatar" TEXT,
    "benefits" TEXT[],
    "categoryId" TEXT,
    "currencyId" TEXT,
    "description" TEXT,
    "domain" TEXT,
    "duration" INTEGER,
    "durationTypeId" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "location" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "recommended" BOOLEAN NOT NULL DEFAULT false,
    "remuneration" INTEGER,
    "slug" TEXT NOT NULL,
    "thumbnail" TEXT,
    "typeId" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "views" INTEGER NOT NULL DEFAULT 1,
    "website" TEXT NOT NULL,

    CONSTRAINT "profileJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profileJobRequest" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "location" TEXT,
    "cv" TEXT NOT NULL,
    "profileJobId" TEXT,

    CONSTRAINT "profileJobRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profileInternship" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "avatar" TEXT,
    "thumbnail" TEXT,
    "description" TEXT,
    "profileId" TEXT,
    "accomodation" BOOLEAN NOT NULL DEFAULT false,
    "benefits" TEXT[],
    "categoryId" TEXT,
    "currencyId" TEXT,
    "domain" TEXT,
    "duration" INTEGER,
    "durationTypeId" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "location" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "recommended" BOOLEAN NOT NULL DEFAULT false,
    "remuneration" INTEGER,
    "typeId" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "views" INTEGER NOT NULL DEFAULT 1,
    "website" TEXT NOT NULL,

    CONSTRAINT "profileInternship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profileInternshipRequest" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "location" TEXT,
    "cv" TEXT NOT NULL,
    "profileInternshipId" TEXT,

    CONSTRAINT "profileInternshipRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profileNews" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "profileId" TEXT,
    "avatar" TEXT,
    "description" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "recommended" BOOLEAN NOT NULL DEFAULT false,
    "slug" TEXT NOT NULL,
    "thumbnail" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "views" INTEGER NOT NULL DEFAULT 1,
    "website" TEXT NOT NULL,

    CONSTRAINT "profileNews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profileArticle" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "profileId" TEXT,
    "avatar" TEXT,
    "description" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "recommended" BOOLEAN NOT NULL DEFAULT false,
    "slug" TEXT NOT NULL,
    "thumbnail" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "views" INTEGER NOT NULL DEFAULT 1,
    "website" TEXT NOT NULL,

    CONSTRAINT "profileArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profileScholarship" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "profileId" TEXT,
    "avatar" TEXT,
    "description" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "recommended" BOOLEAN NOT NULL DEFAULT false,
    "slug" TEXT NOT NULL,
    "thumbnail" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "views" INTEGER NOT NULL DEFAULT 1,
    "website" TEXT NOT NULL,

    CONSTRAINT "profileScholarship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profilePlacement" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "profileId" TEXT,
    "avatar" TEXT,
    "description" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "recommended" BOOLEAN NOT NULL DEFAULT false,
    "slug" TEXT NOT NULL,
    "thumbnail" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "views" INTEGER NOT NULL DEFAULT 1,
    "website" TEXT NOT NULL,

    CONSTRAINT "profilePlacement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profileRoute" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "avatar" TEXT,
    "thumbnail" TEXT,
    "description" TEXT,
    "code" TEXT,
    "time" TIMESTAMP(3),
    "plate" TEXT,
    "profileId" TEXT,

    CONSTRAINT "profileRoute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "phone" DECIMAL,
    "email" VARCHAR,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test" (
    "test_col" SMALLINT DEFAULT 1
);

-- CreateIndex
CREATE UNIQUE INDEX "vertical_title_key" ON "vertical"("title");

-- CreateIndex
CREATE UNIQUE INDEX "vertical_slug_key" ON "vertical"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "category_title_key" ON "category"("title");

-- CreateIndex
CREATE UNIQUE INDEX "category_slug_key" ON "category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "type_title_key" ON "type"("title");

-- CreateIndex
CREATE UNIQUE INDEX "type_slug_key" ON "type"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "country_title_key" ON "country"("title");

-- CreateIndex
CREATE UNIQUE INDEX "country_slug_key" ON "country"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "location_title_key" ON "location"("title");

-- CreateIndex
CREATE UNIQUE INDEX "location_slug_key" ON "location"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "location_profileId_key" ON "location"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "currency_title_key" ON "currency"("title");

-- CreateIndex
CREATE UNIQUE INDEX "currency_code_key" ON "currency"("code");

-- CreateIndex
CREATE UNIQUE INDEX "currency_slug_key" ON "currency"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "contactType_title_key" ON "contactType"("title");

-- CreateIndex
CREATE UNIQUE INDEX "contactType_slug_key" ON "contactType"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "curriculum_title_key" ON "curriculum"("title");

-- CreateIndex
CREATE UNIQUE INDEX "curriculum_slug_key" ON "curriculum"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "accreditation_title_key" ON "accreditation"("title");

-- CreateIndex
CREATE UNIQUE INDEX "accreditation_slug_key" ON "accreditation"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "university_title_key" ON "university"("title");

-- CreateIndex
CREATE UNIQUE INDEX "university_slug_key" ON "university"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "management_title_key" ON "management"("title");

-- CreateIndex
CREATE UNIQUE INDEX "management_slug_key" ON "management"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "facility_title_key" ON "facility"("title");

-- CreateIndex
CREATE UNIQUE INDEX "facility_slug_key" ON "facility"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "designation_title_key" ON "designation"("title");

-- CreateIndex
CREATE UNIQUE INDEX "designation_slug_key" ON "designation"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "media_title_key" ON "media"("title");

-- CreateIndex
CREATE UNIQUE INDEX "media_slug_key" ON "media"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "social_title_key" ON "social"("title");

-- CreateIndex
CREATE UNIQUE INDEX "social_slug_key" ON "social"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "durationType_title_key" ON "durationType"("title");

-- CreateIndex
CREATE UNIQUE INDEX "durationType_slug_key" ON "durationType"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "frequency_title_key" ON "frequency"("title");

-- CreateIndex
CREATE UNIQUE INDEX "frequency_slug_key" ON "frequency"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "intake_title_key" ON "intake"("title");

-- CreateIndex
CREATE UNIQUE INDEX "intake_slug_key" ON "intake"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "level_title_key" ON "level"("title");

-- CreateIndex
CREATE UNIQUE INDEX "level_slug_key" ON "level"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "course_title_key" ON "course"("title");

-- CreateIndex
CREATE UNIQUE INDEX "course_slug_key" ON "course"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "specialization_title_key" ON "specialization"("title");

-- CreateIndex
CREATE UNIQUE INDEX "specialization_slug_key" ON "specialization"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "profile_title_key" ON "profile"("title");

-- CreateIndex
CREATE UNIQUE INDEX "profile_slug_key" ON "profile"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "seo_profileId_key" ON "seo"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "profileEvent_slug_key" ON "profileEvent"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "profileHostel_slug_key" ON "profileHostel"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "profileJob_slug_key" ON "profileJob"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "profileInternship_slug_key" ON "profileInternship"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "profileNews_slug_key" ON "profileNews"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "profileArticle_slug_key" ON "profileArticle"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "profileScholarship_slug_key" ON "profileScholarship"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "profilePlacement_slug_key" ON "profilePlacement"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "profileRoute_slug_key" ON "profileRoute"("slug");

-- AddForeignKey
ALTER TABLE "vertical" ADD CONSTRAINT "vertical_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_verticalId_fkey" FOREIGN KEY ("verticalId") REFERENCES "vertical"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "type" ADD CONSTRAINT "type_verticalId_fkey" FOREIGN KEY ("verticalId") REFERENCES "vertical"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_curriculumId_fkey" FOREIGN KEY ("curriculumId") REFERENCES "curriculum"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_managementId_fkey" FOREIGN KEY ("managementId") REFERENCES "management"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "university"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_verticalId_fkey" FOREIGN KEY ("verticalId") REFERENCES "vertical"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seo" ADD CONSTRAINT "seo_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileCategory" ADD CONSTRAINT "profileCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileCategory" ADD CONSTRAINT "profileCategory_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileAccreditation" ADD CONSTRAINT "profileAccreditation_accreditationId_fkey" FOREIGN KEY ("accreditationId") REFERENCES "accreditation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileAccreditation" ADD CONSTRAINT "profileAccreditation_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileContact" ADD CONSTRAINT "profileContact_contactTypeId_fkey" FOREIGN KEY ("contactTypeId") REFERENCES "contactType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileContact" ADD CONSTRAINT "profileContact_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileStaff" ADD CONSTRAINT "profileStaff_designationId_fkey" FOREIGN KEY ("designationId") REFERENCES "designation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileStaff" ADD CONSTRAINT "profileStaff_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileStaffContact" ADD CONSTRAINT "profileStaffContact_contactTypeId_fkey" FOREIGN KEY ("contactTypeId") REFERENCES "contactType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileStaffContact" ADD CONSTRAINT "profileStaffContact_profileStaffId_fkey" FOREIGN KEY ("profileStaffId") REFERENCES "profileStaff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileProgramme" ADD CONSTRAINT "profileProgramme_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileProgramme" ADD CONSTRAINT "profileProgramme_durationTypeId_fkey" FOREIGN KEY ("durationTypeId") REFERENCES "durationType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileProgramme" ADD CONSTRAINT "profileProgramme_intakeId_fkey" FOREIGN KEY ("intakeId") REFERENCES "intake"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileProgramme" ADD CONSTRAINT "profileProgramme_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "level"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileProgramme" ADD CONSTRAINT "profileProgramme_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileProgramme" ADD CONSTRAINT "profileProgramme_specializationId_fkey" FOREIGN KEY ("specializationId") REFERENCES "specialization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileProgramme" ADD CONSTRAINT "profileProgramme_upatedBy_fkey" FOREIGN KEY ("upatedBy") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "profileProgrammeFee" ADD CONSTRAINT "profileProgrammeFee_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileProgrammeFee" ADD CONSTRAINT "profileProgrammeFee_frequencyId_fkey" FOREIGN KEY ("frequencyId") REFERENCES "frequency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileProgrammeFee" ADD CONSTRAINT "profileProgrammeFee_profileProgrammeId_fkey" FOREIGN KEY ("profileProgrammeId") REFERENCES "profileProgramme"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileMedia" ADD CONSTRAINT "profileMedia_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileMedia" ADD CONSTRAINT "profileMedia_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileSocial" ADD CONSTRAINT "profileSocial_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileSocial" ADD CONSTRAINT "profileSocial_socialId_fkey" FOREIGN KEY ("socialId") REFERENCES "social"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileFacility" ADD CONSTRAINT "profileFacility_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "facility"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileFacility" ADD CONSTRAINT "profileFacility_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileReport" ADD CONSTRAINT "profileReport_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileRequest" ADD CONSTRAINT "profileRequest_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileRelation" ADD CONSTRAINT "profileRelation_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileReview" ADD CONSTRAINT "profileReview_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileEvent" ADD CONSTRAINT "profileEvent_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileEvent" ADD CONSTRAINT "profileEvent_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileEvent" ADD CONSTRAINT "profileEvent_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileEvent" ADD CONSTRAINT "profileEvent_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileEventTicket" ADD CONSTRAINT "profileEventTicket_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileEventTicket" ADD CONSTRAINT "profileEventTicket_profileEventId_fkey" FOREIGN KEY ("profileEventId") REFERENCES "profileEvent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileHostel" ADD CONSTRAINT "profileHostel_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileHostel" ADD CONSTRAINT "profileHostel_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileHostel" ADD CONSTRAINT "profileHostel_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileHostel" ADD CONSTRAINT "profileHostel_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileHostelFee" ADD CONSTRAINT "profileHostelFee_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileHostelFee" ADD CONSTRAINT "profileHostelFee_frequencyId_fkey" FOREIGN KEY ("frequencyId") REFERENCES "frequency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileHostelFee" ADD CONSTRAINT "profileHostelFee_profileHostelId_fkey" FOREIGN KEY ("profileHostelId") REFERENCES "profileHostel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileHostelFacility" ADD CONSTRAINT "profileHostelFacility_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "facility"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileHostelFacility" ADD CONSTRAINT "profileHostelFacility_profileHostelId_fkey" FOREIGN KEY ("profileHostelId") REFERENCES "profileHostel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileHostelContact" ADD CONSTRAINT "profileHostelContact_contactTypeId_fkey" FOREIGN KEY ("contactTypeId") REFERENCES "contactType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileHostelContact" ADD CONSTRAINT "profileHostelContact_profileHostelId_fkey" FOREIGN KEY ("profileHostelId") REFERENCES "profileHostel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileJob" ADD CONSTRAINT "profileJob_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileJob" ADD CONSTRAINT "profileJob_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileJob" ADD CONSTRAINT "profileJob_durationTypeId_fkey" FOREIGN KEY ("durationTypeId") REFERENCES "durationType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileJob" ADD CONSTRAINT "profileJob_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileJob" ADD CONSTRAINT "profileJob_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileJobRequest" ADD CONSTRAINT "profileJobRequest_profileJobId_fkey" FOREIGN KEY ("profileJobId") REFERENCES "profileJob"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileInternship" ADD CONSTRAINT "profileInternship_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileInternship" ADD CONSTRAINT "profileInternship_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileInternship" ADD CONSTRAINT "profileInternship_durationTypeId_fkey" FOREIGN KEY ("durationTypeId") REFERENCES "durationType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileInternship" ADD CONSTRAINT "profileInternship_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileInternship" ADD CONSTRAINT "profileInternship_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileInternshipRequest" ADD CONSTRAINT "profileInternshipRequest_profileInternshipId_fkey" FOREIGN KEY ("profileInternshipId") REFERENCES "profileInternship"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileNews" ADD CONSTRAINT "profileNews_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileArticle" ADD CONSTRAINT "profileArticle_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileScholarship" ADD CONSTRAINT "profileScholarship_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profilePlacement" ADD CONSTRAINT "profilePlacement_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileRoute" ADD CONSTRAINT "profileRoute_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
