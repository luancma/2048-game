import React, { useEffect, useState } from "react";
import { Grid } from "../components/Grid";
import { MOCK_3, mockHexagonalArrayRadius2 } from "../mocks/hexagonalArray";
import { useMoveGrid } from "../hooks/useMoveGrid";
import { getUrlParams } from "../utils/getUrlParams";
import { fetchHexValue } from "../utils/api";
import { generateHexagonalArray } from "../utils/generateHexagonsGrid";
import { useGameOverManager } from "../hooks/useGameOverManager";

export type HexProps = {
  x: number;
  y: number;
  z: number;
  value: number;
  hasMerged?: boolean;
};

const HexagonGrid = () => {
  const useMock = false;
  const [hexArray, setHexArray] = useState<HexProps[]>([]);
  const { isGameOver } = useGameOverManager(hexArray);

  const newArrayValue = (serverArray: HexProps[], localArray: HexProps[]) =>
    localArray.map((hex: HexProps) => {
      const serverHex = serverArray.find(
        (serverHex: HexProps) =>
          serverHex.x === hex.x &&
          serverHex.y === hex.y &&
          serverHex.z === hex.z
      );
      if (serverHex) {
        return serverHex;
      }
      return hex;
    });

  useEffect(() => {
    const { radius } = getUrlParams();

    const hexagonalArray = useMock ? MOCK_3 : generateHexagonalArray(radius);

    if (useMock) {
      setHexArray(hexagonalArray);
    } else {
      fetchHexValue({
        currentHexArray: [],
      }).then((res) => {
        setHexArray(newArrayValue(res, hexagonalArray));
      });
    }
  }, []);

  const getNewServerList = async (
    updatedList: Omit<HexProps, "hasMerged">[]
  ) => {
    const hexGridWithoutZero = updatedList.filter((hex) => hex.value > 0);

    return fetchHexValue({
      currentHexArray: hexGridWithoutZero,
    }).then((res) => {
      res.forEach((hex: any) => {
        delete hex.hasMerged;
      });
      hexArray.forEach((hex) => {
        delete hex.hasMerged;
      });
      const newList = newArrayValue(res, updatedList);
      setHexArray(newList);
    });
  };

  useMoveGrid({
    gridArray: hexArray,
    isGameOver,
    setHexArray,
    fetchNewItems: getNewServerList,
    useMock,
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <div>
        Game Status:{" "}
        <span data-status={isGameOver ? "game-over" : "playing"}>
          {isGameOver ? "game-over" : "playing"}
        </span>
      </div>
      <Grid hexArray={hexArray} />
    </div>
  );
};

export const App: React.FC = () => {
  return <HexagonGrid />;
};
