import styles from "@/styles/liftSelection.module.css"; // Updated import path
import { getServerSession } from "next-auth";
import { createNewWorkout } from "@/lib/db/workouts";
import { stringify } from "postcss";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


const muscles = [
  "Back",
  "Abs",
  "Quads",
  "Hamstrings",
  "Biceps",
  "Triceps",
  "Shoulders",
  "Calves",
  "Chest",
];
// Import the useRouter hook

export default async function LiftSelection() {
    const session = await getServerSession(authOptions);
    console.log(JSON.stringify(session));
    async function create(formData) {
        "use server";
        if (!session || !session.user) {
            return;
        }
        const workouts = Array.from(formData.keys()).filter(
            (key) => !key.startsWith("$")
        );
        console.log(workouts);
        try{
        await createNewWorkout(session.user.id, workouts);
        }catch(error){
                console.error(error);
                }
        // Redirect to the desired path after submitting the form
        redirect("/locationSelection");
    }
    return (
        <form action={create}>
            <div className="flex flex-wrap gap-4 max-w-sm">
                {muscles.map((muscle) => (
                    <LiftSelectorButton key={muscle} muscle={muscle} />
                ))}
            </div>
            <button
                type="submit"
                className="bg-blue-300 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
            >
                Submit
            </button>
        </form>
    );
}

function LiftSelectorButton({ muscle }) {
    return (
        <div className="flex">
            <input
                type="checkbox"
                id={muscle}
                className="peer hidden"
                name={muscle}
            />
            <label
                htmlFor={muscle}
                className="select-none cursor-pointer rounded-lg border-2 border-gray-900
     py-3 px-6 font-bold text-gray-900 transition-colors duration-900 ease-in-out peer-checked:bg-gray-900 peer-checked:text-blue-300 peer-checked:border-gray-900 "
            >
                {muscle}
            </label>
        </div>
    );
}
