import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  createNewWorkout,
  getWorkoutsByLocation,
  getWorkoutsByLoc,
} from "@/lib/db/workouts";
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
    //how would i do this in findLifters/page.js
  } catch (error) {
    console.error(error);
  }
  return NextResponse.json({ message: "Workout created." });
}

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.error();
  }
  try {
    const searchParams = new URLSearchParams(req.nextUrl.searchParams);
    if (
      !searchParams ||
      !searchParams.has("lifts") ||
      !searchParams.has("location")
    ) {
      return NextResponse.error();
    }
    const workouts = await getWorkoutsByLoc(
      searchParams.get("location"),
      JSON.parse(decodeURIComponent(searchParams.get("lifts"))),
      session.user.id
    );
    return NextResponse.json({ workouts });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
