import { api } from "./api";
import { Message } from "@app/database/tables/Messages";

export interface GetRoomDataPayload {
  roomId: string;
}

const getRoomMessages = async (payload: GetRoomDataPayload) => {
  const messages = await api().get<Message[]>(
    `${window.location.origin}/api/message/${payload.roomId}`
  );
  return messages.data;
};

export default getRoomMessages;
