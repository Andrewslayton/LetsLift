"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
  const {data:session,status} = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/");
    }
  }, [status]);
  
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
    <div className="matches-container">
      {matches &&
        matches.map((match, index) => (
          <div key={index} className="match-container">
            <div>{match.name.S}</div>
            <div>{match.email.S}</div>
            <a
              className="button-matches"
              href={`mailto:${match.email.S}?subject=${session.user.name} wants to be you workout partner&body=LETS LIFT TOGETHER`}
            >
              Send Email
            </a>
          </div>
        ))}
    </div>
  );
}

