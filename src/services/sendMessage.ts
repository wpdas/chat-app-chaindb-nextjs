import { api } from "./api";

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
  await api().post("api/message/new", {
    roomId: payload.roomId,
    message: {
      username: payload.username,
      message: payload.message,
      b64Image: payload.b64Image,
      timestamp: payload.timestamp,
    },
  });
};
export default sendMessage;
