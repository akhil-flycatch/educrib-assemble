import { searchFacilities } from "@/api";
import FileUpload from "@/components/hookForm/fileUpload";
import Input from "@/components/hookForm/input";
import Select from "@/components/hookForm/select";
import AutoComplete from "@/storybooks/components/atoms/AutoComplete";
import { keywords } from "@/storybooks/forms/validations/base";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { capacity } from "@/storybooks/forms/validations/base";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import * as z from "zod";

export const HostelormSchema = z.object({
  hostelTypeId: z.string(),
  avatar: z.string(),
  capacity: z.number(),
  cautionDeposit: z.number(),
  admissionFees: z.number(),
  roomRent: z.number(),
  messFees: z.number(),
  laundryFees: z.number(),
  contactName: z.string(),
  phone: z.string(),
  facilityId: z.string().array(),
});

export type HostelFormValues = z.infer<typeof HostelormSchema>;

interface Props {
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
  allHostelTypes?: any;
  allamenities?: any;
  setValue?: any;
  setImageUrlHostelChange?: any;
  searchingAmenitiesInModal?:any;
  navlink?: string;
  navComponent?: boolean;
  navTitle?: string;
  getValues?:any
}
const HostelPageForm: React.FC<Props> = ({
  errors,
  register,
  allHostelTypes,
  allamenities,
  setValue,
  setImageUrlHostelChange,
  searchingAmenitiesInModal,
  navlink,
  navComponent,
  navTitle,
  getValues
}) => {
  const uploadFile = async (file: File): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return URL.createObjectURL(file);
  };
  const ImageUrlChange = (url: any) => {
    console.log("the value in image form", url);
    setImageUrlHostelChange(url);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="relative w-full">
          <label className="absolute text-sm top-2 left-3 text-gray-500">
            Hostel Type
          </label>
          <select
            {...register("hostelTypeId")}
            className={`w-full border ${
              errors?.hostelTypeId ? "border-red-500" : "border-gray-400"
            } bg-white rounded-lg p-4 pt-6 text-gray-700 appearance-none focus:border-gray-400 focus:outline-none`}
          >
            <option disabled selected>
              Select
            </option>
            {allHostelTypes?.map((types: any) => (
              <option key={types?.id} value={types?.title}>
                {types?.title}
              </option>
            ))}
          </select>

          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            ▼
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="w-full">
          <Input
            id="capacity"
            label="Capacity"
            type="number"
            error={errors.capacity}
            {...register("capacity", {
              valueAsNumber: true, 
              min: { value: 1, message: "Capacity must be at least 1" },
            })}
          />
        </div>

        <div className="w-full">
          <Input
            id="cautionDeposit"
            label="Deposit(₹)"
            type="number"
            error={errors.cautionDeposit}
            {...register("cautionDeposit",{
              valueAsNumber: true, 
              min: { value: 1, message: "Deposit(₹) must be at least 1" },
            })}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <div className="w-full">
          <Input
            id="admissionFees"
            label="Admission Fee(₹)"
            type="number"
            error={errors.admissionFees}
            {...register("admissionFees",{
              valueAsNumber: true, 
              min: { value: 1, message: "Admission Fee(₹) must be at least 1" },
            })}
          />
        </div>

        <div className="w-full">
          <Input
            id="roomRent"
            label="Room Rent(₹)"
            type="number"
            error={errors.roomRent}
            {...register("roomRent",{
              valueAsNumber: true, 
              min: { value: 1, message: "Room Rent(₹) must be at least 1" },
            })}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <div className="w-full grid grid-cols-1">
          <Input
            id="messFees"
            label="Mess Fee(₹)"
            type="number"
            error={errors.messFees}
            {...register("messFees",{
              valueAsNumber: true, 
              min: { value: 1, message: "Mess Fee(₹) must be at least 1" },
            })}
          />
        </div>

        <div className="w-full grid grid-cols-1">
          <Input
            id="laundryFees"
            label="Laundry(₹)"
            type="number"
            error={errors.laundryFees}
            {...register("laundryFees",{
              valueAsNumber: true, 
              min: { value: 1, message: "Laundry must be at least 1" },
            })}
          />
        </div>
      </div>
      <div className="w-full grid grid-cols-1">
        <Input
          id="contactName"
          label="Contact Name"
          error={errors.contactName}
          {...register("contactName")}
        />
      </div>
      <div>
        <FileUpload
        value={getValues('avatar')}
          id="avatar"
          onUpload={uploadFile}
          error={errors.avatar}
          ImageUrlChange={ImageUrlChange}
          onChange={(url) => setValue("avatar", url, { shouldValidate: true })}
        />
      </div>
      <div className="w-full grid grid-cols-1">
        <Input
          id="phone"
          label="Phone number"
          type="number"
          error={errors.phone}
          {...register("phone")}
        />
      </div>

      <div>
        <div className="space-y-2">
          <p className="text-gray-600 font-medium">Amenities</p>
          <div>
            <AutoComplete
            // Use a unique value (like facility.value) as the key prop
              defaultValue={{ label: "Amenities", value: "" }}
              // searchFn={(term) => searchingAmenitiesInModal(term)}

              searchFn={(term) => searchFacilities(term, { active: true })}
              name="keyword"
              placeholder={"Search Amenities"}
              navComponent={navComponent}
              navLink={navlink}
              navTitle={navTitle || ""}
              onSelect={(e) =>searchingAmenitiesInModal(e)}
            //   navComponent={navComponent}
            //   navLink={navlink}
            //   navTitle={navTitle || ""}
            //   onSelect={(e) => handleSelectOption(e, index)}
            />
              {/* <AutoComplete
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
                    /> */}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {allamenities?.map((amenties: any) => {
              return (
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register("facilityId")}
                    value={amenties?.id}
                    // checked={getValues("facilityId")?.includes(amenties?.id) || false}// Show
                    className="w-4 h-4 border-gray-300 rounded"
                    // onChange={(e) => {
                    //   const selectedFacilityIds = getValues("facilityId") || []; // Ensure it's an array
                    //   if (e.target.checked) {
                    //     // Add the facility ID if checked
                    //     selectedFacilityIds.push(amenties?.id);
                    //   } else {
                    //     // Remove the facility ID if unchecked
                    //     const index = selectedFacilityIds.indexOf(amenties?.id);
                    //     if (index > -1) {
                    //       selectedFacilityIds.splice(index, 1);
                    //     }
                    //   }
                    //   // Update the form state with the modified list of selected IDs
                    //   setValue("facilityId", selectedFacilityIds);
                    // }}
                  />
                  <span className="text-gray-700">{amenties.title}</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelPageForm;
