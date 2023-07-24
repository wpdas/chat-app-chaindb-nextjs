import { createContext, useCallback, useEffect, useState } from "react";
import getRoomsList from "../services/getRoomsList";
import { Room } from "@app/database/history-tables/Rooms";
import { initialDatabaseMigration } from "@app/database";

type RoomsContextProps = {
  roomsList: Room[];
  ready: boolean;
  updateRoomsList: (updatedRoomsList: Room[]) => void;
};

const defaultValue: RoomsContextProps = {
  roomsList: [],
  ready: false,
  updateRoomsList: () => {
    throw new Error("updateRoomsList must be defined");
  },
};

export const RoomsContext = createContext(defaultValue);

const RoomsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [roomsList, setRoomsList] = useState<Room[]>([]);
  const [ready, setReady] = useState(false);
  const [dbIsReady, setDbIsReady] = useState(false);

  // Initial Migration
  useEffect(() => {
    initialDatabaseMigration().then(() => {
      setDbIsReady(true);
    });
  }, []);

  const fetch = useCallback(() => {
    getRoomsList()
      .then((rooms) => {
        setRoomsList(rooms);
        setReady(true);
      })
      .catch(() => {
        console.warn("Error getting rooms list. Using default rooms now!");
      });
  }, []);

  const updateRoomsList = useCallback((updatedRoomsList: Room[]) => {
    setRoomsList(updatedRoomsList);
  }, []);

  useEffect(() => {
    if (dbIsReady) {
      fetch();
    }
  }, [fetch, dbIsReady]);

  return (
    <RoomsContext.Provider value={{ roomsList, ready, updateRoomsList }}>
      {children}
    </RoomsContext.Provider>
  );
};

export default RoomsProvider;
