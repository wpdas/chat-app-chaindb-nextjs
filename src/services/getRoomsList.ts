import { Room } from "@app/database/history-tables/Rooms";
import { api } from "./api";

const getRoomsList = async () => {
  console.log(`${window.location.origin}/api/room/list`);
  const rooms = await api().get<Room[]>(
    `${window.location.origin}/api/room/list`
  );
  return rooms.data;
};
export default getRoomsList;
