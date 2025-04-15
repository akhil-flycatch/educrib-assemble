"use client";
import Image from "next/image";
import DashboardIntroSectionWrapper from "./sectionWrapper";
import React, { useEffect, useState } from "react";
import Modal from "@/elements/modal";
import LocationForm from "./locationForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import MyGoogleMap from "./map";
import { getProfile, getProfileById, upsertProfile } from "@/api";
import { z } from "zod";
import GoogleMapsProvider from "@/utils/googleMapProvider";

export const locationFormSchema = z.object({
  mapUrl: z
    .string()
    .url("Please enter a valid Google Map URL")
    .optional(), // URL is optional
  address: z
    .string()
    .min(1, "Address is required")
    .max(255, "Address must be less than 255 characters"),
  city: z
    .string()
    .min(1, "City is required")
    .max(100, "City must be less than 100 characters"),
  district: z
    .string()
    .min(1, "District is required")
    .max(100, "District must be less than 100 characters"),
  pinCode: z
    .string()
    .regex(/^\d{5,6}$/, "Pin Code must be 5 or 6 digits")
    .min(5, "Pin Code must be at least 5 digits")
    .max(6, "Pin Code must be at most 6 digits"),
  state: z
    .string()
    .min(1, "State is required")
    .max(100, "State must be less than 100 characters"),
});

export type LocationFormValues = z.infer<typeof locationFormSchema>;

const Location: React.FC = () => {
  const [profile, setProfile] = useState(null);
  const isEmpty = false;
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
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
      const profileData = await getProfileById();
      console.log("Profile Data:location", profileData); // Debug profile data
      setProfile(profileData);

      if (profileData) {
        reset({
          city: profileData?.city || "",
          mapUrl: profileData?.mapUrl || "",
          state: profileData?.state || "",
          district: profileData?.district || "",
          address: profileData?.address || "",
          pinCode: profileData?.pincode || "",
        });
      }
    };

    fetchData(); // <-- This was missing
  }, [reset]);

  useEffect(() => {
    const fetchData = async () => {
      const profileData = await getProfile();
      if (profileData?.mapUrl) {
        const coordinates = extractCoordinatesFromUrl(profileData.mapUrl);
        console.log("Coordinates Data:", coordinates); // Debug coordinates
        setCoordinates(coordinates);
      }
    };

    fetchData();
  }, []);

  const onLocationFormSubmit = async (data: LocationFormValues) => {
    const formData = new FormData();
    console.log("Form Data Submitted:", data);
    formData.append("id", profile?.id || ""); // Ensure this is a valid unique identifier
    formData.append("mapUrl", data.mapUrl || "");
    formData.append("address", data.address || "");
    formData.append("city", data.city || "");
    formData.append("district", data.district || "");
    formData.append("state", data.state || "");
    formData.append("pincode", data.pinCode || "");
    try {
      if (!profile?.id) {
        throw new Error("Profile ID is missing. Cannot perform upsert operation.");
      }

   const response=await upsertProfile(formData);

      console.log("Profile updated successfully",response);
      reset();
      setIsLocationModalVisible(false);
    } catch (error) {
      console.error("Failed to update profile", error);
    }
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
                <span>{profile?.title}</span>
                <span>{profile?.address},{profile?.city} (P.O)</span>
                <span>{profile?.district}</span>
                <span>{profile?.pincode}</span>
                <span>{profile?.state}</span>
              </div>
              <div className="flex-1">
                {coordinates ? (
                  <MyGoogleMap lat={coordinates.lat} lng={coordinates.lng} />
                  // <>Map Goes Here</>
                ) : (
                  <p>Loading map...</p>
                )}
              </div>
            </React.Fragment>
          )}
        </div>
      </DashboardIntroSectionWrapper>
      <Modal
        visible={isLocationModalVisible}
        onClose={() => setIsLocationModalVisible(false)}
        onSave={handleSubmit(onLocationFormSubmit)} // Form submission handler
        title="Add Location"
      >
        <form onSubmit={handleSubmit(onLocationFormSubmit)} className="w-[964px]">
          <div className="relative flex items-center w-full flex-1"></div>
          <div className="w-full flex gap-4 mt-4">
            {/* <GoogleMapsProvider> */}

            
            <LocationForm
            control={control}
              errors={errors}
              register={register}
              setValue={setValue}
            />
            {/* </GoogleMapsProvider> */}
          </div>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default Location;
