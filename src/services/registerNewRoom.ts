import roomNameFormater from "@app/utils/roomNameFormater";
import { api } from "./api";
import { Room } from "@app/database/tables/Rooms";

export interface RegisterNewRoomPayload {
  roomName: string;
}

const registerNewRoom = async (payload: RegisterNewRoomPayload) => {
  let roomId = roomNameFormater(payload.roomName);

  const rooms = await api().post<Room[]>(
    `${window.location.origin}/api/room/new`,
    {
      roomId,
      roomName: payload.roomName,
    }
  );
  return rooms.data;
};
export default registerNewRoom;
