import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import useRoomsList from "../hooks/useRoomsList";
import registerNewRoom from "../services/registerNewRoom";
import roomNameFormater from "../utils/roomNameFormater";
import getRoomMessages from "../services/getRoomMessages";
import { Room } from "@app/database/tables/Rooms";

type Props = {
  isOpen: boolean;
  onCreateClick?: () => void;
  onComplete?: (room: Room) => void;
  onClose: () => void;
  onError: (errorMsg: string) => void;
};

const NewRoomModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onCreateClick,
  onComplete,
  onError,
}) => {
  const [roomName, setRoomName] = useState("");
  const { updateRoomsList } = useRoomsList();

  const onCreateHandler = () => {
    if (onCreateClick) {
      onCreateClick();
    }

    getRoomMessages({ roomId: roomNameFormater(roomName) }).then(
      async (messages) => {
        // Check if room already exists.
        if (messages && messages.length > 0) {
          if (onError) {
            onError("This room already exists.");
          }
          onClose();
          return;
        }

        const updatedRooms = await registerNewRoom({ roomName });

        // Update rooms list
        updateRoomsList(updatedRooms);

        // Success: Pass back the new room
        if (onComplete) {
          // onComplete(roomNameFormater(roomName));
          onComplete(updatedRooms[updatedRooms.length - 1]);
        }
      }
    );

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Room</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text size="xs">
            Insert the name you want to give to your new room
          </Text>
          <Input
            mt={2}
            mb={2}
            placeholder="Room id"
            maxW="md"
            onChange={(e) => setRoomName(e.target.value)}
          />
          {roomName && (
            <Text as="b" fontSize="xs" color="gray.700">
              Your Room Id: {roomNameFormater(roomName)}
            </Text>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="teal" onClick={onCreateHandler}>
            Create Room
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewRoomModal;
