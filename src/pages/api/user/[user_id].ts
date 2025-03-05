import { getUserIdsTable, getUserTable } from "@app/database";
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

  const userIdsTable = await getUserIdsTable();
  const [userTableInfo] = await userIdsTable.findWhere(
    { id: payload.user_id },
    1
  );

  if (!userTableInfo) {
    return res.status(404).send("");
  }

  const userTable = await getUserTable(userTableInfo.username);

  const { id, username } = userTable.table;
  res.status(200).json({ id, username });
};

export default handler;
