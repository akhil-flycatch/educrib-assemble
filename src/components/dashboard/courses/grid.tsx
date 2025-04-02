import { ProfileProgramme } from "@/types/profileProgramme";
import CourseCard from "./card";

interface CourseGridProps {
  deleteCourse: (id: string) => void;
  data: ProfileProgramme[];
  editCourse: (course: ProfileProgramme) => void;
}

const CourseGrid: React.FC<CourseGridProps> = ({
  deleteCourse,
  data,
  editCourse,
}) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map((course) => (
        <CourseCard
          key={course?.id}
          data={course}
          editCourse={editCourse}
          deleteCourse={deleteCourse}
        />
      ))}
    </div>
  );
};

export default CourseGrid;
