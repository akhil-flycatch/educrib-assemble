"use client";

import { useRouter } from "next/navigation";

import { Form, Typography } from "@/storybooks/components/atoms";
import {  Email, Image, Name, Phone, Submit } from "@/storybooks/forms/fields";
import { updateUser } from "../../../api/user";
import Designation from "@/elements/entry/fields/designation";

const CreateProfile = () => {
  const router = useRouter();
  const submit = async (formData: FormData) => {
   const metaUser= await updateUser(formData);
   console.log(metaUser,"metaUser")
   if(metaUser?.profileId){
    router.push("/thank-you");  
  }else{
router.push("/create-institute");  }
  };
  return (
    <div className="flex flex-col gap-2 items-center">
       <p className=" font-semibold text-[36px] leading-[57.6px] tracking-[0.01em] text-center text-[#354764]">Let's set up your </p>
       <p className=" font-semibold text-[36px] leading-[57.6px] tracking-[0.01em] text-center text-[#354764]">admin profile</p>

            <p className=" font-normal text-[20px] leading-[32px] tracking-[0.01em] text-center text-[#505F79]">
            Create your admin profile here   </p>
      <Form action={submit} className="bg-white flex flex-col gap-5 p-5 rounded-2xl">
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        {/* <Image /> */}
        <Name label={false}  />
        <Designation label={false}/>
        <Phone label={false}/>
        <Email label={false}/>
        <Submit  />
      </Form>
    </div>
  );
};

export default CreateProfile;
