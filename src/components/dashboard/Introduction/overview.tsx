"use client";
"use client";
import DashboardIntroSectionWrapper from "@/components/dashboard/Introduction/sectionWrapper";
import { useEffect, useState } from "react";
import Modal from "@/elements/modal";
import React from "react";
import OverviewItem from "./overviewItem";
import { getProfileById, getProfileFacilitiesByProfileId } from "@/api";
import { title } from "process";
import FacilitiesForm from "@/elements/entry/forms/facilities";
import OverviewForm, { overviewFormSchema, OverviewFormValues } from "./overviewForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const Overview: React.FC = () => {
  const [isOverViewEditVisible, setIsOverViewEditVisible] = useState(false);
  const [profile, setProfile] = useState(null);
  const [facilitiesProfile, setFacilitiesProfile] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        const profileData = await getProfileById("clrpz6nnn000mlf08dy5aqjdm");
        const facilitiesProfileData = await getProfileFacilitiesByProfileId(
          "cm7ircicd0004fydcim7denka",
          { active: true }
        );
        setProfile(profileData);
        setFacilitiesProfile(facilitiesProfileData);
      };
  
      fetchData();
    }, []);

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<OverviewFormValues>({
      resolver: zodResolver(overviewFormSchema),
    });
  
    const onOverviewFormSubmit = async (data: OverviewFormValues) => {
      console.log(data);
      reset();
      setIsOverViewEditVisible(false);
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
            <OverviewItem label="College Code" value={profile?.code|| "---"} />
            <OverviewItem label="Accreditation" value={profile?.accreditation?.title || "---"} />
            <OverviewItem label="Type" value={profile?.type?.title || "---"} />
            {/* it was told in the meeting only one email and phone number is required for now. Change the UI otherwise */}
            <OverviewItem label="email" value={profile?.email || "---"} />
            <OverviewItem label="Phone Number" value={profile?.phone || "---"} />
          </div>
        </div>
      </DashboardIntroSectionWrapper>
      <Modal
        visible={isOverViewEditVisible} 
        onClose={() => setIsOverViewEditVisible(false)}
        onSave={() => {handleSubmit(onOverviewFormSubmit)()}}
        title="Edit Basic Informations"
      >
        <OverviewForm errors={errors} register={register} />
        {/* <>Test Content</> */}
      </Modal>
    </React.Fragment>
  );
};

export default Overview;
