import { database } from "@app/database";
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

  // try creating user account
  const response = await database.get_user_account_by_id(payload.user_id);
  res.status(200).json(response);
};

export default handler;
