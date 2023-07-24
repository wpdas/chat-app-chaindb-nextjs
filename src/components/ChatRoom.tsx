import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Heading,
  IconButton,
  Input,
  Icon,
  Text,
  Button,
  Stack,
  Tooltip,
  useMediaQuery,
} from "@chakra-ui/react";
import { RiSendPlaneFill, RiImageAddFill, RiShareFill } from "react-icons/ri";
import truncate from "../utils/truncate";
import Message from "../components/Message";
import Loading from "../components/Loading";
import sendMessage from "../services/sendMessage";
import getRoomMessages from "../services/getRoomMessages";
import useRoomsList from "../hooks/useRoomsList";
import { useFilePicker } from "use-file-picker";
import resizeImage from "../utils/resizeImage";
import MessageImage from "./MessageImage";
// import setClipboardText from "../services/setClipboardText";
import useAuth from "@app/hooks/useAuth";
import { MessagesTable } from "@app/database/history-tables/Messages";
import { Room, defaultRoom } from "@app/database/history-tables/Rooms";

type Props = {
  room: Room;
  showLeaveButton?: boolean;
  onShareSuccess?: () => void;
};

const ChatRoom: React.FC<Props> = ({
  room,
  showLeaveButton,
  // onShareSuccess,
}) => {
  const router = useRouter();
  // const [currentRoom, setCurrentRoom] = useState(room);
  const [currentRoomMessages, setCurrentRoomMessages] = useState<
    MessagesTable[]
  >([]);
  // const [pendingMessages, setPendingMessages] = useState<RoomMessage[]>([]);
  const [message, setMessage] = useState("");
  const { ready: isRoomsReady, roomsList } = useRoomsList();
  const [ready, setReady] = useState(false);
  const messageBoxRef = useRef<any>();
  const auth = useAuth();
  // TODO: const { mainChatURL } = useTypedInitialPayload();
  const mainChatURL = null;
  const [openFileSelector, { filesContent, clear }] = useFilePicker({
    accept: "image/*",
    multiple: false,
    readAs: "DataURL",
  });
  const [b64ImageToSend, setB64ImageToSend] = useState<string | null>(null);
  const [isLargerThan388] = useMediaQuery("(min-width: 388px)");

  // Check if room exists in the list, case not, set the default one
  // useEffect(() => {
  //   if (isRoomsReady) {
  //     let roomExists = roomsList.find(
  //       (room) => room.roomId === currentRoom.roomId
  //     );
  //     if (!roomExists) {
  //       setCurrentRoom(defaultRoom);
  //       return;
  //     }
  //   }
  // }, [isRoomsReady, roomsList, currentRoom]);

  // Auto scrolling
  const scrollMessageBoxToBottom = useCallback(() => {
    if (messageBoxRef.current) {
      const messageBox = messageBoxRef.current;
      messageBox.scrollTo({
        top: messageBox.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [messageBoxRef]);

  const fetchNewMessages = useCallback(
    async (currentRoomId: string, checkLength = true) => {
      getRoomMessages({ roomId: currentRoomId }).then((messages) => {
        // Update the messages list only if there are new messages
        if (checkLength) {
          if (messages.length !== currentRoomMessages.length) {
            setCurrentRoomMessages(messages);
            scrollMessageBoxToBottom();
          }
        } else {
          setCurrentRoomMessages(messages);
          scrollMessageBoxToBottom();
        }
      });
    },
    [scrollMessageBoxToBottom, currentRoomMessages]
  );

  useEffect(() => {
    setReady(false);
    fetchNewMessages(room.roomId, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room]);

  // Load initial messages
  useEffect(() => {
    fetchNewMessages(room.roomId).then(() => {
      setReady(true);
    });
  }, [room, scrollMessageBoxToBottom, fetchNewMessages]);

  // Listen to messages
  useEffect(() => {
    const subscription = setInterval(() => {
      if (room) {
        fetchNewMessages(room.roomId);
      }
    }, 5000);

    return () => {
      clearInterval(subscription);
    };
  }, [room, currentRoomMessages, scrollMessageBoxToBottom, fetchNewMessages]);

  // Send message handler
  const sendMessageClick = async () => {
    if (message) {
      const messageCopy = message;

      // Populate the pending messages to display in advance
      // setPendingMessages([
      //   ...pendingMessages,
      //   {
      //     accountId: auth.userId!,
      //     blockHeight: Math.random() * 999999,
      //     value: {
      //       text: messageCopy,
      //       userName: auth.username!,
      //       // userAvatarImage: auth.user?.profileInfo?.image?.ipfs_cid!,
      //       b64Image: b64ImageToSend || undefined,
      //       timestamp: Date.now(),
      //     },
      //   },
      // ]);

      await sendMessage({
        roomId: room.roomId,
        message: messageCopy,
        // username: auth.username!,
        username: "wenderson.pires",
        // userAvatarImage: auth.user?.profileInfo?.image?.ipfs_cid!,
        b64Image: b64ImageToSend || undefined,
        timestamp: Date.now(),
      });

      clear(); // image data
      setMessage("");
      setB64ImageToSend(null);
      scrollMessageBoxToBottom();

      // Fetch new messages
      fetchNewMessages(room.roomId);
    }
  };

  // Truncated room name
  // console.log("ROOM NAME?", currentRoom.roomId);
  // const roomName = currentRoomId
  //   ? truncate(currentRoomId.replaceAll("-", " "), isLargerThan388 ? 25 : 10)
  //   : "";

  // Scroll message box to the bottom as soon as the box is rendered
  useEffect(() => {
    if (messageBoxRef.current) {
      scrollMessageBoxToBottom();
    }
  }, [messageBoxRef, scrollMessageBoxToBottom]);

  useEffect(() => {
    scrollMessageBoxToBottom();
  }, [scrollMessageBoxToBottom]);

  // Force go to bottom after some images are loaded
  useEffect(() => {
    setTimeout(scrollMessageBoxToBottom, 2200);
  }, [room, scrollMessageBoxToBottom]);

  const goToHome = () => {
    router.push("/home");
  };

  // Image upload
  useEffect(() => {
    if (!!filesContent[0]) {
      resizeImage(filesContent[0].content).then((imageData) =>
        setB64ImageToSend(imageData)
      );
    }
  }, [filesContent]);

  const onShareClick = () => {
    // TODO: Clipboard to share room
    // setClipboardText({ text: `${mainChatURL}/?room=${currentRoomId}` });
  };

  const onDeleteImageToSend = () => {
    setB64ImageToSend(null);
    clear(); // image
  };

  return (
    <Box w="100%" display="flex" flexDirection="column" alignItems="center">
      <Box w="100%" h="100%">
        <Box
          p={4}
          display="flex"
          bg="gray.100"
          alignItems="center"
          justifyContent="space-between"
        >
          <Heading
            textTransform="capitalize"
            size="lx"
            textColor="gray.700"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            Room: {room.roomName}
          </Heading>
          <Box>
            {mainChatURL && (
              <Tooltip label="share room" placement="bottom">
                <IconButton
                  aria-label="Share room"
                  colorScheme="gray.900"
                  bg="#70F2A4"
                  h="1.75rem"
                  size="xs"
                  fontSize="18px"
                  width="32px"
                  height="32px"
                  borderRadius={999}
                  onClick={onShareClick}
                  icon={<Icon as={RiShareFill} color="black" />}
                />
              </Tooltip>
            )}

            {showLeaveButton && (
              <Button
                ml={2}
                size="sm"
                colorScheme="white"
                bg="#70F2A4"
                color="rgb(9, 52, 46)"
                onClick={goToHome}
              >
                Leave
              </Button>
            )}
          </Box>
        </Box>

        {ready && isRoomsReady ? (
          <>
            {/* Messages */}
            <Box
              ref={messageBoxRef}
              bg="gray.50"
              p={4}
              overflowX="auto"
              height="calc(100% - 130px)"
              background="#F7F8FA"
            >
              {currentRoomMessages.length === 0 && (
                <Text
                  color="#888888"
                  textAlign="center"
                  p={4}
                  w="248px"
                  margin="auto"
                >
                  No messages yet. Be the first to send a &quot;Hi!&quot;
                </Text>
              )}
              {currentRoomMessages.map((message) => (
                <Message
                  key={message.username! + message.timestamp}
                  message={message}
                />
              ))}

              {/* {pendingMessages.map((message) => (
                <Message key={message.blockHeight} message={message} />
              ))} */}
            </Box>

            {/* Input */}
            <Box
              display="flex"
              alignItems="center"
              p={4}
              bg="#eaeaea"
              justifyContent="space-between"
            >
              <Input
                _hover={{ borderColor: "#eaeaea" }}
                _focus={{ borderColor: "#eaeaea" }}
                _active={{ borderColor: "#eaeaea" }}
                outline="none"
                borderColor="#eaeaea"
                bg="#eaeaea"
                placeholder="Type your message here..."
                fontSize="sm"
                w="80%"
                fontWeight="600"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessageClick();
                  }
                }}
              />
              <Stack direction="row">
                {b64ImageToSend && (
                  <MessageImage
                    b64Image={b64ImageToSend}
                    onDelete={onDeleteImageToSend}
                  />
                )}

                {!b64ImageToSend && (
                  <Tooltip label="upload image" placement="top">
                    <IconButton
                      aria-label="Send image"
                      colorScheme="gray.500"
                      bg="#171923"
                      h="1.75rem"
                      size="xs"
                      ml={2}
                      fontSize="22px"
                      width="42px"
                      height="42px"
                      borderRadius={999}
                      onClick={openFileSelector}
                      icon={<Icon as={RiImageAddFill} color="white" />}
                    />
                  </Tooltip>
                )}

                <IconButton
                  aria-label="Send message"
                  colorScheme="gray.500"
                  bg="#171923"
                  h="1.75rem"
                  size="xs"
                  fontSize="22px"
                  width="42px"
                  height="42px"
                  borderRadius={999}
                  onClick={sendMessageClick}
                  icon={<Icon as={RiSendPlaneFill} color="white" />}
                />
              </Stack>
            </Box>
          </>
        ) : (
          <Loading height={400} />
        )}
      </Box>
    </Box>
  );
};

export default ChatRoom;
