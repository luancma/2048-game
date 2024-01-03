import { createContext, useContext, useState } from "react";
import { useGameOverManager } from "../hooks/useGameOverManager";
import { HexProps } from "../App";

type GridContextType = {
  gridArray: HexProps[];
  setHexArray: React.Dispatch<React.SetStateAction<HexProps[]>>;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  isError: boolean;
  isGameOver: boolean;
  isIdle: boolean;
  setIsIdle: React.Dispatch<React.SetStateAction<boolean>>;
  setNewHexagons: React.Dispatch<React.SetStateAction<HexProps[]>>;
  newHexagons: HexProps[];
};

const GridContext = createContext<GridContextType>({
  gridArray: [],
  setHexArray: () => {},
  isError: false,
  setIsError: () => {},
  isGameOver: false,
  isIdle: false,
  setIsIdle: () => {},
  setNewHexagons: () => {},
  newHexagons: [],
});

export const GridProvider = ({ children }: { children: React.ReactNode }) => {
  const [isIdle, setIsIdle] = useState(true);
  const [isError, setIsError] = useState(false);
  const [gridArray, setHexArray] = useState<HexProps[]>([]);
  const { isGameOver } = useGameOverManager(gridArray);
  const [newHexagons, setNewHexagons] = useState<HexProps[]>([]);

  return (
    <GridContext.Provider
      value={{
        gridArray,
        setHexArray,
        isError,
        isIdle,
        setIsIdle,
        setIsError,
        isGameOver,
        newHexagons,
        setNewHexagons,
      }}
    >
      {children}
    </GridContext.Provider>
  );
};

export const useGridContext = () => {
  const context = useContext(GridContext);
  if (context === undefined) {
    throw new Error("useGridContext must be used within a GridProvider");
  }
  return context;
};
