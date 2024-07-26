// set up ID tokens permissions with next.js
// to authentcate usersin liveblocks

import { liveblocks } from "@/lib/liveblocks";
import { getUserColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  // Get the current user from your database
  // we can use any database we need so we will be using clerk
  const clerkUser = await currentUser();

  if (!clerkUser) redirect("/sign-in");

  // now making the user in a way in which liveblocks accepts
  // getting values from clerk user
  const { id, firstName, lastName, emailAddresses, imageUrl } = clerkUser;
  const user = {
    id,
    info: {
      id,
      name: `${firstName} ${lastName}`,
      email: emailAddresses[0].emailAddress,
      avatar: imageUrl,
      color: getUserColor(id),
    },
  };

  // Identify the user and return the result
  const { status, body } = await liveblocks.identifyUser(
    {
      // identifying the user with their email i
      userId: user.info.email,
      groupIds: [],
    },
    { userInfo: user.info }
  );

  return new Response(body, { status });
}
