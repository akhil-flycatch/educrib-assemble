import Image from "next/image";
import { BRAND_CAPTION, SUB_CAPTION } from "@/config/brand";
import Typography from "@/storybooks/components/atoms/Typography";

import adminImg from "./office.jpg";
export default function Banner() {
  return (
    <section className="flex h-screen relative  overflow-hidden w-[40%] ">
      <Image
        alt="Mountains"
        src={adminImg}
        placeholder="blur"
        className="object-cover w-full h-full "
      />
      {/* <div className="bg-dark/50 absolute inset-0" /> */}
      <div className="absolute bottom-5 text-center flex flex-col justify-center w-full gap-[10px] ">
        <p className="text-white text-[36px] font-[600] leading-[52px]">        {BRAND_CAPTION}
        </p>
        <p className=" text-[20px] font-extralight leading-[20px] tracking-[0.01em] text-center text-[#D4D7E3]">
          {SUB_CAPTION}
        </p>



      </div>


    </section>
  );
}
