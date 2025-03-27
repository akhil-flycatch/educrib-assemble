"use server";
// TODO: Handles no courses conditio
import { getProfilePrograms } from "@/api/profileProgram";
import Button from "@/elements/button";
import Cta from "@/elements/cta";
import { DialogForm } from "@/storybooks/components/molecules";
import { CoursesProps } from "@/types/college";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Book, Plus } from "lucide-react";
import { cookies } from "next/headers";
import ProgrammeForm from "./courseForm";
import CoursesList from "./list";

export default async function Courses({ courses }: CoursesProps) {
  // "use server";
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const user = await supabase.auth.getUser();
  const program = await getProfilePrograms(
    { active: true },
    user.data.user?.user_metadata.profileId
  );
  console.log("the projes", program);

  return (
    <div className="flex flex-col space-y-4">
      <DialogForm
        trigger={
          <Cta
            text={`${courses?.length > 0 ? courses?.length : 0} Courses`}
            action={<Button icon={Plus}>Add Course</Button>}
            icon={Book}
          />
        }
        form={
          <ProgrammeForm profile={"clrpz6nnn000mlf08dy5aqjdm"} programme={[]} />
        }
        title="Add New Course"
      />
      <CoursesList courses={program} />
      {/* {program?.map((courses:any, index:any) => {
        return (
          <>
           <CoursesList courses={courses} />
          </>
        )
      })} */}
    </div>
  );
}
