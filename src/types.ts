import { Message } from "./database/history-tables/Messages";

export interface MessagePayload {
  roomId: string;
  userId: string;
  message: Message;
}
