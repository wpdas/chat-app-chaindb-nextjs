import { messagesHistoryTable } from "@app/database";
import { api } from "./api";
import { MessagesTable } from "@app/database/tables/Messages";

export interface GetRoomDataPayload {
  roomId: string;
}

const getRoomMessages = async (payload: GetRoomDataPayload) => {
  const messages = await api().get<MessagesTable[]>(
    `${window.location.origin}/api/message/${payload.roomId}`
  );
  return messages.data;
};

export default getRoomMessages;
