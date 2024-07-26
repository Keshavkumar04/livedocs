"use server";
// so the code runs on the server

// for making a room with document ig

import { nanoid } from "nanoid"; // similar to uuid
import { liveblocks } from "../liveblocks";
import { revalidatePath } from "next/cache";
import { getAccessType, parseStringify } from "../utils";
import { redirect } from "next/navigation";
import { title } from "process";

export const createDocument = async ({
  userId,
  email,
}: CreateDocumentParams) => {
  const roomid = nanoid();

  try {
    // will create a room using the metadata
    const metadata = {
      creatorId: userId,
      email,
      title: "Untitled",
    };

    // for user access for the room
    const usersAccesses: RoomAccesses = {
      [email]: ["room:write"], // the user can edit different documents , // the person with specific email id
    };

    const room = await liveblocks.createRoom(roomid, {
      metadata,
      usersAccesses,
      defaultAccesses: [],
    });

    revalidatePath("/"); // for getting the new document on frontend when we create the room

    // when returing the stuff from server actions you need to parseStringify
    return parseStringify(room);
  } catch (error) {
    console.log(`ERROR HAPPENED WHILE CREATING A ROOM: ${error}`);
  }
};

// to get the id of our document
export const getDocument = async ({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    // to check if the user has access to the document room

    //TODO : WILL NEED TO BRING IT BACK
    const hasAccess = Object.keys(room.usersAccesses).includes(userId);

    if (!hasAccess) {
      throw new Error("You dont have access to this document");
    }
    return parseStringify(room);
  } catch (error) {
    console.log(`ERROR HAPPENED WHILE GETTING THE ROOM ${error}`);
  }
};

// to update the title of the document
export const updateDocument = async (roomId: string, title: string) => {
  try {
    const updatedRoom = await liveblocks.updateRoom(roomId, {
      metadata: {
        title,
      },
    });
    // using revalidate so the updated room becomes visible in frontend
    revalidatePath(`/documents/${roomId}`);

    return parseStringify(updatedRoom);
  } catch (error) {
    console.log(`ERROR HAPPENED WHILE UPDATING THE ROOM: ${error}`);
  }
};

// TO GET ALL THE DOCUMENTS AND DISPLAY THEM ON THE HOMEPAGE
// get all rooms for a specific id
export const getDocuments = async (email: string) => {
  try {
    const rooms = await liveblocks.getRooms({ userId: email });

    return parseStringify(rooms);
  } catch (error) {
    console.log(`ERROR HAPPENED WHILE GETTING THE ROOMS ${error}`);
  }
};

// to update the document access while inviting the users
export const updateDocumentAccess = async ({
  roomId,
  email,
  userType,
  updatedBy,
}: ShareDocumentParams) => {
  try {
    // this contains list of all the user access
    const usersAccesses: RoomAccesses = {
      [email]: getAccessType(userType) as AccessType,
    };
    // updating the room with given permission
    const room = await liveblocks.updateRoom(roomId, { usersAccesses });

    // if room is there sen the notification to the user
    if (room) {
      // send notification if the user was invited in the room
      const notificationId = nanoid();

      await liveblocks.triggerInboxNotification({
        userId: email,
        kind: "$documentAccess",
        subjectId: notificationId,
        activityData: {
          userType,
          title: `You have been invited by ${updatedBy.name} with  ${userType} access to the document`,
          updatedBy: updatedBy.name,
          avatar: updatedBy.avatar,
          email: updatedBy.email,
        },
        roomId,
      });
    }
    revalidatePath(`/documents/${roomId}`);
    return parseStringify(room);
  } catch (error) {
    console.log(`ERROR HAPPENDED WHILE UPDATING THE ROOM ACCESS ${error}`);
  }
};

// remove the users from the room
export const removeCollaborator = async ({
  roomId,
  email,
}: {
  roomId: string;
  email: string;
}) => {
  try {
    // getting the room
    const room = await liveblocks.getRoom(roomId);

    // checking if the person that we r  trying to remove are not us only
    if (room.metadata.email === email) {
      throw new Error("You cannot remove yourself from the document");
    }

    const updatedRoom = await liveblocks.updateRoom(roomId, {
      usersAccesses: {
        [email]: null,
      },
    });

    revalidatePath(`/documents/${roomId}`);
    return parseStringify(updatedRoom);
  } catch (error) {
    console.log(`ERROR HAPPENED WHILE REMOVING A COLLABORATOR: ${error}`);
  }
};

// for deleting the room
export const deleteDocument = async (roomId: string) => {
  try {
    await liveblocks.deleteRoom(roomId);
    revalidatePath("/");
    redirect("/");
  } catch (error) {
    console.log(`ERROR HAPPENED WHILE DELETING A DOCUMENT ${error}`);
  }
};
