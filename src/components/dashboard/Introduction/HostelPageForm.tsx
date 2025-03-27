import FileUpload from "@/components/hookForm/fileUpload";
import Input from "@/components/hookForm/input";
import Select from "@/components/hookForm/select";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import * as z from "zod";

export const locationFormSchema = z.object({
    name: z.string(),
    university: z.string(),
    accreditation: z.string(),
    type: z.string(),
    establishedYear: z.number(),
    website: z.string(),
    phone: z.string(),
    email: z.string().email("Invalid email address"),
});

export type LocationFormValues = z.infer<typeof locationFormSchema>;

interface Props {
    errors: FieldErrors<FieldValues>;
    register: UseFormRegister<FieldValues>;
}
const HostelPageForm: React.FC<Props> = ({ errors, register }) => {
    return (
        <div className="flex flex-col gap-6">
            {/* <div>
                <Select
                    id="type"
                    label="Contact Type"
                    options={[
                        { label: "Type1", value: "type1" },
                        { label: "Type2", value: "type2" },
                    ]}
                    error={errors.type}
                    required
                    {...register("type")}
                />
            </div> */}
            <div>

                <div className="relative w-full">
                    <label className="absolute text-sm top-2 left-3 text-gray-500">Hostel Type</label>
                    <select className="w-full border border-gray-400 bg-white rounded-lg p-4 pt-6 text-gray-700 appearance-none focus:border-gray-400 focus:outline-none">
                        <option disabled selected>Select</option>
                        <option value="boys">Boys Hostel</option>
                        <option value="girls">Girls Hostel</option>
                        <option value="coed">Co-ed Hostel</option>
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        ▼
                    </div>
                </div>
            </div>
            <div className="flex gap-3">
                <div className="w-full">
                    <Input
                        id="url"
                        label="Capacity"
                        error={errors.url}
                        {...register("url")}
                    />
                </div>

                <div className="w-full">
                    <Input
                        id="address"
                        label="Deposit(₹)"
                        error={errors.address}
                        {...register("address")}
                    />
                </div>
            </div>

            <div className="flex gap-3">
                <div className="w-full">
                    <Input
                        id="city"
                        label="Admission Fee(₹)"
                        error={errors.city}
                        {...register("city")}
                    />
                </div>

                <div className="w-full">
                    <Input
                        id="district"
                        label="Room Rent(₹)"
                        error={errors.district}
                        {...register("district")}
                    />
                </div>
            </div>

            <div className="flex gap-3">
                <div className="w-full grid grid-cols-1">
                    <Input
                        id="pinCode"
                        label="Mess Fee(₹)"
                        error={errors.pinCode}
                        {...register("pinCode")}
                    />
                </div>

                <div className="w-full grid grid-cols-1">
                    <Input
                        id="state"
                        label="Laundry(₹)"
                        error={errors.state}
                        {...register("state")}
                    />
                </div>
            </div>
            <div className="w-full grid grid-cols-1">
                <Input
                    id="state"
                    label="Contact Name"
                    error={errors.state}
                    {...register("state")}
                />
            </div>
            <div>
                <FileUpload />
            </div>
            <div className="w-full grid grid-cols-1">
                <Input
                    id="state"
                    label="Phone number"
                    type="number"
                    error={errors.state}
                    {...register("state")}
                />
            </div>


            <div>
                <div className="space-y-2">
                    <p className="text-gray-600 font-medium">Amenities</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                            <span className="text-gray-700">WiFi</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                            <span className="text-gray-700">Common Areas</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                            <span className="text-gray-700">Housekeeping</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                            <span className="text-gray-700">Study Area</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                            <span className="text-gray-700">Gym</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                            <span className="text-gray-700">Attached Washrooms</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                            <span className="text-gray-700">Spacious Cupboard</span>
                        </label>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HostelPageForm;
