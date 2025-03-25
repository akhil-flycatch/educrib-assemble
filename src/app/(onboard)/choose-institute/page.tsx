"use client";
import { searchProfiles } from "@/api";
import { Typography } from "@/storybooks/components/atoms";
import { Search } from "@/storybooks/components/molecules";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const page = () => {
  const searchParams = useSearchParams();
  const [loading, setloading] = useState(true);
  const verticalId = searchParams.get("verticalId") ?? "";

  return (
    <div className="w-full">
    <Typography intent="title">Choose your institute</Typography>
    <Search
      navComponent={true}
      navlink={`/create-profile`}
      navTitle="College not found in the list" // className="w-[450px] h-[100px]"
      showImages
      searchEntity={async (keyword: string) => {
        const data = await searchProfiles(keyword, {
          active: true,
          vertical: verticalId,
          notClaimed: true,
        });
        setloading(false)
        console.log("testData", data);
        return data;
      }}
      verticalId={verticalId}
      placeholder="Search Profiles"
      baseRoute="profiles"
      slugAsValue={true}
      onboarding={true}
      creatable
    />
  </div>
  );
};

export default page;
