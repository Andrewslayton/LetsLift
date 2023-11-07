"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

async function findMatches(lifts, location) {
  const params = new URLSearchParams({ lifts, location });
  const res = await fetch("/api/workout?" + params.toString(), {
    method: "GET",
  });
  return await res.json();
}

async function getUsers(user_ids) {
  const params = new URLSearchParams({ user_ids: JSON.stringify(user_ids) });
  const res = await fetch("/api/user?" + params.toString(), {
    method: "GET",
  });
  return await res.json();
}

export default function Page() {
  const [matches, setMatches] = useState(null);
  const searchParams = useSearchParams();
  useEffect(() => {
    //doing something after component mounts
    if (
      !searchParams ||
      !searchParams.has("lifts") ||
      !searchParams.has("location")
    ) {
      return;
    }
    findMatches(searchParams.get("lifts"), searchParams.get("location")).then(
      (matches) => {
        const user_ids = matches.workouts.map((workout) => workout.user_id.S);
        getUsers(user_ids).then((users) => {
            // zip workout with user and then set state
            const zipped = matches.workouts.map((workout) => {
              const user = users.users.find(
                (user) => user.user_id.S === workout.user_id.S
              );
              return { ...workout, ...user };
            });
            setMatches(zipped);
        });
      }
    );
  }, []);
  return (
    <div>
      {matches &&
        matches.map((match, index) => <div key={index}>{match.name.S}</div>)}
    </div>
  );
}
