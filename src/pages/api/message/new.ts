import { getMessagesTable, getUserTable } from "@app/database";
import { Message } from "@app/database/tables/Messages";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(404).send("");
  }

  const payload = req.body as {
    roomId: string;
    userId: string;
    message: Message;
  };

  const userTable = await getUserTable();

  const userDoc = await userTable.getDoc(payload.userId);

  if (userDoc.isEmpty()) {
    return res.status(404).send("");
  }

  const messageTable = await getMessagesTable(payload.roomId);
  messageTable.currentDoc = {
    username: payload.message.username,
    message: payload.message.message,
    b64Image: payload.message.b64Image,
    timestamp: payload.message.timestamp,
  };
  await messageTable.persist();

  res.status(200).json({ status: "ok" });
};

export default handler;
