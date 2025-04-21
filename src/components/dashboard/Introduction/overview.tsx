"use client";
import DashboardIntroSectionWrapper from "@/components/dashboard/Introduction/sectionWrapper";
import { useEffect, useState } from "react";
import Modal from "@/elements/modal";
import React from "react";
import OverviewItem from "./overviewItem";
import { getProfileById } from "@/api";
import OverviewForm, {
  overviewFormSchema,
  OverviewFormValues,
} from "./overviewForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateProfileOverview } from "@/api/profile";

const Overview: React.FC = () => {
  const [isOverViewEditVisible, setIsOverViewEditVisible] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<OverviewFormValues>({
    resolver: zodResolver(overviewFormSchema),
  });

  const fetchData = async () => {
    const profileData = await getProfileById();
    setProfile(profileData);

    if (profileData) {
      reset({
        title: profileData?.title || "",
        university: profileData?.university?.id || "",
        establishedYear: profileData?.establishedYear?.toString() || undefined,
        accreditation: profileData?.accreditation?.id || "",
        type: profileData?.type?.id || "",
        email: profileData?.email || "",
        phone: profileData?.phone || "",
        website: profileData?.website || "",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [reset]);

  const onOverviewFormSubmit = async (data: OverviewFormValues) => {
    const formData = new FormData();

    formData.append("id", profile.id || "");
    formData.append("title", data.title || "");
    formData.append("universityId", data.university || "");
    formData.append("establishedYear", data.establishedYear || "");
    formData.append("accreditationId", data.accreditation || "");
    formData.append("typeId", data.type || "");
    formData.append("email", data.email || "");
    formData.append("phone", data.phone || "");
    formData.append("website", data.website || "");

    try {
      if (!profile?.id) {
        throw new Error(
          "Profile ID is missing. Cannot perform upsert operation."
        );
      }

      await updateProfileOverview(formData);
      reset();
      setIsOverViewEditVisible(false);
      fetchData();
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  return (
    <React.Fragment>
      <DashboardIntroSectionWrapper
        title="Overview"
        wrapperClass="flex-1"
        primaryButton={{
          type: "Edit",
          onClick: () => {
            setIsOverViewEditVisible(true);// need to be disabled until profile details are fetched
          },
        }}
      >
        <div className="w-full">
          <div className="w-full flex flex-col gap-6">
            <OverviewItem
              label="University"
              value={profile?.university?.title || "---"}
            />
            <OverviewItem
              label="Management"
              value={profile?.management?.title || "---"}
            />
            <OverviewItem
              label="Established year"
              value={profile?.establishedYear || "---"}
            />
            <OverviewItem label="College Code" value={profile?.code || "---"} />
            <OverviewItem
              label="Accreditation"
              value={profile?.accreditation?.title || "---"}
            />
            <OverviewItem label="Type" value={profile?.type?.title || "---"} />
            <OverviewItem label="email" value={profile?.email || "---"} />
            <OverviewItem
              label="Phone Number"
              value={profile?.phone || "---"}
            />
          </div>
        </div>
      </DashboardIntroSectionWrapper>
      <Modal
        visible={isOverViewEditVisible}
        onClose={() => {
          setIsOverViewEditVisible(false);
          console.log("close");
          reset({
            title: profile?.title || "",
            university: profile?.university?.id || "",
            establishedYear: profile?.establishedYear?.toString() || undefined,
            accreditation: profile?.accreditation?.id || "",
            type: profile?.type?.id || "",
            email: profile?.email || "",
            phone: profile?.phone || "",
            website: profile?.website || "",
          });
        }}
        onSave={() => handleSubmit(onOverviewFormSubmit)()}
        title="Edit Basic Informations"
      >
        <OverviewForm errors={errors} control={control} />
      </Modal>
    </React.Fragment>
  );
};

export default Overview;
