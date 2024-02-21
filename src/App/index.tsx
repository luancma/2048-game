import React from "react";
import { GridList } from "../components/GridList";
import { useMoveGrid } from "../hooks/useMoveGrid";
import "./styles.css";
import { GridProvider, useGridContext } from "../context/GridContext";
import { useFetchInitialGrid } from "../hooks/useFetchInitialGrid";
import { useAddUrlSearch } from "../hooks/useAddUrlSearch";

export type HexProps = {
  x: number;
  y: number;
  z: number;
  value: number;
  hasMerged?: boolean;
};

const HexagonGrid = () => {
  const { isError, isGameOver, isIdle, gridArray } = useGridContext();
  useAddUrlSearch();
  useFetchInitialGrid();
  useMoveGrid();

  const getGameStatus = () => {
    if ((isGameOver && isError) || isError) return "network-error";
    if (isGameOver) return "game-over";
    return "playing";
  };

  console.log(gridArray)

  return (
    <div className="container">
      {isIdle ? null : (
        <>
          <GridList />
          <div className="game-status">
            Game Status:{" "}
            <span data-status={getGameStatus()}>{getGameStatus()}</span>
          </div>
        </>
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <GridProvider>
      <HexagonGrid />
    </GridProvider>
  );
};
