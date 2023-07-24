import { roomsHistoryTable } from "@app/database";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(404).send("");
  }

  const payload = req.body as { roomName: string; roomId: string };

  const rooms = await roomsHistoryTable();
  rooms.table.rooms = [
    ...rooms.table.rooms,
    { roomId: payload.roomId, roomName: payload.roomName },
  ];
  await rooms.persist();

  res.status(200).json(rooms.table.rooms);
};

export default handler;
