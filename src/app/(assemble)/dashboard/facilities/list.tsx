// TODO: Handles no facilities condition

// import { FacilitiesProps } from "types/college";
// import CapsuleWithIcons from "./capsules";
import Image from "next/image"

export default function FacilitiesList({ facilities }: any) {
  return (
    <div className="flex flex-wrap gap-[16px] pt-[16px] pr-[24px] pb-[16px] pl-[24px]">
    {
      facilities?.map((facility:any) => {
        return (
<div className="flex flex-col justify-between h-[166px] w-[151px] border rounded-[8px] pl-[15px] pt-[15px] pb-[15px] pr-[30px]">
      <Image
        src={facility?.facility?.icon}
        alt=""
        width={33}
        height={33}
        // props={}
      />
      <p className="font-medium text-base">{facility?.facility?.title}</p>
    </div>
        )
      })
    }
    
    {/* <div className="flex flex-col justify-between h-[166px] w-[151px] border rounded-[8px] pl-[15px] pt-[15px] pb-[15px] pr-[30px]">
      <Image
        src="/images/Frames.png"
        alt="hostel"
        width={33}
        height={33}
      />
      <p className="font-medium text-base">Cafeteria</p>
    </div> */}
  </div>
  );
}
