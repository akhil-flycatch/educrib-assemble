"use client";
import EditAddDeleteButton from "@/elements/EditAddDeleteButton";
import {
  ProfileProgrammeFeesEntity,
  ProfileProgramme,
} from "@/types/profileProgramme";
import Image from "next/image";
import { useState } from "react";
import CourseFee from "./courseFee";

const CourseCard: React.FC<{
  data: ProfileProgramme;
  deleteCourse: (id: string) => void;
  editCourse: (course: ProfileProgramme) => void;
}> = ({ data, deleteCourse, editCourse }) => {
  const [isHovered, setIsHovered] = useState(false);
  let timeoutId: NodeJS.Timeout | null = null;
  const debounce = (func: () => void, delay: number): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(func, delay);
  };

  const handleMouseEnter = (): void => {
    debounce(() => setIsHovered(true), 150);
  };

  const handleMouseLeave = (): void => {
    debounce(() => setIsHovered(false), 150);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Engineering":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100";
      case "Science":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "Management":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "Information Technology":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case "Medical & Health Sciences":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100";
      case "Arts & Humanities":
        return "bg-pink-100 text-pink-800 hover:bg-pink-100";
      case "Commerce & Finance":
        return "bg-teal-100 text-teal-800 hover:bg-teal-100";
      case "Social Sciences":
        return "bg-indigo-100 text-indigo-800 hover:bg-indigo-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <div
      className="border border-accent-2 hover:shadow-xl rounded-lg flex flex-col p-6 gap-6 relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered && (
        <div className="absolute right-4 top-4 flex items-center gap-2">
          <button
            className="rounded-full bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 flex items-center justify-center p-2"
            onClick={() => deleteCourse(data?.id)}
          >
            <Image
              src="/images/delete.svg"
              alt="delete"
              width={20}
              height={20}
            />
            <span className="sr-only">Delete</span>
          </button>
          <EditAddDeleteButton
            onClick={() => editCourse(data)}
            type="Edit"
            iconOnly
            className="!rounded-full !p-0 !size-9"
          />
        </div>
      )}
      <span className="text-sm text-[#42526D]">{data?.level.title}</span>
      <span className="text-xl text-heading font-bold">
        {data?.course.title}
      </span>
      <div
        className={`rounded-[4px] py-0.5 px-2.5 text-sm font-medium w-fit ${getCategoryColor(
          data?.specialization?.title
        )}`}
      >
        {data?.specialization.title}
      </div>
      <div className="w-full py-4 border-y border-[#D4D7E3] flex items-center justify-evenly gap-4">
        <div className="flex py-2.5 items-center pr-4 gap-2 text-xs font-bold text-secondary border-r border-[#D4D7E3]">
          <Image src="/images/timer.svg" alt="timer" width={20} height={20} />
          <span>{`${data?.duration} ${data?.durationType?.title}`}</span>
        </div>
        <div className="flex py-2.5 items-center pr-4 gap-2 text-xs font-bold text-secondary border-r border-[#D4D7E3]">
          <Image src="/images/seats.svg" alt="seats" width={20} height={20} />
          <span>{data?.capacity} Seats</span>
        </div>
        <div className="flex py-2.5 items-center gap-2 text-xs font-bold text-secondary">
          <Image src="/images/building.svg" alt="mode" width={20} height={20} />
          <span>{data?.programmeStudyMode?.title ?? ""}</span>
        </div>
      </div>
      {data?.profileProgrammeFees?.length === 1 &&
      data?.profileProgrammeFees[0]?.frequency?.slug === "yearly" ? (
        <div className="flex gap-3 self-end items-center">
          <span className="text-sm text-[#505F79]">Yearly</span>
          <span className=" text-[#6B2EEA] font-bold text-2xl">₹60,000</span>
        </div>
      ) : (
        <div className="flex gap-3 items center justify-end self-end">
          <span className="text-sm text-[#505F79]">
            Multiple Fee Structures
          </span>
          <CourseFee data={data?.profileProgrammeFees} />
        </div>
      )}
    </div>
  );
};

export default CourseCard;
