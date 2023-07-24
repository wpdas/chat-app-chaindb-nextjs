import { messagesHistoryTable } from "@app/database";
import { api } from "./api";
import { MessagesTable } from "@app/database/history-tables/Messages";

export interface GetRoomDataPayload {
  roomId: string;
}

const getRoomMessages = async (payload: GetRoomDataPayload) => {
  const messages = await api().get<MessagesTable[]>(
    `api/message/${payload.roomId}`
  );
  return messages.data;
};

export default getRoomMessages;
