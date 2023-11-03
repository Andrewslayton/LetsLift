import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createNewWorkout, getWorkoutsByLocation, getWorkoutsByLoc } from "@/lib/db/workouts";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";


export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.error();
  }
  const data = await req.json();
    try {
      await createNewWorkout(session.user.id, data.lifts, data.location);
      // await getWorkoutsByLocation(data.location);
      await getWorkoutsByLoc(data.location, data.lifts, session.user.id);
      //send list of users to frontend to display on next page 
      //how would i do this in findLifters/page.js

    } catch (error) {
      console.error(error);
    }
//   // Redirect to the desired path after submitting the form
//   redirect("/locationSelection");
  return NextResponse.json({ message: "Workout created." });
}
