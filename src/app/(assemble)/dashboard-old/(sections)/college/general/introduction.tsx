// TODO: Add Placeholder for logo and cover defaults
// TODO: Add Category Tags
"use client";
import Button from "@elements/button";
import Heading from "@elements/heading";
import Info from "@elements/info";
import Modal from "@elements/modal";
import Tag from "@elements/tag";
import Text from "@elements/text";
import IntroductionForm from "@entry/forms/introduction";

import {
  publishProfile,
  updateavatarImage,
  updateProfileImage,
} from "@/api/profile";
import { NOT_AVAILABLE } from "@/constants/string";
import { Form } from "@/storybooks/components/atoms";
import { Image as ImageField } from "@/storybooks/forms/fields";
import { IntroductionProps } from "@/types/college";
import { cn } from "@/utils/cn";
import { Label } from "@radix-ui/react-label";
import cuid from "cuid";
import { Award, Check, Edit, Edit2, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import Image from "next/image";

export default function Introduction({
  title,
  university,
  management,
  categories,
  establishmentYear,
  code,
  accreditations,
  type,
  logo,
  cover,
  id,
  published,
  verified,
  profile
}: IntroductionProps) {
  console.log(published, "value of publlished");
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  console.log("verified", verified);

  const handlePublish = async () => {
    console.log("id inside handle publish", id);
    const formData = new FormData();
    formData.append("id", id);
    formData.append("published", !published ? "on" : "off");

    formData.append("title", title);
    const response = await publishProfile(formData);
    window.location.reload();
    toast.success("Profile Published");
  };
  const [modal, setModal] = useState(false);

  const [proModal, setProModal] = useState(false);
  const submit = async (formData: FormData) => {
    const image = formData.get("image") as string;
    formData.append("id", id);
    formData.append("cover", image);
    console.log("image", image);
    const upsu = await updateProfileImage(formData);
    console.log("upsu", upsu);
    setModal(false);

    window.location.reload();
  };

  const handleSubmit = async (formData: FormData) => {
    const image = formData.get("image") as string;
    formData.append("id", id);
    formData.append("avatar", image);
    console.log("image", image);
    const upsu = await updateavatarImage(formData);
    console.log("upsu", upsu);
    setProModal(false);

    window.location.reload();
  };
  return (
    <>
      <div className="relative w-full h-64">
        <Edit2
          onClick={() => setModal(true)}
          className="w-[20px] h-[20px] absolute top-2 right-4 z-50 left-2"
        />
        <Image
          src={cover || ""}
          alt={`Image of ${title}`}
          objectFit="cover"
          objectPosition="center"
          layout="fill"
          className="rounded-md "
        />
        <div className="absolute z-50 inset-0 invisible rounded-md bg-dark/70 group-hover:visible" />

        <div className="absolute inset-0 bg-dark/20" />
        <div className="absolute border-4 border-white rounded-full shadow w-36 h-36 left-10 -bottom-20">
          <Edit2
            onClick={() => setProModal(true)}
            className="w-[20px] h-[20px] absolute top-3 left-5 z-50"
          />
          <Image
            src={logo || ""}
            alt={`Logo of ${title}`}
            objectFit="cover"
            objectPosition="center"
            layout="fill"
            className="rounded-full hover:scale-105"
          />
        </div>
        <div className="absolute flex items-center space-x-2 top-4 right-4">
          <Button
            disabled={!verified}
            className={cn(
              !verified ? "bg-grey text-dark" : "bg-primary text-white"
            )}
            onClick={() => handlePublish()}
            icon={Check}
          >
            {published ? "Unpublish" : "Publish"}
          </Button>
          <Button icon={Eye} theme="secondary">
            Preview
          </Button>
        </div>
      </div>
      <Heading level={5} className="pl-52">
        {title}
      </Heading>
      <div className="flex items-center justify-between">
        <div className="flex flex-col py-4 pt-2 space-y-2 pl-52">
          {university && <Text icon={Award}>{university}</Text>}
          {management && <Text icon={Award}>{management}</Text>}
          {categories && categories?.length > 0 && (
            <div className="flex items-center space-x-2">
              {categories.map((category) => (
                <Tag key={cuid()}>{category}</Tag>
              ))}
            </div>
          )}
        </div>
        <Modal
          visible={visible}
          onClose={() => setVisible(false)}
          title="Edit Introduction"
        >
          <IntroductionForm profileId={id} profile={profile} />
        </Modal>
        <Button icon={Edit} onClick={() => setVisible(true)}>
          Edit Introduction
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <Info label="Established Year">
          {establishmentYear || NOT_AVAILABLE}
        </Info>
        <Info label="College Code">{code || NOT_AVAILABLE}</Info>
        <Info label="Accreditations">
          {accreditations && accreditations?.length > 0
            ? accreditations.join(", ")
            : NOT_AVAILABLE}
        </Info>
        <Info label="Type">{type || NOT_AVAILABLE}</Info>
      </div>
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
    </>
  );
}
