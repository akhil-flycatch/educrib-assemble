import EditAddDeleteButton from "@/elements/EditAddDeleteButton";
import Image from "next/image";

export interface Staff {
  id: string;
  title: string;
  email: string;
  phone: string;
  avatar?: string;
  designation: string;
}

interface Props {
  staff: Staff;
  deleteStaff: (id: string) => void;
  editStaff: (staff: {
    id: string;
    title: string;
    email: string;
    phone: string;
    avatar?: string;
    designation: string;
  }) => void;
}

const StaffCard: React.FC<Props> = ({ staff, editStaff, deleteStaff }) => {
  const { id, title, email, phone, avatar, designation } = staff;

  return (
    <div className="border border-accent-2 p-4 bg-white hover:shadow-md rounded-lg flex flex-col items-center gap-4 w-[250px]">
      <div
        className={`size-[66px] rounded-full flex items-center justify-center overflow-hidden pointer-events-none ${
          avatar ? "" : "bg-[#B55EE5]"
        }`}
      >
        {avatar ? (
          <Image src={avatar} alt="avatar" width={66} height={66} />
        ) : (
          <span className="text-white font-medium leading-[29.7px] text-[26.4px]">
            {title[0]}
          </span>
        )}
      </div>
      <div className="text-center flex flex-col items-center">
        <span className="mb-1 text-heading font-bold text-lg leading-[30px]">
          {title}
        </span>
        <span className="mb-6 text-[#354764] text-sm leading-[22px]">
          {designation}
        </span>
        <span className="mb-0.5 text-secondary text-sm leading-[22px]">
          {phone}
        </span>
        <span className=" text-secondary text-sm leading-[22px]">{email}</span>
      </div>
      <div className="flex items-center justify-center gap-3">
        <button
          className="rounded-full bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 flex items-center justify-center p-2"
          onClick={() => deleteStaff(id)}
        >
          <Image src="/images/delete.svg" alt="delete" width={20} height={20} />
          <span className="sr-only">Delete</span>
        </button>
        <EditAddDeleteButton
          onClick={() => editStaff(staff)}
          type="Edit"
          iconOnly
          className="!rounded-full !p-0 !size-8"
        />
      </div>
    </div>
  );
};

export default StaffCard;
