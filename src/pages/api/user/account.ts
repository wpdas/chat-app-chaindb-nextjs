import { database } from "@app/database";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(404).send("");
  }

  const payload = req.body as { username: string; password: string };

  // try creating user account
  const response = await database.get_user_account(
    payload.username,
    payload.password
  );
  res.status(200).json(response);
};

export default handler;
