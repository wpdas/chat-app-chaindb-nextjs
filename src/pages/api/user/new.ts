import { getUserTable } from "@app/database";
import { hashPassword } from "@app/services/pass";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(404).send("");
  }

  const payload = req.body as { username: string; password: string };

  // check if user already exists
  const userTable = await getUserTable();

  // check if username is taken
  const [existingUser] = await userTable.findWhere(
    { username: payload.username },
    1
  );

  if (existingUser) {
    return res
      .status(200)
      .json({ success: false, message: "Username already taken" });
  }

  // try to create a new user account
  const hashedPassword = await hashPassword(payload.password);

  // // Insert the user's info to the database
  // const userId = randomUUID();

  userTable.currentDoc = {
    username: payload.username,
    password: hashedPassword,
  };

  // Create new record to store this user's info
  const newUser = await userTable.persist();

  const { doc_id, username } = newUser;
  res.status(200).json({ id: doc_id, username });
};

export default handler;
