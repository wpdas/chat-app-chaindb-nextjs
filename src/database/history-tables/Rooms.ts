// Uses to store an array of rooms
export type Room = {
  roomId: string;
  roomName: string;
};

export const defaultRoom: Room = { roomId: "lobby", roomName: "Lobby" };

export class RoomsTable {
  public rooms: Room[] = [defaultRoom];
}
