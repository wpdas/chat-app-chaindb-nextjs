import { getRoomsTable } from "@app/database";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(404).send("");
  }

  const payload = req.body as { roomName: string; roomId: string };

  const roomsTable = await getRoomsTable();

  // If empty, create new room
  if (roomsTable.isEmpty()) {
    roomsTable.currentDoc.rooms = [
      { roomId: payload.roomId, roomName: payload.roomName },
    ];
    await roomsTable.persist();
    return res.status(200).json(roomsTable.currentDoc.rooms);
  }

  // Get the doc id of the rooms table (as we want to have only one doc to store all rooms)
  const roomsDocId = roomsTable.getCurrentDocId();

  // Get the rooms table doc that already exists
  const roomsTableDoc = await roomsTable.getDoc(roomsDocId);

  const rooms = roomsTableDoc.doc.rooms || [];

  // Check if the room already exists
  const roomExists = rooms.find((room) => room.roomId === payload.roomId);
  if (roomExists) {
    return res.status(200).json(rooms);
  }

  // Create new room
  roomsTableDoc.doc.rooms = [
    ...rooms,
    { roomId: payload.roomId, roomName: payload.roomName },
  ];
  await roomsTableDoc.update();

  res.status(200).json(roomsTableDoc.doc.rooms);
};

export default handler;
