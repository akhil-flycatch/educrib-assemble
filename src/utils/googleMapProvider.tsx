import React from "react";
import { LoadScript } from "@react-google-maps/api";

const GoogleMapsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      libraries={["places"]}
    >
      {children}
    </LoadScript>
  );
};

export default GoogleMapsProvider;