"use client";
import { NOT_AVAILABLE } from "@/constants/string";
import Button from "@/elements/button";
import Heading from "@/elements/heading";
import Modal from "@/elements/modal";
import Tag from "@/elements/tag";
import Text from "@/elements/text";
// import { specializationId } from '@/storybooks/forms/validations/base';
import { Bookmark, Clock, Edit, Trash, Users } from "lucide-react";

import { deleteProfileProgram } from "@/api";
import { useState } from "react";
import ProgrammeForm from "./courseForm";

export default function CourseItem({
  profileProgramme,
  course,
  speicalization,
  courseLevel,
  category,
}: any) {
  const [visible, setVisible] = useState(false);

  console.log("the courses", course, speicalization);
  return (
    <div className="relative flex flex-col justify-between rounded-md shadow rounded-t-md bg-light group">
      <div className="flex flex-col p-4 space-y-2">
        <span className="text-xs text-primary">
          {courseLevel.title || NOT_AVAILABLE}
        </span>
        <span className="font-bold">{`${course.title} ${
          speicalization && " in "
        }${speicalization.title}`}</span>
        {category && <Tag>{category}</Tag>}
      </div>
      <div className="flex items-center justify-between p-4 bg-secondary/10 rounded-b-md">
        <div className="flex flex-col space-y-2">
          <Text direction="horizontal" className="text-xs" icon={Clock}>
            {profileProgramme.duration} Years
          </Text>
          <Text direction="horizontal" className="text-xs" icon={Users}>
            {profileProgramme.capacity} Seats
          </Text>
          <Text direction="horizontal" className="text-xs" icon={Bookmark}>
            On Campus
          </Text>
        </div>
        <div className="flex flex-col items-end space-y-0">
          <Heading level={6}>₹ 60,000</Heading>
          <span className="text-xs">yearly</span>
        </div>
      </div>
      <div className="absolute inset-0 invisible rounded-md bg-dark/70 group-hover:visible" />
      <div className="absolute inset-0 flex items-center justify-center invisible space-x-2 rounded-md group-hover:visible">
        <Modal
          visible={visible}
          onClose={() => setVisible(false)}
          title="Edit Course"
        >
          <ProgrammeForm
            profile={"clrpz6nnn000mlf08dy5aqjdm"}
            programme={profileProgramme}
          />
          {/* <CourseForm programme={profileProgramme} /> */}
        </Modal>
        <Button icon={Edit} onClick={() => setVisible(true)} />
        <Button
          icon={Trash}
          onClick={() => deleteProfileProgram(profileProgramme?.id)}
        />
      </div>
    </div>
  );
}
