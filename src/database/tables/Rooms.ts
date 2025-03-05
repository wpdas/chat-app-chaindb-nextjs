export type Room = {
  roomId: string;
  roomName: string;
};

export const defaultRoom: Room = { roomId: "lobby", roomName: "Lobby" };

// Table
export type RoomsSchema = {
  rooms: Room[];
};
