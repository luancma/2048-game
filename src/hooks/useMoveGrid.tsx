import React from "react";
import { HexProps } from "../App";
import { SharedTopMovements } from "../features/phase-1/SharedTopMovements";

export const useMoveGrid = ({
  gridArray,
  isGameOver,
  setHexArray,
  fetchNewItems,
  useMock,
}: {
  gridArray: HexProps[];
  isGameOver: boolean;
  setHexArray: React.Dispatch<React.SetStateAction<HexProps[]>>;
  fetchNewItems: (updatedList: Omit<HexProps, "hasMerged">[]) => Promise<void>;
  useMock: boolean;
}) => {
  const getUpdatedGrid = (newList: HexProps[], oldArray: HexProps[]) => {
    const newArrayTest = oldArray.map((hex: HexProps) => {
      const newHex = newList.find(
        (item: HexProps) =>
          item.x === hex.x && item.y === hex.y && item.z === hex.z
      );
      if (newHex) {
        return newHex;
      }
      return hex;
    });
    return newArrayTest;
  };

  const handleMovements = ({
    sortVarDirection,
    column,
  }: {
    sortVarDirection: "x" | "y" | "z";
    column: "x" | "y" | "z";
  }) => {
    const handleMovement = new SharedTopMovements(sortVarDirection, column);
    const cloneHexArray = JSON.parse(JSON.stringify(gridArray));
    const newList = handleMovement.execute(cloneHexArray);
    const updatedList = getUpdatedGrid(newList, cloneHexArray);
    newList.forEach((hex) => {
      delete hex.hasMerged;
    });
    setHexArray(updatedList);
    fetchNewItems(updatedList);
  };

  React.useEffect(() => {
    const handleKeyDownEvent = (event: KeyboardEvent) => {
      switch (event.key) {
        case "w" || "W": {
          return handleMovements({ sortVarDirection: "z", column: "x" });
        }
        case "s" || "S": {
          return handleMovements({ sortVarDirection: "y", column: "x" });
        }
        case "a" || "A": {
          return handleMovements({ sortVarDirection: "x", column: "y" });
        }
        case "d" || "D": {
          return handleMovements({ sortVarDirection: "y", column: "z" });
        }
        case "e" || "E": {
          return handleMovements({ sortVarDirection: "z", column: "y" });
        }
        case "q" || "Q": {
          return handleMovements({ sortVarDirection: "x", column: "z" });
        }
        default:
          break;
      }
    };

    if (isGameOver) {
      return;
    } else {
      window.addEventListener("keyup", handleKeyDownEvent);

      return () => {
        window.removeEventListener("keyup", handleKeyDownEvent);
      };
    }
  }, [gridArray, isGameOver, fetchNewItems]);
};
