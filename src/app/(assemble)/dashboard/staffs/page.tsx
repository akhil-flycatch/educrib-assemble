"use client";
import DashboardIntroSectionWrapper from "@/components/dashboard/Introduction/sectionWrapper";
import { useEffect, useState } from "react";
import EmptyStaffPage from "@/components/dashboard/staff/empty";
import Modal from "@/elements/modal";
import StaffForm, {
  staffFormSchema,
  StaffFormValues,
} from "@/components/dashboard/staff/staffForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import StaffCard from "@/components/dashboard/staff/staffCard";
import ConfirmationModal from "@/elements/modalConfirm";
import { deleteProfileStaff, upsertAction } from "@/api";
import { createProfileStaff, editProfileStaff } from "@/api/profileStaff";

const defaultValues: StaffFormValues = {
  id: "",
  avatar: "",
  designation: "",
  email: "",
  phone: "",
  title: "",
};

export default function Staffs() {
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<any>();
  const [toEdit, setToEdit] = useState<StaffFormValues | null>(null);
  const [staffs, setStaffs] = useState<
    {
      title: string;
      designation: string;
      phone: string;
      email: string;
      avatar?: string;
      id: string;
    }[]
  >([]);

  const fetchStaffs = async () => {
    setIsLoading(true);
    const res = await fetch("/api/staffs");
    const { data } = await res.json();
    setStaffs(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchStaffs();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<StaffFormValues>({
    resolver: zodResolver(staffFormSchema),
    defaultValues
  });

  useEffect(() => {
    if (toEdit) {
      reset(toEdit);
      setImageUrl(toEdit.avatar);
      setVisible(true);
    }
  }, [toEdit]);

  const onStaffDelete = async (id: string) => {
    upsertAction(id, deleteProfileStaff, "Staff deleted successfully", () => {
      setDeleteId(null);
      fetchStaffs();
    });
  };

  const setImageUrlChange = (url: string) => setImageUrl(url);

  const onStaffFormSubmit = async (data: StaffFormValues) => {
    const postData = { ...data, avatar: imageUrl };
    if (toEdit) {
      upsertAction(
        postData,
        editProfileStaff,
        "Staff updated successfully",
        () => {
          reset(defaultValues);
          setVisible(false);
          setToEdit(null);
          setImageUrl(null);
          fetchStaffs();
        }
      );
    } else {
    upsertAction(
      postData,
      createProfileStaff,
      "Staff created successfully",
      () => {
        reset(defaultValues);
        setVisible(false);
        fetchStaffs();
      }
    );
    }
  };

  return (
    <DashboardIntroSectionWrapper
      title={
        <div className="flex gap-3 items-center">
          <span>Staff And Management</span>
          {!isLoading && (
            <div className="rounded-full px-2.5 py-1 bg-[#EAEBEE] text-sm text-[#505F79]">
              {staffs.length.toString()}
            </div>
          )}
        </div>
      }
      wrapperClass="flex-1 h-full"
      primaryButton={{
        type: "Add",
        text: "Add Staff",
        onClick: () => {
          setVisible(true);
        },
      }}
    >
      {!isLoading && !staffs.length && <EmptyStaffPage />}
      {!isLoading && staffs.length > 0 && (
        <div className="flex flex-wrap gap-[18px] mb-4">
          {staffs.map((staff) => (
            <StaffCard
              key={staff.id}
              staff={staff}
              deleteStaff={(id) => {
                setDeleteId(id);
              }}
              editStaff={(staff) => {
                setToEdit(staff);
              }}
            />
          ))}
        </div>
      )}
      {isLoading && <div className="w-full text-center">Loading.....</div>}
      <Modal
        visible={visible}
        onClose={() => {
          reset(defaultValues);
          setVisible(false);
          setToEdit(null);
          setImageUrl(null);
        }}
        onSave={() => {
          handleSubmit(onStaffFormSubmit)();
        }}
        title="Add Course"
      >
        <StaffForm
          errors={errors}
          register={register}
          control={control}
          setValue={setValue}
          getValues={getValues}
          setImageUrlChange={setImageUrlChange}
        />
      </Modal>
      <ConfirmationModal
        visible={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        title="Delete Course"
        message="Are you sure you want to delete this staff? This action cannot be undone."
        type="Delete"
        onConfirm={() => onStaffDelete(deleteId!)}
      />
    </DashboardIntroSectionWrapper>
  );
}
