import { connect } from "chain-db-ts";
import { RoomsTable } from "./history-tables/Rooms";
import { MessagesTable } from "./history-tables/Messages";

const dbServer = process.env.DB_HOST as string;
const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbPass = process.env.DB_PASS as string;

export const database = connect(dbServer, dbName, dbUser, dbPass);

// Rooms History Table
export const roomsHistoryTable = async () =>
  await database.get_table("rooms", new RoomsTable());

// Messages History Table by RoomId
export const messagesHistoryTable = async (roomId: string) =>
  await database.get_table(`messages-${roomId}`, new MessagesTable());
