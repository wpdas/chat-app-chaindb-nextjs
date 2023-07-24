import { Room } from "@app/database/history-tables/Rooms";
import { api } from "./api";

const getRoomsList = async () => {
  const rooms = await api().get<Room[]>("api/room/list");
  return rooms.data;
};
export default getRoomsList;
