import { useCallback, useEffect, useState } from "react";
import { HexProps } from "../App";

export const useGameOverManager = (hexArray: HexProps[]) => {
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const manageSomeAvailableMovement = useCallback(
    (sortItem: "x" | "y" | "z") => {
      const hasMoves: boolean[] = [];
      [-1, 0, 1].map((column) => {
        const yCol = hexArray.filter((hex) => hex[sortItem] === column);
        yCol.forEach((hex: HexProps, index) => {
          const nextHex = yCol[index + 1];
          const prevHex = yCol[index - 1];
          if (
            nextHex &&
            prevHex &&
            (hex.value === nextHex.value || hex.value === prevHex.value)
          ) {
            hasMoves.push(true);
          }
          if (!nextHex && prevHex && hex.value === prevHex.value) {
            hasMoves.push(true);
          }
          if (nextHex && !prevHex && hex.value === nextHex.value) {
            hasMoves.push(true);
          } else {
            hasMoves.push(false);
          }
        });
      });
      return hasMoves;
    },
    [hexArray]
  );

  useEffect(() => {
    const hasEmptyItem = hexArray && hexArray.some((hex) => hex.value === 0);
    if (hexArray.length && !hasEmptyItem) {
      const hasSomeYTrue = manageSomeAvailableMovement("y").some(
        (item) => item === true
      );
      const hasSomeXTrue = manageSomeAvailableMovement("x").some(
        (item) => item === true
      );
      const hasSomeZTrue = manageSomeAvailableMovement("z").some(
        (item) => item === true
      );

      if (!hasSomeYTrue && !hasSomeXTrue && !hasSomeZTrue) {
        setIsGameOver(true);
      }
    }
  }, [hexArray, manageSomeAvailableMovement]);

  return { isGameOver };
};
