import { Message } from "@app/database/tables/Messages";
import { api } from "./api";

interface SendMessagePayload {
  roomId: string;
  userId: string;
  message: Message;
}

const sendMessage = async (payload: SendMessagePayload) => {
  // Register new message history
  await api().post(`${window.location.origin}/api/message/new`, payload);
};
export default sendMessage;
