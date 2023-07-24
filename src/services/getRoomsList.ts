import { roomsHistoryTable } from "@app/database";

const getRoomsList = async () => {
  const rooms = await roomsHistoryTable();
  return rooms.table.rooms;
};
export default getRoomsList;
