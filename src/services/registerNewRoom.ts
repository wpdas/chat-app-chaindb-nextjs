import { roomsHistoryTable } from "@app/database";
import roomNameFormater from "@app/utils/roomNameFormater";

export interface RegisterNewRoomPayload {
  roomName: string;
}

const registerNewRoom = async (payload: RegisterNewRoomPayload) => {
  let roomId = roomNameFormater(payload.roomName);

  const rooms = await roomsHistoryTable();
  rooms.table.rooms = [
    ...rooms.table.rooms,
    { roomId, roomName: payload.roomName },
  ];

  await rooms.persist();
  return rooms.table.rooms;
};
export default registerNewRoom;
