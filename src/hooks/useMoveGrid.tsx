import { useCallback, useEffect } from "react";
import { HexProps } from "../App";
import { GridMovements } from "../features/phaseManager/GridMovements";
import { useGridContext } from "../context/GridContext";
import { useFetchNewHexagons } from "./useFetchNewHexagons";

export const useMoveGrid = () => {
  const { gridArray, setHexArray, isError, isGameOver } = useGridContext();
  const { fetchNewItems } = useFetchNewHexagons();

  const getUpdatedGrid = (
    newList: HexProps[],
    oldArray: HexProps[]
  ): HexProps[] =>
    oldArray.map((hex) => {
      const newHex = newList.find(
        ({ x, y, z }) => x === hex.x && y === hex.y && z === hex.z
      );
      return newHex || hex;
    });

  const handleMovements = useCallback(
    ({
      sortVarDirection,
      column,
    }: {
      sortVarDirection: "x" | "y" | "z";
      column: "x" | "y" | "z";
    }) => {
      const handleMovement = new GridMovements(sortVarDirection, column);
      const newList = handleMovement.execute([...gridArray]);
      setHexArray(newList);
      const updatedList = getUpdatedGrid(
        newList,
        gridArray.map((hex) => ({ ...hex, hasMerged: undefined }))
      );
      fetchNewItems(updatedList);
    },
    [gridArray, fetchNewItems, setHexArray]
  );

  useEffect(() => {
    const handleKeyDownEvent = (event: KeyboardEvent) => {
      switch (event.key) {
        case "w":
        case "W": {
          return handleMovements({ sortVarDirection: "z", column: "x" });
        }
        case "s":
        case "S": {
          return handleMovements({ sortVarDirection: "y", column: "x" });
        }
        case "a":
        case "A": {
          return handleMovements({ sortVarDirection: "x", column: "y" });
        }
        case "d":
        case "D": {
          return handleMovements({ sortVarDirection: "y", column: "z" });
        }
        case "e":
        case "E": {
          return handleMovements({ sortVarDirection: "z", column: "y" });
        }
        case "q":
        case "Q": {
          return handleMovements({ sortVarDirection: "x", column: "z" });
        }
        default:
          break;
      }
    };

    if (isGameOver || isError) {
      return;
    } else {
      window.addEventListener("keyup", handleKeyDownEvent);

      return () => {
        window.removeEventListener("keyup", handleKeyDownEvent);
      };
    }
  }, [
    gridArray,
    isGameOver,
    fetchNewItems,
    isError,
    setHexArray,
    handleMovements,
  ]);
};
