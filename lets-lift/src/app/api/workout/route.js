import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createNewWorkout } from "@/lib/db/workouts";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";


export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.error();
  }
  const data = await req.json();
    console.log(data);
//   const workouts = Array.from(formData.keys()).filter(
//     (key) => !key.startsWith("$")
//   );
//   console.log(workouts);
//   try {
//     await createNewWorkout(session.user.id, workouts);
//   } catch (error) {
//     console.error(error);
//   }
//   // Redirect to the desired path after submitting the form
//   redirect("/locationSelection");
  return NextResponse.json({ message: "Workout created." });
}
