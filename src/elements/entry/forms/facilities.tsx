"use client";
import { MoveRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { searchFacilities, selectProfile } from "@/api";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { AutoComplete } from "@/storybooks/components/atoms";
import { searchFn } from "@/storybooks/components/atoms/type";
import { Form } from "react-hook-form";
import { useForm } from "react-hook-form";
import CapsuleWithIcons from "@/app/(assemble)/dashboard/facilities/capsules";

const FacilitySearch = ({
  register,
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
  navTitle,
  handleFacilitiesChange,
  defaultValue,
  onDeleteById,
}: {
  register?: any;
  searchEntity: any;
  placeholder: string;
  verticalId: string;
  baseRoute: string;
  slugAsValue?: boolean;
  onboarding?: boolean;
  creatable?: boolean;
  showImages?: boolean;
  className?: string;
  navlink?: string;
  navComponent?: boolean;
  navTitle?: string;
  handleFacilitiesChange?: any;
  defaultValue?: any;
  onDeleteById?: any;
}) => {
  const router = useRouter();
  const [searchFields, setSearchFields] = useState<number>(
    defaultValue ? defaultValue.length : 1
  );
  const [addedFacilities, setAddedFacilities] = useState<any>(defaultValue || [{ label: "Facility", value: "" }]);


  // Prefill the facilities if defaultValue is provided
  useEffect(() => {
    if (defaultValue?.length) {
      defaultValue.map((facility: any, index: number) => {
        handleSelectOption(facility, index);
      });
    }
  }, [defaultValue]);

  const handleAddField = () => {
    setAddedFacilities((prevsta) => [
      ...prevsta,
      { value: "", label: "" },
    ]);
    setSearchFields((prev) => prev + 1);
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

  const handleSelectOption = (selectedOption: any, index: any) => {
    if (
      addedFacilities.some(
        (facility: any) => facility.value === selectedOption.value
      )
    ) {
      
      return; // Don't add duplicates
    }
    
    setAddedFacilities((prevAddedFacilities:any) => {
      const newFacilities = [
        ...prevAddedFacilities.slice(0, index),
        selectedOption, // Replace the item at the specified index with the selectedOption
        ...prevAddedFacilities.slice(index + 1),
      ];
      handleFacilitiesChange(newFacilities)
      return [
        ...prevAddedFacilities.slice(0, index),
        selectedOption, // Replace the item at the specified index with the selectedOption
        ...prevAddedFacilities.slice(index + 1),
      ];
    });
 
  };

  const onDelete = async(title: any) => {
    await onDeleteById(title);
    // Remove the selected facility by filtering it out from the addedFacilities state
  
    setAddedFacilities((prevAddedFacilities: any) => {
      const removedFilteredFacilities =  prevAddedFacilities.filter((faci: any) => faci.value !== title)
      handleFacilitiesChange(removedFilteredFacilities)
      return prevAddedFacilities.filter((faci: any) => faci.value !== title);
    });

    // Decrease the search field count as one AutoComplete field will be removed
    setSearchFields((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="bg-transparent p-0">
      <div
        className={"flex w-full gap-2 justify-between flex-col"}
        style={{ minWidth: "500px" }}
      >
         {addedFacilities.length > 0 &&
                  addedFacilities.map((facility, index) => (
                    <AutoComplete
                      key={facility.value} // Use a unique value (like facility.value) as the key prop
                      defaultValue={facility || undefined}
                      searchFn={(term) => searchFacilities(term, { active: true })}
                      name="keyword"
                      placeholder={placeholder}
                      slugAsValue={slugAsValue}
                      creatable={creatable}
                      required
                      showImages={true}
                      navComponent={navComponent}
                      navLink={navlink}
                      navTitle={navTitle || ""}
                      onSelect={(e) => handleSelectOption(e, index)}
                    />
                  ))}
        
        {/* Render AutoComplete fields */}
        {/* {Array.from({ length: searchFields }).map((_, index) => (
          <AutoComplete
            defaultValue={addedFacilities[index] || undefined}
            // register={register}
            // showImages={true}
            key={index}
            className="relative w-full peer"
            // defaultValue={undefined}
            searchFn={(term) => searchFacilities(term, { active: true })}
            name="keyword"
            placeholder={placeholder}
            slugAsValue={slugAsValue}
            creatable={creatable}
            required
            showImages={true}
            navComponent={navComponent}
            navLink={navlink}
            navTitle={navTitle || ""}
            onSelect={(e) => handleSelectOption(e, index)}
          />
        ))} */}

        <button
          type="button"
          className="w-[160px] border text-[#313957] py-[8px] px-[14px] mt-[16px] rounded-[8px]"
          onClick={handleAddField}
          disabled={addedFacilities?.length === 0 ? true : false}
        >
          + Add Facility
        </button>

        {/* Show capsules with icons for each added facility */}
        {addedFacilities.length > 0 && (
          <div className="mt-4">
            {addedFacilities.map((facility: any, index: number) => (
              <CapsuleWithIcons
                key={index}
                name={facility?.label || facility?.value}
                onDelete={() => onDelete(facility.value)} // Pass the facility value to delete
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FacilitySearch;
