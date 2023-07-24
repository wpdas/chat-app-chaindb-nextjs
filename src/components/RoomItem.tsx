import { Avatar, Box, Button, Text } from "@chakra-ui/react";
import { Room } from "@app/database/history-tables/Rooms";

type Props = {
  room: Room;
  onSelectRoom: (room: Room) => void;
};

const RoomItem: React.FC<Props> = ({ room, onSelectRoom }) => {
  return (
    <Button
      cursor="pointer"
      display="flex"
      justifyContent="start"
      alignItems="center"
      bg="gray.600"
      p={2}
      height={12}
      size="md"
      borderRadius={6}
      _hover={{ backgroundColor: "#38b2ac68" }}
      onClick={() => onSelectRoom(room)}
    >
      <Avatar
        bg="gray.50"
        textColor="gray.600"
        size="sm"
        name={room.roomName}
      />
      <Text color="white" ml={4} as="b">
        {room.roomName}
      </Text>
    </Button>
  );
};

export default RoomItem;
