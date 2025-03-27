// import Courses from '@components/college/courses';
// import Facilities from '@components/college/facilities';
// import Gallery from '@components/college/gallery/list';
// import Genreal from '@components/college/general';
// import Media from '@components/college/media';
// import Staffs from '@components/college/staffs/list';
// import Hostel from '@components/hostel';
// import Button from '@elements/button';
// import Cta from '@elements/cta';
// import DashboardLayout from '@elements/layouts/dashboard';
// import IntroductionForm from '@entry/forms/introduction';
import type { NextPage } from "next";
// import {
// 	Book,
// 	Coffee,
// 	Edit,
// 	Home,
// 	Image,
// 	Save,
// 	Users,
// 	Video
// } from 'react-feather';

import {
  getProfileById,
  getProfileFacilitiesByProfileId,
  getVerticalById,
} from "@/api";
import Cta from "@/elements/cta";
import IntroductionForm from "@/elements/entry/forms/introduction";
import DashboardLayout from "@/elements/layouts/dashboard";
import { Button } from "@/storybooks/components/atoms";
import { Tabs } from "@/storybooks/components/molecules";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Home, Save } from "lucide-react";
import { cookies } from "next/headers";
import collegeJSON from "../../../mock/college.json";
import Courses from "./(sections)/college/courses";
import Facilities from "./(sections)/college/facilities";
import Gallery from "./(sections)/college/gallery";
import Genreal from "./(sections)/college/general";
import Media from "./(sections)/college/media";
import Staffs from "./(sections)/college/staffs";
import Hostel from "./(sections)/hostel";

const Main: NextPage = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const profile = await getProfileById("clrpz6nnn000mlf08dy5aqjdm");
  const facilitiesProfile = await getProfileFacilitiesByProfileId(
    "cm7ircicd0004fydcim7denka",
    { active: true }
  );

  console.log("profile", profile, facilitiesProfile);
  const college = collegeJSON[0];
  // const cookieStore = cookies();
  // const supabase = createServerComponentClient({ cookies: () => cookieStore });

  //   const profile = await getProfileById("clrpz6nnn000mlf08dy5aqjdm");

  //   console.log("profile", profile);

  const tabList = [
    {
      // icon: Edit,
      name: "Introduction",
      content: (
        <Genreal
          profile={profile}
          verified={profile?.verified}
          published={profile?.published}
          id={profile?.id}
          contacts={profile?.profileContacts || []}
          title={profile?.title || "--"}
          university={profile?.university?.title || "--"}
          management={profile?.management?.title || "--"}
          categories={[]}
          establishmentYear={profile?.establishedYear + "" || "--"}
          code={profile?.code}
          accreditations={
            profile?.profileAccreditations?.map(
              (item) => item.accreditation?.title
            ) || ["--"]
          }
          type={profile?.type?.title || "--"}
          logo={profile?.avatar || ""}
          cover={profile?.thumbnail || ""}
        />
      ),
    },

    {
      // icon: Coffee,
      name: "Facilities",
      content: <Facilities facilities={facilitiesProfile} />,
      // content: <Facilities facilities={college?.facilities} />,
    },
    {
      // icon: Image,
      name: "Images",
      content: <Gallery gallery={college?.gallery} title={college?.title} />,
    },
    {
      // icon: Video,
      name: "Media",
      content: (
        <Media
          video={college?.video}
          virtualTour={college?.virtualTour}
          eBrochure={college?.eBrochure}
          website={college?.website}
        />
      ),
    },

    {
      // icon: Users,
      name: "Staffs",
      content: <Staffs />,
    },
    {
      // icon: Users,
      name: "Management",
      content: <Staffs />,
    },
  ];

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user, "$$user");
  if (user) {
    const vertical = await getVerticalById(user?.user_metadata.verticalId);
    console.log(vertical?.title, "$$vertical");
    console.log(vertical?.title == "College", "$$vertical Data");

    if (vertical?.title == "colleges") {
      console.log("Entered evideyenkilum");
      tabList?.push(
        {
          // icon: Book,
          name: "Courses",
          content: <Courses courses={college?.courses} />,
        },
        {
          // icon: Home,
          name: "Hostel",
          content: <Hostel facilities={college?.facilities} />,
        }
      );
    }
    if (vertical?.title == "Schools") {
      tabList?.push(
        {
          // icon: Home,
          name: "Curriculum",
          content: <Hostel facilities={college?.facilities} />,
        },
        {
          // icon: Home,
          name: "Hostel",
          content: <Hostel facilities={college?.facilities} />,
        }
      );
    }
    if (vertical?.title == "Playschool") {
      tabList?.push(
        {
          // icon: Home,
          name: "Curriculum",
          content: <Hostel facilities={college?.facilities} />,
        },
        {
          // icon: Home,
          name: "Hostel",
          content: <Hostel facilities={college?.facilities} />,
        }
      );
    }
    if (vertical?.title == "Institutes") {
      tabList?.push({
        // icon: Book,
        name: "Courses",
        content: <Courses courses={college?.courses} />,
      });
    }
    if (vertical?.title == "Consultants") {
      tabList?.push({
        // icon: Book,
        name: "Services",
        content: <Courses courses={college?.courses} />,
      });
    }
    if (vertical?.title == "Tutors") {
      tabList?.push(
        {
          // icon: Book,
          name: "Subjects",
          content: <Courses courses={college?.courses} />,
        },
        {
          // icon: Book,
          name: "Services",
          content: <Courses courses={college?.courses} />,
        }
      );
    }
    if (vertical?.title == "Classes") {
      tabList?.push(
        {
          // icon: Book,
          name: "Skills",
          content: <Courses courses={college?.courses} />,
        },
        {
          // icon: Book,
          name: "Services",
          content: <Courses courses={college?.courses} />,
        }
      );
    }
    if (vertical?.title == "Internships") {
      tabList?.push({
        // icon: Book,
        name: "Internships",
        content: <Courses courses={college?.courses} />,
      });
    }
  }
  console.log(tabList, "tabList");
  // const college: any = null;

  return (
    <DashboardLayout title={college?.title || "Introduce your college"}>
      {college ? (
        <Tabs defaultTab="Introduction" tabList={tabList} />
      ) : (
        <div className="flex flex-col space-y-4">
          <Cta text="Introduce your college" icon={Home} action={null} />
          <div className="p-4 rounded-md shadow bg-light">
            <IntroductionForm />
            <div className="flex items-center pt-4 space-x-2 bg-light rounded-b-md">
              <Button icon={Save}>Save & Continue</Button>
              <Button theme="secondary">Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Main;
