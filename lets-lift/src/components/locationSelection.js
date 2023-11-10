"use client";
import React, { useState, useMemo, useEffect } from "react"; // Import React and useState
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useRouter } from "next/navigation";
import { LoadingBackground, loadingBackground } from "./loadingBack";
import { Background } from "./animatedBackground";

//exposing setSelted to parent
export default function Map({ selectLoc }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [selected, setSelected] = useState(null);
  const [markerL, setMarkers] = useState([]);
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMarkers({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);
  selectLoc(selected);
  if (!isLoaded) return <div> Loading... <LoadingBackground/> </div>;
  return (
    <>
      <div className="places-container">
        <PlacesAutoComplete selectLoc={setSelected} setSelected={setSelected} />
      </div>
      <GoogleMap
        zoom={5}
        center={selected ?? markerL}
        mapContainerClassName="map-container"
      >
        {markerL && (
          <>
            <Marker
              position={selected ?? markerL}
              onClick={() => selectLoc(selected)}
            />
          </>
        )}
      </GoogleMap>
    </>
  );
}
const PlacesAutoComplete = ({ setSelected }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutoComplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  return (
    <div>
      <input
        className="text-black width: 100%"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        placeholder="Enter an address"
      />
      {status === "OK" && (
        <ul>
          {data.map(({ place_id, description }) => (
            <li key={place_id} onClick={() => handleSelect(description)}>
              {description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
