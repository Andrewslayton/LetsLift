import { getServerSession } from "@server/lib/auth";
import { loc } from "@app/locationSelection/page";


// const express = require("express");
// const app = express();
// const port = 3001; // Choose a port for your server

// app.use(express.json());

// app.post("/saveLocation", (req, res) => {
//   const loc = req.body.loc; // Assuming loc is sent in the request body

//   // Do something with the location, e.g., save it to a database
//   console.log("Received location:", loc);

//   // Send a response back to the client
//   res.send({ message: "Location received and processed." });
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });



export default async function storeLoc() {
  const session = await getServerSession(authOptions);
  console.log(JSON.stringify(session));
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
