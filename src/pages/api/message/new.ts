import { getMessagesTable, getUserIdsTable } from "@app/database";
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

  // Check user
  const userIdsTable = await getUserIdsTable();
  const [userTableInfo] = await userIdsTable.findWhere(
    { id: payload.userId },
    1
  );
  if (!userTableInfo) {
    return res.status(404).send("");
  }

  const messageTable = await getMessagesTable(payload.roomId);
  messageTable.table = {
    username: payload.message.username,
    message: payload.message.message,
    b64Image: payload.message.b64Image,
    timestamp: payload.message.timestamp,
  };
  await messageTable.persist();

  res.status(200).json({ status: "ok" });
};

export default handler;
