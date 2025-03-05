import { defaultRoom } from "@app/database/tables/Rooms";
import getRoomsList from "./getRoomsList";
import registerNewRoom from "./registerNewRoom";

// Initial migration
const runInitalMigration = async () => {
  // Create lobby room if there's any room available
  const rooms = await getRoomsList();
  const lobbyExist = rooms.find((room) => room.roomId === "lobby");
  if (!lobbyExist) {
    await registerNewRoom(defaultRoom);
  }
  return rooms;
};
export default runInitalMigration;
