import { Message } from "@app/database/history-tables/Messages";
import { api } from "./api";

interface SendMessagePayload {
  roomId: string;
  message: Message;
}

const sendMessage = async (payload: SendMessagePayload) => {
  // Register new message history
  await api().post("api/message/new", payload);
};
export default sendMessage;
