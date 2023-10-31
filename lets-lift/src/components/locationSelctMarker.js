"use client";
import React, { useState, useMemo } from "react"; // Import React and useState
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useRouter } from "next/navigation";

export default function Map() {
  const center = useMemo(() => ({ lat: 42, lng: -90 }), []);
  const [selected, setSelected] = useState(null);
  const router = useRouter();
  const selectLoc = (loc) => {
    console.log(loc);
    router.push("/findLifters");
  };
  return (
    <>
      <div className="places-container">
        <PlacesAutoComplete setSelected={setSelected} />
      </div>

      <GoogleMap zoom={5} center={center} mapContainerClassName="map-container">
        {selected && (
          <Marker position={selected} onClick={() => selectLoc(selected)} />
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
    //change away from combobox to search bar basic
    <div>
      <input
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