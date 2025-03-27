import Image from "next/image";

const EmptyCoursePage: React.FC = () => (
  <div className="flex flex-col items-center justify-center my-auto gap-4 h-full">
    <Image
      src="/images/courses-placeholder.svg"
      alt="courses"
      width={44}
      height={44}
    />
    <div className="max-w-[344px] text-center">
      No courses added yet. Please add new courses to make them available for
      users
    </div>
  </div>
);

export default EmptyCoursePage;
