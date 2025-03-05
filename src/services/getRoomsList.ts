import { Room } from "@app/database/tables/Rooms";
import { api } from "./api";

const getRoomsList = async () => {
  const rooms = await api().get<Room[]>(
    `${window.location.origin}/api/room/list`
  );
  return rooms.data;
};
export default getRoomsList;
