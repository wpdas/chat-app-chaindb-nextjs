import { ChainDB, connect, EventTypes } from "chain-db-ts";
import { RoomsSchema } from "./tables/Rooms";
import { MessagesSchema } from "./tables/Messages";
import { UserSchema } from "./tables/User";

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
  return await database.getTable<RoomsSchema>("rooms_v2");
};

// Messages Table by RoomId
export const getMessagesTable = async (roomId: string) => {
  const database = await getDatabase();
  return await database.getTable<MessagesSchema>(`messages-${roomId}`);
};

// Users Table
export const getUserTable = async () => {
  const database = await getDatabase();
  // return await database.getTable<UserSchema>(`user-${username}`);
  return await database.getTable<UserSchema>("user");
};
