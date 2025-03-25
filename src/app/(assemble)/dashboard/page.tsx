"use client";
import React, { useEffect, useState } from "react";
import "@/styles/globals.css";

import collegeJSON from "../../../mock/college.json";
import Image from "next/image";
import { DASHBOARD_NAV } from "@/constants/nav/dashboard";
import { useRouter, usePathname } from "next/navigation";
import EditAddDeleteButton from "@/elements/EditAddDeleteButton";
import ConfirmationModal from "@/elements/modalConfirm";
import { getProfileById, getProfileFacilitiesByProfileId, getVerticalById } from "@/api";
import { Tabs } from "@/storybooks/components/molecules";
import Genreal from "../dashboard-old/(sections)/college/general";
import Facilities from "./facilities/page";
import Gallery from "./images/page";
import Media from "./media/page";
import Staffs from "./staffs/page";
import Introduction from "./introduction/page";
import Hostel from "./hostel/page";
import Courses from "./courses/page";

export default  function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [profile, setProfile] = useState<any>(null);
  const [facilitiesProfile, setFacilitiesProfile] = useState<any>(null);
  const [verticalById, setVerticalById]= useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [isPublishModalOpen, setIsPublishModalOpen] = useState<boolean>(false);
  const isEmpty = !profile || !facilitiesProfile;
  useEffect(() => {
    const fetchData = async () => {
      const profileData = await getProfileById("");
      const facilitiesProfileData = await getProfileFacilitiesByProfileId(
        "",
        { active: true }
      );
      setProfile(profileData);
      setFacilitiesProfile(facilitiesProfileData);

  const vertical = await getVerticalById();
  setVerticalById(vertical)
  console.log(vertical?.title, "$$vertical");
  console.log(vertical?.title == "College", "$$vertical Data");
    };

    fetchData();
  }, []);

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
        <Introduction/>
        // <Genreal
        //   profile={profile}
        //   verified={profile?.verified}
        //   published={profile?.published}
        //   id={profile?.id}
        //   contacts={profile?.profileContacts || []}
        //   title={profile?.title || "--"}
        //   university={profile?.university?.title || "--"}
        //   management={profile?.management?.title || "--"}
        //   categories={[]}
        //   establishmentYear={profile?.establishedYear + "" || "--"}
        //   code={profile?.code}
        //   accreditations={
        //     profile?.profileAccreditations?.map(
        //       (item) => item.accreditation?.title
        //     ) || ["--"]
        //   }
        //   type={profile?.type?.title || "--"}
        //   logo={profile?.avatar || ""}
        //   cover={profile?.thumbnail || ""}
        // />
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


  if (verticalById?.title == "College") {
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
  if (verticalById?.title == "Schools") {
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
  if (verticalById?.title == "Playschool") {
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
  if (verticalById?.title == "Institutes") {
    tabList?.push({
      // icon: Book,
      name: "Courses",
      content: <Courses courses={college?.courses} />,
    });
  }
  if (verticalById?.title == "Consultants") {
    tabList?.push({
      // icon: Book,
      name: "Services",
      content: <Courses courses={college?.courses} />,
    });
  }
  if (verticalById?.title == "Tutors") {
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
  if (verticalById?.title == "Classes") {
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
  if (verticalById?.title == "Internships") {
    tabList?.push({
      // icon: Book,
      name: "Internships",
      content: <Courses courses={college?.courses} />,
    });
  }

  console.log(tabList, "tabList");
  // const college: any = null;

  return (
    <React.Fragment>
      <div className="w-full flex flex-col px-12 gap-4">
        <div className="min-w-[1096px] w-full bg-white border border-accent-2 rounded-b-[10px]">
          <div className="relative">
            {!profile?.thumbnail ? (
              <div className="bg-light-200 h-64 w-full rounded-b-[10px] flex items-center justify-center">
                <Image
                  src="/images/image-placeholder.svg"
                  alt="cover"
                  width={44}
                  height={44}
                />
              </div>
            ) : (
              <div
                className="bg-cover bg-center h-64 w-full rounded-b-[10px]"
                style={{
                  backgroundImage: `url(${profile?.thumbnail || "/images/mocks/college-cover.png"})`,
                }}
              />
            )}
            <div className="bg-gradient-to-b from-[#51515100] to-[#030303] h-[87px] w-full absolute bottom-0 rounded-b-[10px]" />
            <div className="absolute bottom-[-40px] left-6 size-[135px] rounded-full bg-[#D4D7E3] flex items-center justify-center border border-[#EBEDF0]">
              {!profile?.avatar ? (
                <div className="bg-white size-[127px] rounded-full flex items-center justify-center">
                  <Image
                    src="/images/avatar-placeholder.svg"
                    alt="avatar"
                    width={64}
                    height={64}
                  />
                </div>
              ) : (
                <div
                  className="bg-cover bg-center size-[115px] rounded-full"
                  style={{
                    backgroundImage: `url(${profile?.thumbnail || "/images/mocks/college-avatar.png"})`,
                  }}
                />
              )}
              <EditAddDeleteButton
                type="Edit"
                iconOnly
                className="absolute bottom-0 right-0 !rounded-full !p-0 !size-9"
              />
            </div>
            <EditAddDeleteButton
              type="Edit"
              text="Edit Cover Image"
              className="absolute bottom-5 right-6"
            />
          </div>

          <div className="flex mt-12 items-center justify-between px-12">
            <div className="flex flex-col gap-[15px] capitalize">
              <span className="text-heading font-bold text-[28px] leading-20">
                {/* Amal jyothi college of engineering */}
                {profile?.title}
              </span>
              <span className="capitalize text-lg text-secondary">
                {profile?.address}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button className="py-3 px-4 rounded-lg border border-primary bg-white text-primary hover:bg-light hover:border-[#B3B9C4] font-medium flex items-center gap-2.5">
                <Image
                  src="/images/eye.svg"
                  alt="preview"
                  width={24}
                  height={24}
                />
                <span>Preview</span>
              </button>
              <button
                // disabled={isEmpty}
                className={`py-3 px-4 rounded-lg bg-primary text-white font-medium flex items-center gap-2.5 ${isEmpty
                    ? "cursor-not-allowed disabled:bg-disabled"
                    : "cursor-pointer hover:bg-secondary "
                  }`}
                onClick={() => setIsPublishModalOpen(true)}
              >
                <Image
                  src="/images/share.svg"
                  alt="publish"
                  width={24}
                  height={24}
                />
                <span>Publish</span>
              </button>
            </div>
          </div>
          {/* <div className="border-t mt-6 border-accent-2 w-full pt-6 flex px-12 gap-4">
            {DASHBOARD_NAV.map((navItem) => (
              <div
                key={navItem.url}
                className={`font-medium h-11 capitalize ${
                  pathname === navItem.url
                    ? "text-asm-purple border-b-[3px] border-asm-purple"
                    : "cursor-pointer text-label"
                }`}
                onClick={() => {
                  if (pathname !== navItem.url) router.push(navItem.url);
                }}
              >
                {navItem.name}
              </div>
            ))}
          </div> */}
          <div>
            <Tabs defaultTab="Introduction" tabList={tabList} />
          </div>
        </div>
        {/* <div className="flex-1">{children}</div> */}
      </div>
      <ConfirmationModal
        visible={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onConfirm={() => { }}
        message="This profile details has been published. Admin will be able to edit this post and republish changes."
        title="Profile Published"
      />
    </React.Fragment>
  );
}