import { getRoomsTable } from "@app/database";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(404).send("");
  }

  const payload = req.body as { roomName: string; roomId: string };

  const roomsTable = await getRoomsTable();

  const rooms = roomsTable.table.rooms || [];

  roomsTable.table.rooms = [
    ...rooms,
    { roomId: payload.roomId, roomName: payload.roomName },
  ];
  await roomsTable.persist();

  res.status(200).json(roomsTable.table.rooms);
};

export default handler;
