import { getUserTable } from "@app/database";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * Get user info by id to check if it exists
 * @param req
 * @param res
 * @returns
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(404).send("");
  }

  const payload = req.query as { user_id: string };

  const userTable = await getUserTable();
  const userInfo = await userTable.getDoc(payload.user_id);

  if (userInfo.isEmpty()) {
    return res.status(404).send("");
  }

  // const userTable = await getUserTable(userTableInfo.username);

  const { doc_id, username } = userInfo.doc;
  res.status(200).json({ id: doc_id, username });
};

export default handler;
