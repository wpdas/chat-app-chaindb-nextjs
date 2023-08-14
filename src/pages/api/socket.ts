import { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";
import cors from "cors";
import { MessagePayload } from "@app/types";
import { database, messagesHistoryTable } from "@app/database";

const corsMiddleware = cors();

const handler = async (req: NextApiRequest, res: NextApiResponse | any) => {
  res.socket;
  if (res.socket?.server?.io) {
    res.end();
    return;
  }

  console.log("Socket is initializing");
  const io = new Server(res.socket.server, {
    path: "/api/socket",
    addTrailingSlash: false,
  } as any);

  res.socket.server.io = io;

  io.on("connection", (socket) => {
    socket.on("new-message", async (payload: MessagePayload) => {
      // Check user
      const checkUser = await database.get_user_account_by_id(payload.userId);
      if (!checkUser.success) {
        return;
      }

      // Store the new message to DB
      const message = await messagesHistoryTable(payload.roomId);
      message.table = {
        username: payload.message.username,
        message: payload.message.message,
        b64Image: payload.message.b64Image,
        timestamp: payload.message.timestamp,
      };
      await message.persist();

      // Send to others
      socket.broadcast.emit("emit-new-message", payload);
      // Send to the sender
      socket.emit("emit-new-message", payload);
    });
  });

  // Apply the CORS middleware to the request and response
  corsMiddleware(req, res, () => {
    res.socket.server.io = io;
    res.end();
  });
};

export default handler;
