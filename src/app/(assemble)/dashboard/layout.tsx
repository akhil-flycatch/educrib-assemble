"use client";
import React, { useEffect, useState } from "react";
import "@/styles/globals.css";
import Image from "next/image";
import { DASHBOARD_NAV } from "@/constants/nav/dashboard";
import { useRouter, usePathname } from "next/navigation";
import EditAddDeleteButton from "@/elements/EditAddDeleteButton";
import ConfirmationModal from "@/elements/modalConfirm";
import {
  getProfileById,
  getProfileFacilitiesByProfileId,
  getVerticalById,
} from "@/api";
import Modal from "@/elements/modal";
import { Form } from "@/storybooks/components/atoms";
import { Label } from "@radix-ui/react-label";
import { Image as ImageField } from "@/storybooks/forms/fields";
import Button from "@/elements/button";
import {
  publishProfile,
  updateavatarImage,
  updateProfileImage,
} from "@/api/profile";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, setProfile] = useState(null);
  const [facilitiesProfile, setFacilitiesProfile] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const [isPublishModalOpen, setIsPublishModalOpen] = useState<boolean>(false);
  const isEmpty = !profile || !facilitiesProfile;
  const [navItems, setNavItems] = useState([]);


  
  useEffect(() => {
    const fetchData = async () => {
      const profileData = await getProfileById();
      const facilitiesProfileData = await getProfileFacilitiesByProfileId(
       
        // { active: true }
      );
      setProfile(profileData);
      setFacilitiesProfile(facilitiesProfileData);
      const vertical = await getVerticalById();
      console.log(vertical, "the vertical got");
      const fetchedNavItems =
      DASHBOARD_NAV[vertical?.slug] || [  ];
    setNavItems(fetchedNavItems);
    fetchedNavItems.forEach((item) => router.prefetch(item.url));
    };

    fetchData();
    
  }, []);

  const [modal, setModal] = useState(false);

  const [proModal, setProModal] = useState(false);
  const handlePublish = async () => {
    const formData = new FormData();
    formData.append("id", profile?.id);
    formData.append("published", !profile?.published ? "on" : "off");

    formData.append("title", profile?.title);
    await publishProfile(formData);
    // window.location.reload();
  };
  const submit = async (formData: FormData) => {
    const image = formData.get("image") as string;
    formData.append("id", profile?.id);
    formData.append("cover", image);
    await updateProfileImage(formData);
    setModal(false);

    // window.location.reload();
  };

  const handleSubmit = async (formData: FormData) => {
    const image = formData.get("image") as string;
    formData.append("id", profile?.id);
    formData.append("avatar", image);
    await updateavatarImage(formData);
    setProModal(false);
    // window.location.reload();
  };

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
                  backgroundImage: `url(${profile?.thumbnail || "/images/mocks/college-cover.png"
                    })`,
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
                    backgroundImage: `url(${profile?.avatar || "/images/mocks/college-avatar.png"
                      })`,
                  }}
                />
              )}
              <EditAddDeleteButton
                onClick={() => setProModal(true)}
                type="Edit"
                iconOnly
                className="absolute bottom-0 right-0 !rounded-full !p-0 !size-9"
              />
            </div>
            <EditAddDeleteButton
              onClick={() => setModal(true)}
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
                // disabled={!profile?.verified}

                // disabled={isEmpty}
                className={`py-3 px-4 rounded-lg text-white font-medium flex items-center gap-2.5 ${profile?.published
                    ? "cursor-not-allowed bg-[#A6AEBB]"
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
                <span> {profile?.published ? "Unpublish" : "Publish"}</span>
              </button>
            </div>
          </div>
          <div className="border-t mt-6 border-accent-2 w-full pt-6 flex px-12 gap-4">
            {navItems.map((navItem) => (
              <Link key={navItem.url} href={navItem.url} passHref prefetch>
                <div
                  className={`font-medium h-11 capitalize ${pathname === navItem.url
                      ? "text-asm-purple border-b-[3px] border-asm-purple"
                      : "cursor-pointer text-label"
                    }`}
                >
                  {navItem.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex-1">{children}</div>
      </div>
      <ConfirmationModal
        visible={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onConfirm={() => handlePublish()}
        message="This profile details has been published. Admin will be able to edit this post and republish changes."
        title="Profile Published"
      />
      {modal && (
        <Modal
          footerVisible={false}
          visible={modal}
          onClose={() => setModal(false)}
          title="Edit Cover Picture"
        >
          <Form action={submit}>
            <Label htmlFor="image">Image</Label>

            <ImageField />

            <Button type="submit">Submit</Button>
          </Form>
        </Modal>
      )}

      {proModal && (
        <Modal
          footerVisible={false}
          visible={proModal}
          onClose={() => setProModal(false)}
          title="Edit Profile Picture"
        >
          <Form action={handleSubmit}>
            <Label htmlFor="image">Image</Label>

            <ImageField />

            <Button type="submit">Submit</Button>
          </Form>
        </Modal>
      )}
    </React.Fragment>
  );
}
