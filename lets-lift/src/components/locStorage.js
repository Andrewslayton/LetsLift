import { getServerSession } from "@server/lib/auth";
import { loc } from "@app/locationSelection/page";



export default async function storeLoc() {
  const session = await getServerSession(authOptions);
  console.log(JSON.stringify(session));
  async function create(formData) {
    "use server";
    if (!session || !session.user) {
      return;
    }
    console.log(loc);
    try {
      await createNewLocation(session.user.id, loc);
    } catch (error) {
      console.error(error);
    }
    // Redirect to the desired path after submitting the form
    redirect("/");
  }
}
