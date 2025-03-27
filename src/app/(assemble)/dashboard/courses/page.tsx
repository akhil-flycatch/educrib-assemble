"use client";
import {
  deleteProfileProgram,
  upsertProfileProgramNew,
} from "@/api/profileProgram";
// import { cookies } from "next/headers";
import ProgrammeForm from "./courseForm";
import CoursesList from "./list";
import DashboardIntroSectionWrapper from "@/components/dashboard/Introduction/sectionWrapper";
import Image from "next/image";
import CourseCard from "@/components/dashboard/courses/card";
import EmptyCoursePage from "@/components/dashboard/courses/empty";
import CourseTable from "@/components/dashboard/courses/table";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CourseForm, {
  courseFormSchema,
  CourseFormValues,
} from "@/components/dashboard/courses/courseForm";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "@/elements/modal";
import { v4 as uuidv4 } from "uuid";
import { upsertAction } from "@/api";
import ConfirmationModal from "@/elements/modalConfirm";
import { ProfileProgramme } from "@/types/profileProgramme";

export default function Courses() {
  // "use server";
  // const cookieStore = cookies();
  // const supabase = createServerComponentClient({ cookies: () => cookieStore });
  // const user = await supabase.auth.getUser();
  // const program = await getProfilePrograms(
  //   { active: true },
  //   user.data.user?.user_metadata.profileId
  // );
  // console.log("the projes", program);

  const [visible, setVisible] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [profileProgrammes, setProfileProgrammes] = useState<
    ProfileProgramme[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileProgrammes = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/profiles");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const { data } = await response.json();
        console.log(data, "dataLog");
        setProfileProgrammes(data as ProfileProgramme[]);
      } catch (error: any) {
        // setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileProgrammes();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      fee: [
        {
          amount: 0,
          description: "",
          frequencyId: "",
          title: "",
          id: uuidv4(),
        },
      ],
    },
  });

  const onCourseFormSubmit = async (data: CourseFormValues) => {
    console.log(data);
    reset();
    setVisible(false);
    upsertAction(
      data,
      upsertProfileProgramNew,
      "Profile Programme saved successfully",
      () => {
        console.log("done");
      }
    );
  };

  const searchAndFilter = (
    <div className="bg-light flex items-center justify-between rounded-[10px] p-3">
      <div className="w-[434px]">
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
            placeholder="Search Facilities"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex gap-2">
          <Image
            src="/images/row-view.svg"
            alt="row-view"
            width={32}
            height={32}
          />
          <Image
            src="/images/grid-view.svg"
            alt="grid-view"
            width={32}
            height={32}
          />
        </div>
        {/* <div>filter button</div> */}
      </div>
    </div>
  );

  return (
    <DashboardIntroSectionWrapper
      title={
        <div className="flex gap-3 items-center">
          <span>Courses</span>
          <div className="rounded-full px-2.5 py-1 bg-[#EAEBEE] text-sm text-[#505F79]">
            12
          </div>
        </div>
      }
      wrapperClass="flex-1 h-full"
      secondaryComponent={searchAndFilter}
      primaryButton={{
        type: "Add",
        onClick: () => {
          setVisible(true);
        },
      }}
    >
      {isLoading && <div>Loading.....</div>}
      {!isLoading && !!profileProgrammes.length && (
        <CourseTable
          deleteCourse={(id) => {
            setDeleteId(id);
          }}
          data={profileProgrammes}
        />
      )}
      {!isLoading && !profileProgrammes.length && <EmptyCoursePage />}
      {/* <div className="grid grid-cols-3 gap-4">
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div> */}
      <Modal
        visible={visible}
        onClose={() => {
          setVisible(false);
          reset();
        }}
        onSave={() => {
          handleSubmit(onCourseFormSubmit)();
        }}
        title="Add Course"
      >
        <CourseForm errors={errors} register={register} control={control} />
      </Modal>
      <ConfirmationModal
        visible={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        title="Delete Course"
        message="Are you sure you want to delete this course? This action cannot be undone."
        type="Delete"
        onConfirm={() => {
          deleteProfileProgram(deleteId);
          setDeleteId(null);
        }}
      />
    </DashboardIntroSectionWrapper>
  );
}
