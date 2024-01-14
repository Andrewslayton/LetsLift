// pages/liftselect/page.js
"use client";
import React, { useEffect } from "react";
import styles from "@/styles/liftSelection.module.css"; // Updated import path
import { getServerSession } from "next-auth";
import LiftSelection from "@/components/liftSelection";
import Map from "@/components/locationSelection";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import BottomMap from "@/components/bottomMap";

export default function Page() {
  const [onMapSelect, setOnMapSelect] = useState(true);
  const { data: session, status } = useSession();
  const [selectedLifts, setSelectedLifts] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/");
    }
  }, [status]);

  async function create() {
    if (!session || !session.user || !selectedLifts || !selectedLocation) {
      return;
    }
    await fetch("/api/workout", {
      method: "POST",
      body: JSON.stringify({
        lifts: selectedLifts,
        location: selectedLocation,
      }),
    });
    const params = new URLSearchParams({
      lifts: encodeURIComponent(JSON.stringify(selectedLifts)),
      location: `${selectedLocation.lat.toString()},${selectedLocation.lng.toString()}`,
    });
    router.push("/findLifters?" + params.toString());
  }
  return (
    <div>
      <div className={styles.container}>
        {onMapSelect ? (
          <>
            <Map selectLoc={setSelectedLocation} />
            <button
              className="bg-blue-300 enabled:hover:bg-blue-400 text-black font-bold py-6 px-8 rounded disabled:opacity-50 margin-top: 1px mt-5 mb-3" 
              onClick={() => setOnMapSelect(false)}
              disabled={!selectedLocation}
            >
              Next <FontAwesomeIcon icon={faRightLong} />
            </button>
            <bottomMap />
          </>
        ) : (
          <div className={styles.liftContainer}>
            <h1 className={styles.title}>Select Your Muscles</h1>
            <LiftSelection setSelected={setSelectedLifts} />
            <button
              className="bg-blue-300 enabled:hover:bg-blue-400 text-white font-bold py-2 px-4 rounded disabled:opacity-50 margin-top: 1px "
              onClick={() => create()}
              disabled={!selectedLifts}
            >
              Connect With Other Lifters
            </button>
          </div>
        )}
        <BottomMap />
      </div>
    </div>
  );
}
