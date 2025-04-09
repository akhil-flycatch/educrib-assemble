"use client";
import { MoveRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { selectProfile } from "@/api";

import { AutoComplete, Button, Form } from "../atoms";
import { searchFn } from "../atoms/type";
import { cn } from "@/lib/utils";
import { useState } from "react";

const FacilitySearch = ({
    searchEntity,
    placeholder,
    baseRoute,
    verticalId,
    slugAsValue = true,
    onboarding = false,
    creatable = false,
    showImages = false,
    className,
    navlink,
    navComponent,
    navTitle
}: {
    searchEntity: searchFn;
    placeholder: string;
    verticalId: string;
    baseRoute: string;
    slugAsValue?: boolean;
    onboarding?: boolean;
    creatable?: boolean;
    showImages?: boolean
    className?: string
    navlink?: string
    navComponent?: boolean
    navTitle?: string
}) => {
    const router = useRouter();


    const [searchFields, setSearchFields] = useState<number>(1);
    const handleAddField = () => {
        setSearchFields(prev => prev + 1);
    };



    const searchAction = async (formData: FormData) => {
        const slug = formData.get("keyword") as string;
        const isNew = formData.get("new-option") as string;
        formData.append("verticalId", verticalId);
        if (onboarding) {
            await selectProfile(formData);
            router.push(`/create-profile`);
        } else {
            if (slug) router.push(`${baseRoute}/${slug}`);
        }
    };

    return (
        <Form action={searchAction} className="bg-transparent p-0">
            <div className={"flex w-full gap-2 justify-between flex-col"}>

                {/* <div className={cn(" w-full", className)}>
          <AutoComplete
            // className="w-[388px] h-[60px] rounded-[10px]"

            defaultValue={undefined}
            name="keyword"
            //placeholder={placeholder}
            placeholder={placeholder}
            searchFn={searchEntity}
            slugAsValue={slugAsValue}
            creatable={creatable}
            required
            showImages={showImages}
            navComponent={navComponent}
            navLink={navlink}
            navTitle={navTitle || ""}
          />
        </div> */}
                {Array.from({ length: searchFields }).map((_, index) => (
                    <AutoComplete
                        className="relative w-full peer"
                        defaultValue={undefined}
                        name="keyword"
                        placeholder="Facility name"
                        searchFn={searchEntity}
                        slugAsValue={slugAsValue}
                        creatable={creatable}
                        required
                        showImages={showImages}
                        navComponent={navComponent}
                        navLink={navlink}
                        navTitle={navTitle || ""}
                    />
                ))}

                <button
                    type="button"  
                    className="w-[160px] border text-[#313957] py-[8px] px-[14px] mt-[16px] rounded-[8px]"
                    onClick={handleAddField} 
                >
                    + Add Facility
                </button>


                {/* <Button type="submit" className="h-[60px] rounded-[10px] mt-3">

          Claim this college
        </Button> */}

            </div>
            {/* <label htmlFor="new-option">My institution is not listed</label>
      <input className="ml-4" type="checkbox" name="new-option" /> */}
        </Form>
    );
};

export default FacilitySearch;
