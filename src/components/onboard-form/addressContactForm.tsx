"use client";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import Input from "../hookForm/input";

interface Props {
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
}

const AddressContactForm: React.FC<Props> = ({ errors, register }) => {
  return (
    <div className="w-full flex justify-between">
      <div className="flex flex-col">
        <span className="text-primary font-medium text-sm capitalize">Address</span>
        <span className="text-secondary text-sm font-normal">
          Help us locate you by providing your address
        </span>
      </div>

      <div className="flex-1 max-w-[794px] flex flex-col gap-6">
        <div className="w-full grid grid-cols-2 gap-6">
          <Input
            id="address"
            label="Address"
            error={errors.address || ""}
            {...register("address")}
          />
          <Input
            id="city"
            label="City"
            error={errors.city}
            {...register("city")}
          />
        </div>

        <div className="w-full grid grid-cols-2 gap-6">
          <Input
            id="district"
            label="District"
            error={errors.district}
            {...register("district")}
          />
          <Input
            id="state"
            label="State"
            error={errors.state}
            {...register("state")}
          />
        </div>

        <div className="w-full grid grid-cols-2 gap-6">
          <Input
            id="pincode"
            label="Pin Code"
            error={errors.pincode}
            {...register("pincode")}
          />
        </div>

        <div className="w-full grid grid-cols-2 gap-6 mt-6">
          <Input
            id="phone"
            // type="tel"
            label="Phone Number"
            error={errors.phone}
            {...register("phone")}
          />
        </div>

        <div className="w-full grid grid-cols-2 gap-6">
          <Input
            id="email"
            type="email"
            label="Email"
            error={errors.email}
            {...register("email")}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressContactForm;
