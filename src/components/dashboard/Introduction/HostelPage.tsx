"use client";
import Image from "next/image";
import DashboardIntroSectionWrapper from "./sectionWrapper";
import React, { useState } from "react";
import Modal from "@/elements/modal";
import LocationForm, {
  locationFormSchema,
  LocationFormValues,
} from "./locationForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import HostelPageForm from "./HostelPageForm";

const HostelPage: React.FC = () => {
  const isEmpty = true;
  // const [isLocationMosdalVisible, setIsLocationModalVisible] = useState(false);
  const [isHostelModalVisible, setIsHostelModalVisible] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LocationFormValues>({
    resolver: zodResolver(locationFormSchema),
  });

  const onLocationFormSubmit = async (data: LocationFormValues) => {
    console.log(data);
    reset();
    setIsHostelModalVisible(false);
  };

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
          <div className="flex gap-2.5 justify-between h-[260px]">
            {isEmpty ? (
              <React.Fragment>
                <div className="flex flex-col items-center justify-center flex-1">
                  <Image
                    src="/images/buildings.png"
                    alt="hostel"
                    width={44}
                    height={44}
                  />
                  <span className="text-[15px] leading-6 text-center text-label">
                    No hostel details added yet. Add hostel information to keep records updated.
                  </span>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="flex flex-col capitalize text-heading">
                  <span className="text-label mb-2">Address</span>
                  <span>Amal Jyothi College of Engineering</span>
                  <span>Kanjirappally, Koovappally (P.O)</span>
                  <span>Kottayam</span>
                  <span>647 382</span>
                  <span>Kerala</span>
                </div>
                <div className="flex-1 bg-[url('/images/mocks/map.png')] bg-cover bg-center min-h-[260px] max-w-[750px]" />
              </React.Fragment>
            )}
          </div>
        </DashboardIntroSectionWrapper>
        <Modal
          visible={isHostelModalVisible}
          onClose={() => setIsHostelModalVisible(false)}
          onSave={handleSubmit(onLocationFormSubmit)}
          title="Add Hostel Details"
        >
          <div className="w-[964px]">
            <div className="relative flex items-center w-full flex-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                  clipRule="evenodd"
                />
              </svg>

              {/* <input
                style={{ width: "100%" }}
                className="bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Search Location"
              /> */}
            </div>
            
              <HostelPageForm register={register} errors={errors} />
              {/* integrate maps after getting api key */}
              {/* <div className="flex-1 flex items-center justify-center bg-light-200 rounded-2xl">
                Google map goes here
              </div> */}
            
          </div>
        </Modal>
      </React.Fragment>

      <div className="flex justify-between pt-[16px] pr-[24px] pb-[16px] pl-[24px] bg-[#F5F6F7] mt-5 border-t border-t-[#DFE2E6]">
        <div>
          <h1 className="text-[18px] font-semibold">Gents Hostel</h1>
        </div>
        <div className="flex justify-between gap-3">
          <Image
            src="/images/facility-delete.svg"
            alt="hostel"
            width={33}
            height={33}
          />
          <Image
            src="/images/delete.png"
            alt="hostel"
            width={33}
            height={33}
          />
        </div>
      </div>

      <div className="flex justify-between pt-[16px] pr-[24px] pb-[16px] pl-[24px] border-t border-t-[#DFE2E6]">

        <div className="border border-[#DFE2E6] w-[156px] h-[77px] p-[16px] rounded-[8px]">
          <p className="text-[#5D6B82] text-[14px] font-normal">Capacity</p>
          <p className="text-[18px] font-medium">400</p>
        </div>

        <div className="border border-[#DFE2E6] w-[156px] h-[77px] p-[16px] rounded-[8px]">
          <p className="text-[#5D6B82] text-[14px] font-normal">Deposit</p>
          <p className="text-[18px] font-medium">₹3000</p>
        </div>

        <div className="border border-[#DFE2E6] w-[156px] h-[77px] p-[16px] rounded-[8px]">
          <p className="text-[#5D6B82] text-[14px] font-normal">Admission Fee</p>
          <p>₹3000</p>
        </div>

        <div className="border border-[#DFE2E6] w-[156px] h-[77px] p-[16px] rounded-[8px]">
          <p className="text-[#5D6B82] text-[14px] font-normal">Room Rent</p>
          <p className="text-[18px] font-medium">₹23,000/year</p>
        </div>

        <div className="border border-[#DFE2E6] w-[156px] h-[77px] p-[16px] rounded-[8px]">
          <p className="text-[#5D6B82] text-[14px] font-normal">Mess Fee</p>
          <p className="text-[18px] font-medium">₹40000</p>
        </div>

        <div className="border border-[#DFE2E6] w-[156px] h-[77px] p-[16px] rounded-[8px]">
          <p className="text-[#5D6B82] text-[14px] font-normal">Laundry</p>
          <p className="text-[18px] font-medium">₹8000/year</p>
        </div>

      </div>

      <div className="flex gap-[107px] pt-[16px] pr-[24px] pb-[16px] pl-[24px] border-t border-t-[#DFE2E6]">
        <div className="flex items-center">
          <p className="text-[#5D6B82]">Contact</p>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <Image
              src="/images/avatar-upload.svg"
              alt="hostel"
              width={44}
              height={44}
            />
          </div>
          <div>
            <p className="text-[#15294B] text-[16px] font-medium">Rev.Fr. Sebastian Kilirooparambil </p>
            <p className="text-[#6B788E] text-[16px] font-medium">+91 974 833 9294</p>
          </div>
        </div>
      </div>


      <div className="flex gap-[96px] pt-[16px] pr-[24px] pb-[16px] pl-[24px] border-t border-t-[#DFE2E6]">
        <div className="flex">
          <p className="text-[#5D6B82]">Amenities</p>
        </div>

        <div className="flex flex-wrap gap-[12px]">
          <div className="flex items-center p-[12px] gap-[12px] h-[56px] w-[96px] border border-[#DFE2E6] rounded-[8px]">
            <Image
              src="/images/Frames.png"
              alt="hostel"
              width={32}
              height={32}
            />
            <p className="text-[#15294B] text-[14px] font-medium">Wifi</p>
          </div>

          <div className="flex items-center p-[12px] gap-[16px] h-[56px] w-[185px] border border-[#DFE2E6] rounded-[8px]">
            <Image
              src="/images/Frames.png"
              alt="hostel"
              width={32}
              height={32}
            />
            <p className="text-[#15294B] text-[14px] font-medium">Common Areas</p>
          </div>

          <div className="flex items-center p-[12px] gap-[16px] h-[56px] w-[175px] border border-[#DFE2E6] rounded-[8px]">
            <Image
              src="/images/Frames.png"
              alt="hostel"
              width={32}
              height={32}
            />
            <p className="text-[#15294B] text-[14px] font-medium">Housekeeping</p>
          </div>

          <div className="flex items-center p-[12px] gap-[16px] h-[56px] w-[185px] border border-[#DFE2E6] rounded-[8px]">
            <Image
              src="/images/Frames.png"
              alt="hostel"
              width={32}
              height={32}
            />
            <p className="text-[#15294B] text-[14px] font-medium">Common Areas</p>
          </div>

          <div className="flex items-center p-[12px] gap-[16px] h-[56px] w-[155px] border border-[#DFE2E6] rounded-[8px]">
            <Image
              src="/images/Frames.png"
              alt="hostel"
              width={32}
              height={32}
            />
            <p className="text-[#15294B] text-[14px] font-medium">Study Area</p>
          </div>

          <div className="flex items-center p-[12px] gap-[16px] h-[56px] w-[216px] border border-[#DFE2E6] rounded-[8px]">
            <Image
              src="/images/Frames.png"
              alt="hostel"
              width={32}
              height={32}
            />
            <p className="text-[#15294B] text-[14px] font-medium">Spacious Cupboard</p>
          </div>

          <div className="flex items-center p-[12px] gap-[16px] h-[56px] w-[110px] border border-[#DFE2E6] rounded-[8px]">
            <Image
              src="/images/Frames.png"
              alt="hostel"
              width={32}
              height={32}
            />
            <p className="text-[#15294B] text-[14px] font-medium">Gym</p>
          </div>

          <div className="flex items-center p-[12px] gap-[16px] h-[56px] w-[227px] border border-[#DFE2E6] rounded-[8px]">
            <Image
              src="/images/Frames.png"
              alt="hostel"
              width={32}
              height={32}
            />
            <p className="text-[#15294B] text-[14px] font-medium">Attached Washrooms</p>
          </div>
        </div>

      </div>


    </div>
  );
};

export default HostelPage;