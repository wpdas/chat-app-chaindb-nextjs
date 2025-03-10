import { getUserTable } from "@app/database";
import { comparePassword, hashPassword } from "@app/services/pass";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(404).send("");
  }

  const payload = req.body as { username: string; password: string };

  // check if user exists
  const userTable = await getUserTable(); //payload.username
  // const userData = await userTable.getDoc

  // try to find the user using the username and password
  const [foundUserData] = await userTable.findWhere(
    { username: payload.username },
    1
  );

  if (!foundUserData) {
    return res
      .status(200)
      .json({ success: false, message: "Invalid username or password" });
  }

  const isPasswordCorrect = await comparePassword(
    payload.password,
    foundUserData.password
  );

  if (!isPasswordCorrect) {
    return res
      .status(200)
      .json({ success: false, message: "Invalid username or password" });
  }

  const { doc_id, username } = foundUserData;
  res.status(200).json({ id: doc_id, username });
};

export default handler;
