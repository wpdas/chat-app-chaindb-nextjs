import { ChainDB, connect, EventData, EventTypes } from "chain-db-ts";
import { RoomsSchema } from "./tables/Rooms";
import { MessagesSchema } from "./tables/Messages";
import { UserSchema } from "./tables/User";
import { UserIdsSchema } from "./tables/UserIds";

const dbServer = process.env.DB_HOST as string;
const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbPass = process.env.DB_PASS as string;

let currentDb: ChainDB | null = null;

const getDatabase = async () => {
  if (!currentDb) {
    currentDb = await connect({
      server: dbServer,
      database: dbName,
      user: dbUser,
      password: dbPass,
    });
  }

  return currentDb;
};

// Initialize the subscriptions to the database
export const initSubscriptions = () => {
  getDatabase().then((db) => {
    // Subscribe to the table persist event
    db?.events().subscribe(EventTypes.TABLE_PERSIST, (data) => {
      console.log("Table Persist Data:", data);
    });
  });
};

// Rooms Table
export const getRoomsTable = async () => {
  const database = await getDatabase();
  return await database.getTable<RoomsSchema>("rooms");
};

// Messages Table by RoomId
export const getMessagesTable = async (roomId: string) => {
  const database = await getDatabase();
  return await database.getTable<MessagesSchema>(`messages-${roomId}`);
};

// Users Table
export const getUserTable = async (username: string) => {
  const database = await getDatabase();
  return await database.getTable<UserSchema>(`user-${username}`);
};

// User Ids Table
export const getUserIdsTable = async () => {
  const database = await getDatabase();
  return await database.getTable<UserIdsSchema>("user-ids");
};
