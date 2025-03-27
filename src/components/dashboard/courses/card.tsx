import Image from "next/image";

const CourseCard: React.FC = () => {
  return (
    <div className="border border-accent-2 hover:shadow-lg rounded-lg flex flex-col p-6 gap-6">
      <span className="text-sm text-[#42526D]">Undergraduate Programmes</span>
      <span className="text-xl text-heading font-bold">
        B.tech in Artificial Intelligence & Data Science
      </span>
      <div className="rounded-[4px] bg-[#FFE9D4] py-0.5 px-2.5 text-sm font-medium text-[#77540A] w-fit">
        Engineering
      </div>
      <div className="w-full py-4 border-y border-[#D4D7E3] flex items-center justify-evenly gap-4">
        <div className="flex py-2.5 items-center pr-4 gap-2 text-xs font-bold text-secondary border-r border-[#D4D7E3]">
          <Image src="/images/timer.svg" alt="timer" width={20} height={20} />
          <span>5 yrs</span>
        </div>
        <div className="flex py-2.5 items-center pr-4 gap-2 text-xs font-bold text-secondary border-r border-[#D4D7E3]">
          <Image src="/images/seats.svg" alt="seats" width={20} height={20} />
          <span>120 Seats</span>
        </div>
        <div className="flex py-2.5 items-center gap-2 text-xs font-bold text-secondary">
          <Image src="/images/building.svg" alt="mode" width={20} height={20} />
          <span>On Campus</span>
        </div>
      </div>
      <div className="flex gap-3 self-end items-center">
        <span className="text-sm text-[#505F79]">Yearly</span>
        <span className=" text-[#6B2EEA] font-bold text-2xl">₹60,000</span>
      </div>
      {/* {<div className="flex"></div>} */}
    </div>
  );
};

export default CourseCard;
