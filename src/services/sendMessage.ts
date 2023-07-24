import { messagesHistoryTable } from "@app/database";

interface SendMessagePayload {
  roomId: string;
  username: string;
  // userAvatarImage: string;
  message: string;
  b64Image?: string;
  timestamp: number;
}

const sendMessage = async (payload: SendMessagePayload) => {
  // Register new message history
  const message = await messagesHistoryTable(payload.roomId);
  message.table = {
    username: payload.username,
    message: payload.message,
    b64Image: payload.b64Image,
    timestamp: payload.timestamp,
  };
  await message.persist();
};
export default sendMessage;
