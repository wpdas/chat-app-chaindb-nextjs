import { roomsHistoryTable } from "@app/database";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(404).send("");
  }

  const rooms = await roomsHistoryTable();
  res.status(200).json(rooms.table.rooms);
};

export default handler;
