// TODO: Handles no courses condition

import cuid from "cuid";
// import {
// 	CoursesProps
// } from 'types/college';

import CourseItem from "./item";

export default function CoursesList({ courses }: any) {
  console.log("The corrs", courses);
  return (
    <div className="grid grid-cols-2 gap-4">
      {courses &&
        courses?.length > 0 &&
        courses.map((course: any) => (
          <CourseItem
            key={cuid()}
            profileProgramme={course}
            course={course.course}
            speicalization={course.specialization}
            courseLevel={course.level}
            category={course.category}
          />
        ))}
    </div>
  );
}
