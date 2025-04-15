import Input from "@/components/hookForm/input";
import { Controller, FieldErrors, FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { useRef } from "react";

interface Props {
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>; // Needed to programmatically set values
  control: any; // Control type from react-hook-form
}

const LocationForm: React.FC<Props> = ({ errors, register, setValue,control }) => {
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  // const onPlacesChanged = () => {
  //   const places = searchBoxRef.current?.getPlaces();
  //   if (!places || places.length === 0) return;

  //   const place = places[0];
  //   const addressComponents = place.address_components;

  //   const getComponent = (type: string) =>
  //     addressComponents?.find((c) => c.types.includes(type))?.long_name || "";

  //   const formattedAddress = place.formatted_address || "";

  //   // Set form fields based on place result
  //   setValue("address", formattedAddress);
  //   setValue("city", getComponent("locality"));
  //   setValue("district", getComponent("administrative_area_level_2"));
  //   setValue("state", getComponent("administrative_area_level_1"));
  //   setValue("pinCode", getComponent("postal_code"));
  //   setValue("url", place.url || place.website || "");
  // };

  return (
    <div className="w-[387px] flex flex-col gap-6">
      {/* Google Places SearchBox */}
      {/* <StandaloneSearchBox
        onLoad={(ref) => (searchBoxRef.current = ref)}
        onPlacesChanged={onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Search address..."
          className="border p-2 rounded-md mb-4"
        />
      </StandaloneSearchBox> */}

<Controller
          control={control}
          name="mapUrl"
          render={({ field }) => (
            <Input
        id="mapUrl"
        label="Google Map URL"
        error={errors.url}
        {...register("mapurl")}
        {...field}
      />
          )}
        />



     
<Controller
          control={control}
          name="city"
          render={({ field }) => (
            <Input
              id="city"
              label="City"
              error={errors.city}
              {...register("city")}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="address"
          render={({ field }) => (
            <Input
              id="address"
              label="Address"
              error={errors.address}
              {...register("address")}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="district"
          render={({ field }) => (
            <Input
              id="district"
              label="District"
              error={errors.district}
              {...register("district")}
              {...field}
            />
          )}
        />
       
<Controller
          control={control}
          name="pinCode"
          render={({ field }) => (
            <Input
              id="pinCode"
              label="Pin Code"
              error={errors.pinCode}
              {...register("pinCode")}
              {...field}
            />
          )}
        />

<Controller
          control={control}
          name="state"
          render={({ field }) => (
            <Input
              id="state"
              label="State"
              error={errors.state}
              {...register("state")}
              {...field}
            />
          )}
        />

 
    </div>
  );
};

export default LocationForm;
