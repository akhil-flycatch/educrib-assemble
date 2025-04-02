"use client";
import Image from "next/image";
import DashboardIntroSectionWrapper from "./sectionWrapper";
import React, { useEffect, useState } from "react";
import Modal from "@/elements/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldValues,
  RegisterOptions,
  useForm,
  UseFormRegisterReturn,
} from "react-hook-form";
import HostelPageForm, {
  HostelFormValues,
  HostelormSchema,
} from "./HostelPageForm";
import {
  getAllFacilities,
  getProfileHostelsByProfileId,
  searchFacilities,
} from "@/api";
import { deleteProfileHostel, getAllHostelTypes, upsertProfileHostel } from "@/api/profileHostel";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import useFileUpload from "@/utils/hooks/useFileUpload";
import FileUpload from "@/components/hookForm/fileUpload";
// import { Input } from "postcss";
import Input from "@/components/hookForm/input";

const HostelPage: React.FC = () => {
  const isEmpty = true;
  // const [isLocationMosdalVisible, setIsLocationModalVisible] = useState(false);
  const [isHostelModalVisible, setIsHostelModalVisible] = useState(false);
  const [allHostelByIdDetails, setallHotelByIdDetails] = useState<any>();
  const [allHostelTypes, setAllHostelTypes] = useState<any>();
  const [allamenities, setAllAmenities] = useState<any>();
  const [editHostelId, setEditHostelId] = useState<any>()

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<HostelFormValues>({
    resolver: zodResolver(HostelormSchema),
    defaultValues: {
      hostelTypeId: "",
      avatar: "",
      capacity: "",
      cautionDeposit: "",
      admissionFees: "",
      roomRent: "",
      messFees: "",
      laundryFees: "",
      contactName: "",
      phone: "",
      facilityId: [], // Ensure the default value is an empty array for facilityId
    },
  });
  const [imageUrlHostel, setImageUrlHostel] = useState<any>();

  console.log("the id", allamenities?.map((data) => allHostelByIdDetails?.map((details) => {
    if(details.facilities.includes(data.id)){
      return data;
    }
  })))

  const searchingAmenitiesInModal = async (keyword: any) => {
    console.log("Search term:", keyword);
    const allFacility = await getAllFacilities(); // Get all facilities
    const alreadySelectedFacilityIds = getValues("facilityId") || [];

    const alreadyPresent = allFacility.filter((facility) =>
      alreadySelectedFacilityIds.includes(facility.id)
    );
    // Filter the amenities based on the search keyword
    const filteredAmenities = allFacility.filter(
      (facility) => facility.id === keyword.value
    );

    console.log("Search term:", alreadyPresent, filteredAmenities);
    // Update the state with filtered amenities
    await setAllAmenities((prevAmenities) => [
      ...alreadyPresent,
      ...filteredAmenities,
    ]);
  };
  useEffect(() => {
    const fetchData = async () => {
      const allHostelById = await getProfileHostelsByProfileId();
      const allHostelTypes = await getAllHostelTypes({ active: true });
      const allFacility = await getAllFacilities();
      setAllAmenities(allFacility);
      setallHotelByIdDetails(allHostelById);
      setAllHostelTypes(allHostelTypes);
    };
    fetchData();
  }, []);

  useEffect(() => {
reset({
  hostelTypeId: "",
      avatar: "",
      capacity: "",
      cautionDeposit: "",
      admissionFees: "",
      roomRent: "",
      messFees: "",
      laundryFees: "",
      contactName: "",
      phone: "",
      facilityId: [], 
})
  },[allHostelByIdDetails])


  const openEditModal = async(details:any) => {
    console.log("detals on edit",details)
    await reset(
      {
        hostelTypeId: details.hostelType,
        avatar: details.avatar,
        capacity: details.capacity,
        cautionDeposit: details.cautionDeposit,
        admissionFees: details.admissionFees,
        roomRent: details.roomRent,
        messFees: details.messFees,
        laundryFees: details.laundryFees,
        contactName: details.contactName,
        phone: details.phone,
        facilityId: details.facilities, 
      }
    )
    await setEditHostelId(details.id)
    setIsHostelModalVisible(true)
  }

  const onLocationFormSubmit = async (data: HostelFormValues) => {
    console.log("Form Data before submission", errors);
    //  let data = getValues()
    // Convert the form data to FormData object
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        if (key === "facilityId") {
          formData.append(key, JSON.stringify(value));
        }
      else if(key === "avatar"){
        debugger;
          formData.append(key, imageUrlHostel)
        }
        else {
          // Append array values properly
          value.forEach((v) => formData.append(key, v));
        }
       

      } else {
        formData.append(key, value);
      }
      if(editHostelId){
        formData.append("id", editHostelId)
      }
    }

    // Log or send formData to your API endpoint
    console.log("Form Data as FormData", formData, imageUrlHostel);
    // Reset the form and close the modal after submission
    reset({
      hostelTypeId: "",
      avatar: "",
      capacity: "",
      cautionDeposit: "",
      admissionFees: "",
      roomRent: "",
      messFees: "",
      laundryFees: "",
      contactName: "",
      phone: "",
      facilityId: [],
    });
    // // For demo, we'll create an object URL
    // console.log("the value" ,value)
    const response = await upsertProfileHostel(formData,imageUrlHostel);
 const allHostelById = await getProfileHostelsByProfileId();
      const allHostelTypes = await getAllHostelTypes({ active: true });
      const allFacility = await getAllFacilities();
      setAllAmenities(allFacility);
      setallHotelByIdDetails(allHostelById);
      setAllHostelTypes(allHostelTypes);
    setIsHostelModalVisible(false);
  };

  const cancelHostelformModal = () => {
    setIsHostelModalVisible(false);
    reset({
      hostelTypeId: "",
      avatar: "",
      capacity: "",
      cautionDeposit: "",
      admissionFees: "",
      roomRent: "",
      messFees: "",
      laundryFees: "",
      contactName: "",
      phone: "",
      facilityId: [],
    });
  };

  const deleteHostelDetails = async(details:any) => {
    const repsonse =  await deleteProfileHostel(details.id)
    console.log(">>>>on delete", repsonse)
   const allHostelById = await getProfileHostelsByProfileId();
      const allHostelTypes = await getAllHostelTypes({ active: true });
      const allFacility = await getAllFacilities()
      setAllAmenities(allFacility);
      setallHotelByIdDetails(allHostelById);
      setAllHostelTypes(allHostelTypes);
  }



  const setImageUrlHostelChange = (url: string) => setImageUrlHostel(url);

  return (
    <div>
      <React.Fragment>
        <DashboardIntroSectionWrapper
          title="Hostel"
          wrapperClass="w-full"
          primaryButton={{
            type: "Add",
            onClick: () => {
              setIsHostelModalVisible(true);
            },
          }}
        >
          {allHostelByIdDetails?.length === 0 ? (
            <div className="flex gap-2.5 justify-between h-[260px]">
              <React.Fragment>
                <div className="flex flex-col items-center justify-center flex-1">
                  <Image
                    src="/images/buildings.png"
                    alt="hostel"
                    width={44}
                    height={44}
                  />
                  <span className="text-[15px] leading-6 text-center text-label">
                    No hostel details added yet. Add hostel information to keep
                    records updated.
                  </span>
                </div>
              </React.Fragment>
            </div>
          ) : (
            // <React.Fragment>
            <>
              {/* // <React.Fragment> */}
              {allHostelByIdDetails?.map((hostelDetails: any, index:any) => {
                return (
                  <>
                    <div className="flex justify-between pt-[16px] pr-[24px] pb-[16px] pl-[24px] bg-[#F5F6F7] mt-5 border-t border-t-[#DFE2E6]">
                      <div>
                        <h1 className="text-[18px] font-semibold">
                          {
                           hostelDetails.hostelType
                          }
                        </h1>
                      </div>
                      <div className="flex justify-between gap-3">
                        <Image
                        onClick={() => deleteHostelDetails(hostelDetails)}
                          src="/images/facility-delete.svg"
                          alt="hostel"
                          style={{cursor:'pointer'}}
                          width={33}
                          height={33}
                        />
                        <Image
                         onClick={() => openEditModal(hostelDetails)}
                          src="/images/delete.png"
                          alt="hostel"
                          style={{cursor:'pointer'}}
                          width={33}
                          height={33}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between pt-[16px] pr-[24px] pb-[16px] pl-[24px] border-t border-t-[#DFE2E6]">
                      <div className="border border-[#DFE2E6] w-[156px] h-[77px] p-[16px] rounded-[8px]">
                        <p className="text-[#5D6B82] text-[14px] font-normal">
                          Capacity
                        </p>
                        <p className="text-[18px] font-medium">
                          {hostelDetails.capacity}
                        </p>
                      </div>

                      <div className="border border-[#DFE2E6] w-[156px] h-[77px] p-[16px] rounded-[8px]">
                        <p className="text-[#5D6B82] text-[14px] font-normal">
                          Deposit
                        </p>
                        <p className="text-[18px] font-medium">
                          ₹{hostelDetails.cautionDeposit}
                        </p>
                      </div>

                      <div className="border border-[#DFE2E6] w-[156px] h-[77px] p-[16px] rounded-[8px]">
                        <p className="text-[#5D6B82] text-[14px] font-normal">
                          Admission Fee
                        </p>
                        <p>₹{hostelDetails.admissionFees}</p>
                      </div>

                      <div className="border border-[#DFE2E6] w-[156px] h-[77px] p-[16px] rounded-[8px]">
                        <p className="text-[#5D6B82] text-[14px] font-normal">
                          Room Rent
                        </p>
                        <p className="text-[18px] font-medium">
                          ₹{hostelDetails.roomRent}/year
                        </p>
                      </div>

                      <div className="border border-[#DFE2E6] w-[156px] h-[77px] p-[16px] rounded-[8px]">
                        <p className="text-[#5D6B82] text-[14px] font-normal">
                          Mess Fee
                        </p>
                        <p className="text-[18px] font-medium">
                          ₹{hostelDetails.messFees}
                        </p>
                      </div>

                      <div className="border border-[#DFE2E6] w-[156px] h-[77px] p-[16px] rounded-[8px]">
                        <p className="text-[#5D6B82] text-[14px] font-normal">
                          Laundry
                        </p>
                        <p className="text-[18px] font-medium">
                          ₹{hostelDetails.laundryFees}/year
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-[107px] pt-[16px] pr-[24px] pb-[16px] pl-[24px] border-t border-t-[#DFE2E6]">
                      <div className="flex items-center">
                        <p className="text-[#5D6B82]">Contact</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div>
                          <Image
                            src={
                              hostelDetails.avatar
                                ? hostelDetails.avatar
                                : "/images/avatar-upload.svg"
                            }
                            alt="hostel"
                            width={44}
                            height={44}
                          />
                        </div>
                        <div>
                          <p className="text-[#15294B] text-[16px] font-medium">
                            {hostelDetails.contactName}
                          </p>
                          <p className="text-[#6B788E] text-[16px] font-medium">
                            {hostelDetails.phone}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-[96px] pt-[16px] pr-[24px] pb-[16px] pl-[24px] border-t border-t-[#DFE2E6]">
                      <div className="flex">
                        <p className="text-[#5D6B82]">Amenities</p>
                      </div>

                      <div className="flex flex-wrap gap-[12px]">
                        {allamenities?.map((amenities: any) => {
                          if (hostelDetails?.facilities?.includes(amenities.id)) {
                            console.log("the vale>>>", amenities)
                            return (
                              <>
                                <div className="flex items-center p-[12px] gap-[12px] h-[56px]  border border-[#DFE2E6] rounded-[8px]">
                                  <Image
                                    src={amenities.icon}
                                    alt="hostel"
                                    width={32}
                                    height={32}
                                  />
                                  <p className="text-[#15294B] text-[14px] font-medium">
                                    {amenities.title}
                                  </p>
                                </div>
                              </>
                            );
                          }
                          else{
                            console.log("the vale", hostelDetails.facilities, typeof(amenities.id))
                          }
                        })}
                      </div>
                    </div>
                  </>
                );
              })}
            </>
          )}
        </DashboardIntroSectionWrapper>
        <Modal
          visible={isHostelModalVisible}
          onClose={() => cancelHostelformModal()}
          onSave={() => {
            handleSubmit(onLocationFormSubmit)();
          }}
          title="Add Hostel Details"
        >
          <HostelPageForm
            errors={errors}
            register={register}
            searchingAmenitiesInModal={searchingAmenitiesInModal}
            allHostelTypes={allHostelTypes}
            allamenities={allamenities}
            setValue={setValue}
            setImageUrlHostelChange={setImageUrlHostelChange}
            getValues={getValues}
          />
        </Modal>
      </React.Fragment>
    </div>
  );
};

export default HostelPage;
