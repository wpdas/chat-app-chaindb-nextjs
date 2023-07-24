import { useCallback, useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Spinner,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import Container from "../components/Container";
import Content from "../components/Content";
import NewRoomModal from "../components/NewRoomModal";
import RecentRooms from "../components/RecentRooms";
import ChatRoom from "../components/ChatRoom";
import { Room, defaultRoom } from "@app/database/history-tables/Rooms";
import { useRouter } from "next/router";

const Home = () => {
  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");
  // const { room } = useTypedInitialPayload();
  // const [roomId, setRoomId] = useState(room || "near-social-community");
  const [room, setRoom] = useState(defaultRoom);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isReady, setIsReady] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const onErrorCreatingNewRoom = (error: string) => {
    setError(error);
    setIsReady(true);
    setTimeout(() => {
      setError("");
    }, 4000);
  };

  const onSelectRoomHandler = useCallback(
    (selectedRoom: Room) => {
      setRoom(selectedRoom);
      console.log("ROOM:", selectedRoom);

      // Go to Mobile Chat Room
      if (!isLargerThan700) {
        // navigation.push("MobileChatRoom", { roomId: selectedRoomId });
        // router.push('/')
      }
    },
    [isLargerThan700]
  );

  const onCompleteCreateRoom = useCallback((room: Room) => {
    setIsReady(true);
    setRoom(room);
  }, []);

  const onShareRoomHandler = useCallback(() => {
    setSuccessMessage("Room link copied to clipboard!");
    setTimeout(() => {
      setSuccessMessage("");
    }, 4000);
  }, []);

  return (
    <Container>
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}
      {successMessage && (
        <Alert status="success">
          <AlertIcon />
          {successMessage}
        </Alert>
      )}
      <Content direction="row">
        <RecentRooms
          onSelectRoom={onSelectRoomHandler}
          onClickCreateRoom={onOpen}
        />
        {isLargerThan700 && (
          <>
            {isReady ? (
              <ChatRoom room={room} onShareSuccess={onShareRoomHandler} />
            ) : (
              <Box w="100%" display="flex">
                <Spinner
                  margin="auto"
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="teal.500"
                  size="xl"
                />
              </Box>
            )}
          </>
        )}
      </Content>
      <NewRoomModal
        isOpen={isOpen}
        onClose={onClose}
        onCreateClick={() => setIsReady(false)}
        onComplete={onCompleteCreateRoom}
        onError={onErrorCreatingNewRoom}
      />
    </Container>
  );
};

export default Home;
