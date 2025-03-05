import { getUserIdsTable, getUserTable } from "@app/database";
import { hashPassword } from "@app/services/pass";
import { randomUUID } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(404).send("");
  }

  const payload = req.body as { username: string; password: string };

  // check if user already exists
  const userTable = await getUserTable(payload.username);
  if (!userTable.isEmpty()) {
    return res
      .status(200)
      .json({ success: false, message: "User already exists" });
  }

  // try to create a new user account
  const hashedPassword = await hashPassword(payload.password);

  // Insert the user's info to the database
  const userId = randomUUID();

  userTable.table = {
    id: userId,
    username: payload.username,
    password: hashedPassword,
  };
  // INFO: Uses update() to ensure only one user data is inserted
  await userTable.update();

  // Insert the id for the user table
  const userIdsTable = await getUserIdsTable();
  userIdsTable.table = {
    id: userId,
    username: payload.username,
  };
  await userIdsTable.persist();

  const { id, username } = userTable.table;
  res.status(200).json({ id, username });
};

export default handler;
