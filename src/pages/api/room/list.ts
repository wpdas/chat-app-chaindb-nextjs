import { getRoomsTable } from "@app/database";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(404).send("");
  }

  const roomsTable = await getRoomsTable();
  res.status(200).json(roomsTable.table.rooms || []);
};

export default handler;
