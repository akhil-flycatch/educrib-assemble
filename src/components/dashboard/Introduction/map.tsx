"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useMemo } from "react";

const containerStyle = {
  width: "600px",
  height: "400px",
};

interface MyGoogleMapProps {
  lat: number;
  lng: number;
}

export default function MyGoogleMap({ lat, lng }: MyGoogleMapProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  // Use the passed latitude and longitude as the map center
  const mapCenter = useMemo(() => ({ lat, lng }), [lat, lng]);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <>
    <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={10}>
      <Marker position={mapCenter} />
    </GoogleMap>
    </>
  );
}
