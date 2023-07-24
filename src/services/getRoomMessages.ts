import { messagesHistoryTable } from "@app/database";

export interface GetRoomDataPayload {
  roomId: string;
}

const getRoomMessages = async (payload: GetRoomDataPayload) => {
  // TODO: usar filtros quando pronto (where, eq, etc)
  // NOTE: Fazendo o filtro manualmente por enquanto
  const messages = await messagesHistoryTable(payload.roomId);
  const historyMsg = await messages.getHistory(100);

  // Newest messages first
  const sortedMessages = historyMsg.sort(
    (m1, m2) => m1.timestamp! - m2.timestamp!
  );

  return sortedMessages;
};

export default getRoomMessages;
