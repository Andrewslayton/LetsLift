"use client";
import React from "react"; // Import React and useState
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Map from "@/components/locationSelection";

export default function Page() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

