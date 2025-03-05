import ChatRoom from "@app/components/ChatRoom";
import Container from "@app/components/Container";
import { roomsHistoryTable } from "@app/database";
import { Room } from "@app/database/tables/Rooms";
import getRoomsList from "@app/services/getRoomsList";
import { Box, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MobileChatRoom = () => {
  const router = useRouter();
  const roomId = router.query.room_id;
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);

  // Fetch Room by roomId
  useEffect(() => {
    const fetch = async () => {
      if (roomId) {
        const rooms = await getRoomsList();
        const room = rooms.find((room) => room.roomId === roomId);
        if (!room) {
          router.push("/");
        } else {
          setCurrentRoom(room);
        }
      }
    };

    fetch();
  }, [roomId, router]);

  if (!currentRoom) {
    return (
      <Container>
        <Box w="100%" display="flex">
          <Spinner
            margin="auto"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="teal.500"
            size="xl"
            mt="22%"
          />
        </Box>
      </Container>
    );
  }

  return (
    <Container>{<ChatRoom room={currentRoom} showLeaveButton />}</Container>
  );
};

export default MobileChatRoom;
