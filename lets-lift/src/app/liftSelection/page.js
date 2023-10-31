// pages/liftselect/page.js
"use client";
import React from "react";
import styles from "@/styles/liftSelection.module.css"; // Updated import path
import { getServerSession } from "next-auth";
import LiftSelection from "@/components/liftSelection";
import { redirect } from "next/navigation";
import Map from "@/components/locationSelection";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Page() {
  const {data:session,status} = useSession();
  const [selectedLifts, setSelectedLifts] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  // if (status !== "authenticated") {
  //   redirect("/");
  // }

  function create() {
    if (!session || !session.user || !selectedLifts || !selectedLocation) {
      return;
    }
    fetch("/api/workout", {
      method: "POST",
      body: JSON.stringify({
        lifts: selectedLifts,
        location: selectedLocation,
      }),
    });
  }

  return (
    <div className={styles.container}>
      {/* as people select lifts its calling create function to change the state of the selected lifts */}
      <LiftSelection setSelected={setSelectedLifts} />
      <Map selectLoc={setSelectedLocation} />
      <button
        className="bg-blue-300 enabled:hover:bg-blue-400 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        onClick={() => create()}
        disabled={!selectedLifts || !selectedLocation}
      >
        Find Lifters
      </button>
    </div>
  );
}
