import { useCallback, useEffect, useState } from "react";
import { Room } from "@app/database/tables/Rooms";
import { Message } from "@app/database/tables/Messages";
import io from "socket.io-client";
import getRoomMessages from "@app/services/getRoomMessages";
import { MessagePayload } from "@app/types";

let socket: any;
let messages_: Message[] = [];

const useRoomMessages = (room: Room) => {
  const [ready, setReady] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const loadPreviousMessages = useCallback(async () => {
    setReady(false);
    getRoomMessages({ roomId: room.roomId }).then((messages) => {
      setMessages(messages);
      messages_ = messages;
      setReady(true);
    });
  }, [room.roomId]);

  const initSocket = async () => {
    socket = io({
      path: "/api/socket",
      addTrailingSlash: false,
    });

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("emit-new-message", (new_incomming_msg: MessagePayload) => {
      if (new_incomming_msg.roomId === room.roomId) {
        messages_ = [...messages_, new_incomming_msg.message];
        setMessages(messages_);
      }
    });
  };

  useEffect(() => {
    const init = async () => {
      if (!socket) {
        await loadPreviousMessages();
        await initSocket();
      }
    };

    init();

    return () => {
      if (socket) {
        socket.close();
        console.warn("Socket closed!");
        socket = null;
        messages_ = [];
        setMessages(messages_);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room]);

  const postMessage = useCallback((payload: MessagePayload) => {
    if (!socket) {
      console.error("Socket not initialized");
      return;
    }

    socket.emit("new-message", payload);
  }, []);

  return {
    ready,
    messages,
    postMessage,
  };
};

export default useRoomMessages;
