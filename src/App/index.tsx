import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { GridList } from "../components/GridList";
import { useMoveGrid } from "../hooks/useMoveGrid";
import { getUrlParams } from "../utils/getUrlParams";
import { fetchHexValue } from "../utils/api";
import { generateHexagonalArray } from "../utils/generateHexagonsGrid";
import { useGameOverManager } from "../hooks/useGameOverManager";
import "./styles.css";

export type HexProps = {
  x: number;
  y: number;
  z: number;
  value: number;
  hasMerged?: boolean;
};

const HexagonGrid = () => {
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

  const setDefaultUrlParams = useCallback(() => {
    if (window.location.search === "") {
      const defaultHostname = window.location.hostname;
      const defaultPort = 13337;
      const defaultRadius = 2;
      window.location.search = `?hostname=${defaultHostname}&port=${defaultPort}&radius=${defaultRadius}`;
    }
  }, []);

  useLayoutEffect(() => {
    setDefaultUrlParams();
  }, [setDefaultUrlParams]);

  useEffect(() => {
    const { radius } = getUrlParams();
    const hexagonalArray = generateHexagonalArray(radius);

    fetchHexValue({
      currentHexArray: [],
    }).then((res) => {
      setHexArray(newArrayValue(res, hexagonalArray));
    });
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
  });

  return (
    <div className="container">
      <GridList hexArray={hexArray} />
      <div className="game-status">
        Game Status:
        <span data-status={isGameOver ? "game-over" : "playing"}>
          {isGameOver ? "game-over" : "playing"}
        </span>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return <HexagonGrid />;
};
