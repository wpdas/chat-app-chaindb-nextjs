import { connect } from "chain-db-ts";
import { RoomsTable } from "./history-tables/Rooms";
import { MessagesTable } from "./history-tables/Messages";

//TODO: Use ENV vars
const dbName = "chat-app-db";
const dbUser = "root";
const dbPass = "chat-db-#$185yH4";

export const database = connect(
  // "https://gull-dominant-mistakenly.ngrok-free.app",
  null,
  dbName,
  dbUser,
  dbPass
);

// Rooms History Table
export const roomsHistoryTable = async () =>
  await database.get_table("rooms", new RoomsTable());

// Messages History Table by RoomId
export const messagesHistoryTable = async (roomId: string) =>
  await database.get_table(`messages-${roomId}`, new MessagesTable());

// Initial migration
export const initialDatabaseMigration = async () => {
  // Create the lobby room in case it doesnt exist (initial data is auto initialized inside RoomsTable)
  const rooms = await roomsHistoryTable();
  const lobbyExist = rooms.table.rooms.find((room) => room.roomId === "lobby");
  if (!lobbyExist) {
    await rooms.persist();
  }
};
