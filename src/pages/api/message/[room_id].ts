import { messagesHistoryTable, roomsHistoryTable } from "@app/database";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const roomId = req.query.room_id as string;

  if (req.method !== "GET") {
    return res.status(404).send("");
  }

  const messages = await messagesHistoryTable(roomId);
  const historyMsg = await messages.getHistory(100);

  // Newest messages first
  const sortedMessages = historyMsg.sort(
    (m1, m2) => m1.timestamp! - m2.timestamp!
  );

  res.status(200).json(sortedMessages);
};

export default handler;
