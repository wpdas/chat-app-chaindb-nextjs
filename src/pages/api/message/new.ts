import { messagesHistoryTable } from "@app/database";
import { Message } from "@app/database/history-tables/Messages";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(404).send("");
  }

  const payload = req.body as { roomId: string; message: Message };

  const message = await messagesHistoryTable(payload.roomId);
  message.table = {
    username: payload.message.username,
    message: payload.message.message,
    b64Image: payload.message.b64Image,
    timestamp: payload.message.timestamp,
  };
  await message.persist();

  res.status(200).json({ status: "ok" });
};

export default handler;
