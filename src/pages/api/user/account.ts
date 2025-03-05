import { getUserTable } from "@app/database";
import { comparePassword } from "@app/services/pass";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(404).send("");
  }

  const payload = req.body as { username: string; password: string };

  // check if user exists
  const userTable = await getUserTable(payload.username);

  if (userTable.isEmpty()) {
    return res
      .status(200)
      .json({ success: false, message: "Invalid username or password" });
  }

  const isPasswordCorrect = await comparePassword(
    payload.password,
    userTable.table.password
  );

  if (!isPasswordCorrect) {
    return res
      .status(200)
      .json({ success: false, message: "Invalid username or password" });
  }

  const { id, username } = userTable.table;
  res.status(200).json({ id, username });
};

export default handler;
