// TODO: Handles no facilities condition
"use client";
import Modal from "@elements/modal";
import FacilitiesForm from "@entry/forms/facilities";
import { useEffect, useState } from "react";

import AddButtonComon from "@/elements/addButton";
import CommonSearchInTabs from "@/elements/CommonSearchInTabs";
import CtaCommon from "@/elements/ctaCommon";
import { Coffee, Loader, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import FacilitiesList from "./list";
import {
  createMultipleProfileFacilities,
  deleteProfileFacility,
  getAllFacilities,
  getProfileFacilitiesByProfileId,
  searchProfileFacilities,
} from "@/api";
import FacilitySearch from "@entry/forms/facilities";
import Image from "next/image";

export default function Facilities({ facilities }: any) {
  const [visible, setVisible] = useState(false);
  const [profileFacility, setProfileFacility] = useState<any>();
  const [defaultFacilityData, setDefaultFacilityData] = useState<any>();
  const [allProfiles, setAllProfiles] = useState<any>();
  const { register, handleSubmit, getValues } = useForm();
  const [loading, setLoading] = useState(false)
  const [facilitieslist, setFacilities] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const facilitiesById = await getProfileFacilitiesByProfileId();
      let arr: any = [];
      facilitiesById?.map((option: any) => {
        arr.push({
          label: option.facility.title,
          value: option.facility.slug,
          image: option.facility.icon,
        });
      });
      setDefaultFacilityData(arr);
      const allFacility = await getAllFacilities();
      setAllProfiles(allFacility);
      setProfileFacility(facilitiesById);
      setLoading(false)
    };

     fetchData();
    
  }, []);
  useEffect(() => {
    const fetchData = async () => {
    
      const facilitiesById = await getProfileFacilitiesByProfileId();
      let arr: any = [];
      facilitiesById?.map((option: any) => {
        arr.push({
          label: option.facility.title,
          value: option.facility.slug,
          image: option.facility.icon,
        });
      });
      setDefaultFacilityData(arr);
    };

     fetchData();
  },[facilitieslist])

  const searchProfileFacility = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const response = await searchProfileFacilities(event.target.value);

    setProfileFacility(response);
  };

  const saveEditFacilities = async () => {
    let facilitiesIds: any[] = [];
    // Iterate over the facilities list
    facilitieslist?.forEach((data: any) => {
      // Find all matching profiles (not just the first match)
      const matchingProfiles = allProfiles?.filter(
        (allData: any) => allData.title === data.label
      );
      if (matchingProfiles && matchingProfiles.length > 0) {
        // Push all the matching profile IDs into the facilitiesIds array
        matchingProfiles.forEach((profile: any) => {
          facilitiesIds.push(profile.id);
        });
      } // Log data for debugging
    }); // Log final ids array

    // Uncomment the following line if you want to call the API or perform the save action
    
    const response = await createMultipleProfileFacilities(facilitiesIds);
    setFacilities([]);
    const facilitiesById = await getProfileFacilitiesByProfileId();
    setProfileFacility(facilitiesById);
    setVisible(false);
  };

  const onDeleteById = async (title: any) => {
   
    const deletedfacility = profileFacility.find(
      (facility: any) => facility.facility.slug === title
    );
    await setProfileFacility((l:any) => l.filter((item:any) => item.facility.slug === title));
  
    const response =  deletedfacility && await deleteProfileFacility(deletedfacility.id);
  
    const facilitiesById = await getProfileFacilitiesByProfileId();
    setProfileFacility(facilitiesById);
    let arr: any = [];
    await facilitiesById?.map((option: any) => {
      arr.push({
        label: option.facility.title,
        value: option.facility.slug,
        image: option.facility.icon,
      });
    });
    await setDefaultFacilityData(arr);
    const allFacility = await getAllFacilities();
    setAllProfiles(allFacility);
  };

  // Callback function to receive the updated facilities
  const handleFacilitiesChange = (updatedFacilities: any[]) => {
    setFacilities(updatedFacilities); // Store the updated facilities
  };
  return (
    <div className="flex flex-col space-y-4 bg-white">
      <CtaCommon
        text={
          <>
            <div
              style={{
                color: "#15294B",
                fontSize: "20px",
                fontWeight: "500",
                paddingRight: "12%",
              }}
            >
              Facilities
            </div>
            <div
              style={{
                background: "#EAEBEE",
                fontSize: "14px",
                width: "35px",
                height: "27px",
                borderRadius: "20px",
                gap: "10px",
                paddingTop: "0px",
                paddingRight: "10px",
                paddingBottom: "4px",
                paddingLeft: "10px",
              }}
            >
              {profileFacility?.length > 0 ? profileFacility?.length : 0}
            </div>
          </>
        }
        action={
          profileFacility?.length === 0 ? (
            <AddButtonComon
              setVisible={setVisible}
              text={"Add"}
              icon={"/add.svg"}
            />
          ) : (
            <AddButtonComon
              setVisible={setVisible}
              text={"Edit"}
              icon={"/images/edit.svg"}
            />
          )
        }
        icon={Coffee}
      />
      <CommonSearchInTabs
        handleFileChange={searchProfileFacility}
        isFilter={false}
      />

      {profileFacility?.length > 0 ? (
        <FacilitiesList facilities={profileFacility} />
      ) : profileFacility?.length === 0 ? (
        <>
          <div style={{ height: "150px" }}>
            <div className="flex flex-col items-center justify-center flex-1">
              <Image
                src="/images/facilities-placeholder.svg"
                alt="facilities"
                width={44}
                height={44}
              />
              <span className="text-[15px] leading-6 text-center text-label">
                No facilities added yet. Add and manage the
              </span>
              <span className="text-[15px] leading-6 text-center text-label">
                facilities your organisation provides.
              </span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            {" "}
            <Loader />
          </div>
        </>
      )}
      <Modal
        visible={visible}
        onClose={() => setVisible(false)}
        onSave={() => saveEditFacilities()}
        title="Edit Facilities"
      >
  
  {loading ? <Loader2/> : (
    <FacilitySearch
          onDeleteById={onDeleteById}
          defaultValue={defaultFacilityData?.length > 0  ? defaultFacilityData : undefined}
          handleFacilitiesChange={handleFacilitiesChange}
          register={register}
          searchEntity={(e: any) => console.log("thee ee", e)}
          placeholder={"Facility"}
          verticalId={""}
          baseRoute={""}
        />
  )}
        
      </Modal>
    </div>
  );
}
