"use client";
import Image from "next/image";
import DashboardIntroSectionWrapper from "./sectionWrapper";
import React, { useEffect, useState } from "react";
import Modal from "@/elements/modal";
import LocationForm, {
  locationFormSchema,
  LocationFormValues,
} from "./locationForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Map from "@/elements/map";
import MyGoogleMap from "./map";
import { getProfile } from "@/api";

const Location: React.FC = () => {
  const isEmpty = false;
  const [isLocationMosdalVisible, setIsLocationModalVisible] = useState(false);
  const [cordinates, setCordinates] = useState<{ lat: number; lng: number } | null>(null);

  console.log(cordinates, "the cordinates");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LocationFormValues>({
    resolver: zodResolver(locationFormSchema),
  });

  function extractCoordinatesFromUrl(url: string): { lat: number; lng: number } | null {
    const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
    const match = url.match(regex);
    if (match) {
      const lat = parseFloat(match[1]);
      const lng = parseFloat(match[2]);
      return { lat, lng };
    }
    return null;
  }

  useEffect(() => {
    const fetchData = async () => {
      const profileData = await getProfile();
      console.log("Profile map Data:", profileData?.mapUrl); // Debug profile data
      if (profileData?.mapUrl) {
        const coordinates = extractCoordinatesFromUrl(profileData.mapUrl);
      console.log("Cordinates Data:", cordinates); // Debug profile data
      setCordinates(coordinates);
      }
    };

    fetchData();
  }, []);

  const onLocationFormSubmit = async (data: LocationFormValues) => {
    console.log(data);
    reset();
    setIsLocationModalVisible(false);
  };

  return (
    <React.Fragment>
      <DashboardIntroSectionWrapper
        title="Location"
        wrapperClass="w-full"
        primaryButton={{
          type: "Edit",
          onClick: () => {
            setIsLocationModalVisible(true);
          },
        }}
      >
        <div className="flex gap-2.5 justify-between">
          {isEmpty ? (
            <React.Fragment>
              <div className="flex flex-col items-center justify-center flex-1">
                <Image
                  src="/images/location.svg"
                  alt="location"
                  width={44}
                  height={44}
                />
                <span className="text-[15px] leading-6 text-center text-label">
                  No Location added yet. To add location, use the edit button
                  above.
                </span>
              </div>
              <div className="bg-light-200 h-[260px] w-[750px] flex items-center justify-center">
                <Image
                  src="/images/location-placeholder.svg"
                  alt="location-pin"
                  width={36}
                  height={36}
                />
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="flex flex-col capitalize text-heading w-full">
                <span className="text-label mb-2">Address</span>
                <span>Amal Jyothi College of Engineering</span>
                <span>Kanjirappally, Koovappally (P.O)</span>
                <span>Kottayam</span>
                <span>647 382</span>
                <span>Kerala</span>
              </div>
              <div className="flex-1 bg-[url('/images/mocks/map.png')] bg-cover bg-center min-h-[260px] max-w-[750px]" />
<MyGoogleMap lat={cordinates?.lat} lng={cordinates?.lng} />
              
            </React.Fragment>
          )}
        </div>
      </DashboardIntroSectionWrapper>
      <Modal
        visible={isLocationMosdalVisible}
        onClose={() => setIsLocationModalVisible(false)}
        onSave={handleSubmit(onLocationFormSubmit)}
        title="Add Location"
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

            <input
              style={{ width: "100%" }}
              className="bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Search Location"
            />
          </div>
          <div className="w-full flex gap-4 mt-4">
            <LocationForm register={register} errors={errors} />
            {/* integrate maps after getting api key */}
            <div className="flex-1 flex items-center justify-center bg-light-200 rounded-2xl">
                Google map goes here
            </div>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default Location;
