"use client";

import { NOT_AVAILABLE } from "@/constants/string";
import { MapPin } from "lucide-react";
import Script from "next/script"; // Import Script for dynamic loading
import { useEffect, useState } from "react";
import Text from "./text";

declare global {
  interface Window {
    google: any;
  }
}

const position = { lat: 28.7041, lng: 77.1025 };

export default function Map() {
  const [isLoaded, setIsLoaded] = useState(false); // Track script load
  const [country, setCountry] = useState<string | null>(null);
  const [state, setState] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [locality, setLocality] = useState<string | null>(null);
  const [subLocality1, setSubLocality1] = useState<string | null>(null);
  const [subLocality2, setSubLocality2] = useState<string | null>(null);
  const [route, setRoute] = useState<string | null>(null);
  const [pincode, setPincode] = useState<string | null>(null);
  const [neighborhood, setNeighborhood] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !window.google || !window.google.maps) return;

    const mapDiv = new window.google.maps.Map(
      document.getElementById("google-map") as HTMLElement,
      {
        zoom: 4,
        center: position,
      }
    );

    const inputElement = document.getElementById(
      "google-places-autocomplete"
    ) as HTMLInputElement;

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputElement,
      {
        componentRestrictions: { country: "in" },
        fields: ["address_components", "geometry.location"],
        types: ["university"],
      }
    );

    autocomplete.bindTo("bounds", mapDiv);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      setCountry(null);
      setState(null);
      setCity(null);
      setLocality(null);
      setSubLocality1(null);
      setSubLocality2(null);
      setNeighborhood(null);
      setRoute(null);
      setPincode(null);

      if (place) {
        const newPosition = place.geometry?.location;
        new window.google.maps.Marker({ position: newPosition, map: mapDiv });

        if (place.geometry?.location) {
          mapDiv.setCenter(place.geometry?.location);
          mapDiv.setZoom(17);
        }

        place.address_components?.forEach((item) => {
          if (item.types.includes("country")) setCountry(item.long_name);
          if (item.types.includes("administrative_area_level_1"))
            setState(item.long_name);
          if (item.types.includes("administrative_area_level_2"))
            setCity(item.long_name);
          if (item.types.includes("postal_code")) setPincode(item.long_name);
          if (item.types.includes("locality")) setLocality(item.long_name);
          if (item.types.includes("sublocality_level_1"))
            setSubLocality1(item.long_name);
          if (item.types.includes("sublocality_level_2"))
            setSubLocality2(item.long_name);
          if (item.types.includes("route")) setRoute(item.long_name);
          if (item.types.includes("neighborhood"))
            setNeighborhood(item.long_name);
        });
      }
    });
  }, [isLoaded]);

  return (
    <>
      {/* Load Google Maps API Script */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDHZpyQ2TrhRsUVRcI5DR28ZXOhu8XV-vs&libraries=places`}
        strategy="lazyOnload"
        onLoad={() => setIsLoaded(true)} // Ensure script is loaded
      />

      <div className="flex justify-between w-full gap-4 p-4 bg-white rounded-md shadow-sm">
        <div className="flex flex-col col-span-3 space-y-2">
          {/* <input
            type="text"
            id="google-places-autocomplete"
            className="relative w-full"
            placeholder="Locate your college"
          /> */}
          {country && (
            <div className="flex items-center px-4 py-2 space-x-1 text-xs rounded-md text-dark bg-secondary/20">
              {route && <span>{`${route},`}</span>}
              {neighborhood && <span>{`${neighborhood},`}</span>}
              {subLocality2 && <span>{`${subLocality2},`}</span>}
              {subLocality1 && <span>{`${subLocality1},`}</span>}
              {locality && <span>{`${locality},`}</span>}
              {city && <span>{`${city},`}</span>}
              {state && <span>{`${state},`}</span>}
              <span>{`${country},`}</span>
              {pincode && <span>{pincode}</span>}
            </div>
          )}
        </div>


        <div className="flex flex-col justify-between w-full">
          <div className="px-4 py-2 bg-white rounded-md">
            <Text label="Country" icon={MapPin} direction="vertical">
              {country || NOT_AVAILABLE}
            </Text>
          </div>
          <div className="px-4 py-2 bg-white rounded-md">
            <Text label="State" icon={MapPin} direction="vertical">
              {state || NOT_AVAILABLE}
            </Text>
          </div>
          <div className="px-4 py-2 bg-white rounded-md">
            <Text label="City" icon={MapPin} direction="vertical">
              {city || NOT_AVAILABLE}
            </Text>
          </div>
          <div className="px-4 py-2 bg-white rounded-md">
            <Text label="Locality" icon={MapPin} direction="vertical">
              {locality || NOT_AVAILABLE}
            </Text>
          </div>
          <div className="px-4 py-2 bg-white rounded-md">
            <Text label="Pin Code" icon={MapPin} direction="vertical">
              {pincode || NOT_AVAILABLE}
            </Text>
          </div>
        </div>
                <div id="google-map" className="w-full col-span-2 rounded-md h-96" />

      </div>
    </>
  );
}
