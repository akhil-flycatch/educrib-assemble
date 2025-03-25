// TODO: Handles no facilities condition
"use client";
import Modal from "@elements/modal";
import FacilitiesForm from "@entry/forms/facilities";
import { useEffect, useState } from "react";

import AddButtonComon from "@/elements/addButton";
import CommonSearchInTabs from "@/elements/CommonSearchInTabs";
import CtaCommon from "@/elements/ctaCommon";
import { Coffee } from "lucide-react";
import { useForm } from "react-hook-form";
import FacilitiesList from "./list";
import { getProfileFacilitiesByProfileId, searchProfileFacilities } from "@/api";
import Image from "next/image"

export default function Facilities({ facilities }: any) {
  const [visible, setVisible] = useState(false);
  const [profileFacility, setProfileFacility] = useState<any>();
  const { register, handleSubmit, getValues } = useForm();

  useEffect(() => {
    const fetchData = async() => {
      const facilitiesById = await getProfileFacilitiesByProfileId();
      console.log("the facilitie by id", facilitiesById)
    }
    fetchData()
  },[])
  // useEffect
  const searchProfileFacility = async( event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("the",e);
    const response = await searchProfileFacilities(event.target.value)
    console.log("the repsonse", response)
  }
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
              {facilities?.length > 0 ? facilities?.length : 0}
            </div>
          </>
        }
        action={<AddButtonComon setVisible={setVisible} />}
        icon={Coffee}
      />
      <CommonSearchInTabs handleFileChange={searchProfileFacility} />
      <div className="flex flex-wrap gap-[16px] pt-[16px] pr-[24px] pb-[16px] pl-[24px]">
        <div className="flex flex-col justify-between h-[166px] w-[151px] border rounded-[8px] pl-[15px] pt-[15px] pb-[15px] pr-[30px]">
          <Image
            src="/images/Frames.png"
            alt="hostel"
            width={33}
            height={33}
            // props={}
          />
          <p className="font-medium text-base">Basket Ball Court</p>
        </div>
        <div className="flex flex-col justify-between h-[166px] w-[151px] border rounded-[8px] pl-[15px] pt-[15px] pb-[15px] pr-[30px]">
          <Image
            src="/images/Frames.png"
            alt="hostel"
            width={33}
            height={33}
          />
          <p className="font-medium text-base">Cafeteria</p>
        </div>
      </div>
      <FacilitiesList facilities={facilities} />
      <Modal
        visible={visible}
        onClose={() => setVisible(false)}
        onSave={() => console.log("te eve", getValues())}
        title="Edit Facilities"
      >
        <FacilitiesForm register={register} />
      </Modal>
    </div>
  );
}
