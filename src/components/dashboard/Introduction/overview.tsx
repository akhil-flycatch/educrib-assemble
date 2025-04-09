"use client";
import DashboardIntroSectionWrapper from "@/components/dashboard/Introduction/sectionWrapper";
import { useEffect, useState } from "react";
import Modal from "@/elements/modal";
import React from "react";
import OverviewItem from "./overviewItem";
import { getProfileById, getProfileFacilitiesByProfileId, upsertProfile } from "@/api";
import OverviewForm, { overviewFormSchema, OverviewFormValues } from "./overviewForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const Overview: React.FC = () => {
  const [isOverViewEditVisible, setIsOverViewEditVisible] = useState(false);
  const [profile, setProfile] = useState(null);
  const [facilitiesProfile, setFacilitiesProfile] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    control,
    formState: { errors },
  } = useForm<OverviewFormValues>({
    resolver: zodResolver(overviewFormSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      const profileData = await getProfileById();
      const facilitiesProfileData = await getProfileFacilitiesByProfileId();
      setProfile(profileData);
      setFacilitiesProfile(facilitiesProfileData);

      if (profileData) {
        reset({
          title: profileData?.title || "",
          university: profileData?.university?.id || "",
          management: profileData?.management?.title || "",
          establishedYear: profileData?.establishedYear?.toString() || undefined,
          code: profileData?.code || "",
          accreditation: profileData?.accreditation?.id || "",
          type: profileData?.type?.id || "",
          email: profileData?.email || "",
          phone: profileData?.phone || "",
        });
      }
    };

    fetchData();
  }, [reset]);

  const onOverviewFormSubmit = async (data: OverviewFormValues) => {
    const formData = new FormData();

    formData.append("id", profile.id || ""); // Ensure this is a valid unique identifier
    formData.append("title", data.title || "");
    formData.append("universityId", data.university || "");
    formData.append("managementId", data.management || "");
    formData.append("establishedYear", data.establishedYear || "");
    formData.append("code", data.code || "");
    formData.append("accreditationId", data.accreditation || "");
    formData.append("typeId", data.type || "");
    formData.append("email", data.email || "");
    formData.append("phone", data.phone || "");
    formData.append("website",data.website || "")

    try {
      if (!profile?.id) {
        throw new Error("Profile ID is missing. Cannot perform upsert operation.");
      }

      await upsertProfile(formData);
      reset();
      setIsOverViewEditVisible(false);
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
            setIsOverViewEditVisible(true);
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
            <OverviewItem label="Established year" value={profile?.establishedYear || "---"} />
            <OverviewItem label="College Code" value={profile?.code || "---"} />
            <OverviewItem label="Accreditation" value={profile?.accreditation?.title || "---"} />
            <OverviewItem label="Type" value={profile?.type?.title || "---"} />
            <OverviewItem label="email" value={profile?.email || "---"} />
            <OverviewItem label="Phone Number" value={profile?.phone || "---"} />
          </div>
        </div>
      </DashboardIntroSectionWrapper>
      <Modal
        visible={isOverViewEditVisible}
        onClose={() => setIsOverViewEditVisible(false)}
        onSave={() => { handleSubmit(onOverviewFormSubmit)() }}
        title="Edit Basic Informations"
      >
        <OverviewForm errors={errors} register={register} control={control} />
      </Modal>
    </React.Fragment>
  );
};

export default Overview;
