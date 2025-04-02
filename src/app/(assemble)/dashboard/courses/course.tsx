"use client";
import {
  deleteProfileProgram,
  upsertProfileProgramNew,
} from "@/api/profileProgram";
import DashboardIntroSectionWrapper from "@/components/dashboard/Introduction/sectionWrapper";
import Image from "next/image";
import EmptyCoursePage from "@/components/dashboard/courses/empty";
import CourseTable from "@/components/dashboard/courses/table";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  Suspense,
} from "react";
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CourseGrid from "@/components/dashboard/courses/grid";
import useIntersectionObserver from "@react-hook/intersection-observer";
export const dynamic = "force-dynamic";

export default function Courses() {
  const [visible, setVisible] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toEdit, setToEdit] = useState<ProfileProgramme | null>(null);
  const [profileProgrammes, setProfileProgrammes] = useState<
    ProfileProgramme[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [nextCursorId, setNextCursorId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [paginationDetails, setPaginationDetails] = useState<{
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const view = searchParams.get("view") === "grid" ? "grid" : "table";
  const loadMoreRef = useRef<HTMLElement>(null);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const fetchProfileProgrammes = async () => {
    setIsLoading(true);
    let queryParams = new URLSearchParams({
      search: debouncedSearchTerm.length > 2 ? debouncedSearchTerm : "",
    });
    try {
      if (view === "grid") {
        if (nextCursorId) {
          queryParams.append("cursor", nextCursorId || "");
          queryParams.append("limit", "6");
        } else {
          queryParams.append("page", currentPage.toString());
          queryParams.append("limit", "6");
        }
      } else {
        queryParams.append("page", currentPage.toString());
        queryParams.append("limit", itemsPerPage.toString());
      }
      const response = await fetch(`/api/profiles?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const { data, pagination, nextCursor } = await response.json();
      if (view === "grid") {
        if (nextCursorId)
          setProfileProgrammes((prevProfileProgrammes) => [
            ...prevProfileProgrammes,
            ...(data as ProfileProgramme[]),
          ]);
        else setProfileProgrammes(data as ProfileProgramme[]);
      } else {
        setProfileProgrammes(data as ProfileProgramme[]);
        setPaginationDetails(pagination);
      }
      setNextCursorId(nextCursor);
      // setProfileProgrammes(data as ProfileProgramme[]);
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm.length > 2) {
      const debounceTimeout = setTimeout(() => {
        setDebouncedSearchTerm(searchTerm);
        setNextCursorId(null);
      }, 500);
      return () => {
        clearTimeout(debounceTimeout);
      };
    } else setDebouncedSearchTerm("");
  }, [searchTerm]);

  useEffect(() => {
    fetchProfileProgrammes();
  }, [itemsPerPage, currentPage, debouncedSearchTerm]);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    // console.log("Observer attaching...");
    // console.log(loadMoreRef.current, "loadMoreRef.current");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && nextCursorId && view === "grid") {
          // console.log(entry.isIntersecting, "Observer triggered!");
          fetchProfileProgrammes();
        }
      },
      { rootMargin: "100px" }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect(); // Cleanup observer
  }, [nextCursorId]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      courseId: "",
      levelId: "",
      specializationId: "",
      intakeId: "",
      mode: "",
      durationType: "",
      fee: [
        {
          amount: "",
          description: "",
          frequencyId: "",
          title: "",
          id: uuidv4(),
        },
      ],
    },
  });

  useEffect(() => {
    if (toEdit) {
      const {
        capacity,
        courseId,
        levelId,
        specializationId,
        intakeId,
        duration,
        durationTypeId: durationType,
        studyModeId: mode,
        profileProgrammeFees,
      } = toEdit;
      const toEditFee = profileProgrammeFees?.map((fee) => {
        return {
          amount: fee.amount,
          description: fee.description,
          frequencyId: fee.frequencyId,
          title: fee.title,
          id: fee.id,
        };
      });

      reset({
        courseId,
        capacity,
        levelId,
        specializationId,
        intakeId,
        duration,
        durationType,
        mode,
        fee: toEditFee,
      });

      setVisible(true);
    }
  }, [toEdit]);

  const onCourseFormSubmit = async (data: CourseFormValues) => {
    if (toEdit) {
      const { id } = toEdit;
      upsertAction(
        { ...data, id },
        upsertProfileProgramNew,
        "Profile programme updated successfully",
        () => {
          reset();
          setVisible(false);
          setToEdit(null);
          fetchProfileProgrammes();
        }
      );
    } else {
      upsertAction(
        data,
        upsertProfileProgramNew,
        "Profile programme saved successfully",
        () => {
          reset();
          setVisible(false);
          fetchProfileProgrammes();
        }
      );
    }
  };

  const onCourseDelete = async (id: string) => {
    upsertAction(
      id,
      deleteProfileProgram,
      "Profile programme deleted successfully",
      () => {
        setDeleteId(null);
        fetchProfileProgrammes();
      }
    );
  };

  const searchAndFilterCourses = (
    <Suspense fallback={<div>Loading...</div>}>
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
              placeholder="Search by course name, type, and category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-2">
            <button
              onClick={() => {
                setProfileProgrammes([]);
                setCurrentPage(1);
                setItemsPerPage(10);
                router.push(
                  pathname + "?" + createQueryString("view", "table")
                );
              }}
            >
              {view === "table" ? (
                <Image
                  src="/images/row-view-active.svg"
                  alt="row-view"
                  width={32}
                  height={32}
                />
              ) : (
                <Image
                  src="/images/row-view.svg"
                  alt="row-view"
                  width={32}
                  height={32}
                />
              )}
            </button>

            <button
              onClick={() => {
                setProfileProgrammes([]);
                setCurrentPage(1);
                setItemsPerPage(9);
                router.push(pathname + "?" + createQueryString("view", "grid"));
              }}
            >
              {view === "grid" ? (
                <Image
                  src="/images/grid-view-active.svg"
                  alt="grid-view"
                  width={32}
                  height={32}
                />
              ) : (
                <Image
                  src="/images/grid-view.svg"
                  alt="grid-view"
                  width={32}
                  height={32}
                />
              )}
            </button>
          </div>
          {/* <div>filter button</div> */}
        </div>
      </div>
    </Suspense>
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardIntroSectionWrapper
        title={
          <div className="flex gap-3 items-center">
            <span>Courses</span>
            <div className="rounded-full px-2.5 py-1 bg-[#EAEBEE] text-sm text-[#505F79]">
              {paginationDetails?.totalItems.toString()}
            </div>
          </div>
        }
        wrapperClass="flex-1 h-full"
        secondaryComponent={searchAndFilterCourses}
        primaryButton={{
          type: "Add",
          onClick: () => {
            setVisible(true);
          },
        }}
      >
        {!isLoading && !!profileProgrammes.length && view === "table" && (
          <CourseTable
            deleteCourse={(id) => {
              setDeleteId(id);
            }}
            editCourse={(course) => {
              setToEdit(course);
            }}
            data={profileProgrammes}
            paginationDetails={paginationDetails}
            currentPage={currentPage}
            setCurrentPage={(page) => {
              setCurrentPage(page);
            }}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={(itemsPerPage) => {
              setItemsPerPage(itemsPerPage);
            }}
          />
        )}
        {!isLoading && !profileProgrammes.length && <EmptyCoursePage />}
        {!!profileProgrammes.length && view === "grid" && (
          <React.Fragment>
            <CourseGrid
              deleteCourse={(id) => {
                setDeleteId(id);
              }}
              editCourse={(course) => {
                setToEdit(course);
              }}
              data={profileProgrammes}
            />
          </React.Fragment>
        )}
        <div ref={loadMoreRef} className="h-2 mt-4" />
        {isLoading && <div className="w-full text-center">Loading.....</div>}
        <Modal
          visible={visible}
          onClose={() => {
            setVisible(false);
            setToEdit(null);
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
          onConfirm={() => onCourseDelete(deleteId!)}
        />
      </DashboardIntroSectionWrapper>
    </Suspense>
  );
}
