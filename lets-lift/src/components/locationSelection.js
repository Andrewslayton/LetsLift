"use client";
import React, { useState, useMemo, useEffect } from "react"; // Import React and useState
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useRouter } from "next/navigation";

//exposing setSelted to parent
export default function Map({ selectLoc }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  const [currLoc, setCurrLoc] = useState({ lat: 0, lng: 0 });
  const [selected, setSelected] = useState(undefined);
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrLoc({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);
  useEffect(() => {
    selectLoc(selected);
  }, [selected]);

  if (!isLoaded) return <div>Loading...</div>;
  console.log(selected);
  console.log(currLoc);
  console.log(selected ?? currLoc);
  let mapLocation = selected ?? currLoc;
  mapLocation = { lat: mapLocation.lat, lng: mapLocation.lng };
  console.log(mapLocation.lat);
  return (
    <>
      <div className="places-container">
        <PlacesAutoComplete setSelected={setSelected} />
      </div>
      <GoogleMap
        zoom={5}
        center={mapLocation}
        mapContainerClassName="map-container"
      >
        {selected && <Marker position={mapLocation} />}
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
    const { lat, lng } = getLatLng(results[0]);
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
