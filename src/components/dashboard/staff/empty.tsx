import Image from "next/image";

const EmptyStaffPage: React.FC = () => (
  <div className="flex flex-col items-center justify-center my-auto gap-4 h-full">
    <Image
      src="/images/staff-placeholder.svg"
      alt="courses"
      width={44}
      height={44}
    />
    <div className="max-w-[344px] text-center">
      No staffs added yet. Please add new members to keep directory updated.
    </div>
  </div>
);

export default EmptyStaffPage;
