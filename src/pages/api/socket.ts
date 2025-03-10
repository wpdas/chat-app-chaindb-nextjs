import { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";
import cors from "cors";
import { MessagePayload } from "@app/types";
import { getMessagesTable, getUserTable } from "@app/database";

const corsMiddleware = cors();

// NOTE: Unfortunatelly Vercel doens't support websocket, so, this will work locally
// but is going to fail when in production:
// https://vercel.com/guides/do-vercel-serverless-functions-support-websocket-connections
const handler = async (req: NextApiRequest, res: NextApiResponse | any) => {
  if (res.socket?.server?.io) {
    res.end();
    return;
  }

  console.log("Socket is initializing");
  const io = new Server(res.socket.server, {
    path: "/api/socket",
    addTrailingSlash: false,
  } as any);

  io.on("connection", (socket) => {
    socket.on("new-message", async (payload: MessagePayload) => {
      // Check user
      const userTable = await getUserTable();
      const userInfo = await userTable.getDoc(payload.userId);

      if (userInfo.isEmpty()) {
        return;
      }

      // Store the new message to DB
      const messagesTable = await getMessagesTable(payload.roomId);
      messagesTable.currentDoc = {
        username: payload.message.username,
        message: payload.message.message,
        b64Image: payload.message.b64Image,
        timestamp: payload.message.timestamp,
      };
      await messagesTable.persist();

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
