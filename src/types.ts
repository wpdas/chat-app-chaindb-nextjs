import { Message } from "./database/tables/Messages";

export interface MessagePayload {
  roomId: string;
  userId: string;
  message: Message;
}
