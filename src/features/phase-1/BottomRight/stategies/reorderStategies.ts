import { HexProps } from "../../../../App";

const MoveSingleHexagon = (
  currentHexagon: HexProps,
  adjacentHexagon: HexProps,
  nextAdjacentHexagon: HexProps,
  hasLengthThree: boolean
) => {
  if (
    !hasLengthThree &&
    currentHexagon.value > 0 &&
    adjacentHexagon?.value === 0
  ) {
    adjacentHexagon.value = currentHexagon.value;
    currentHexagon.value = 0;
  }

  if (
    hasLengthThree &&
    currentHexagon.value > 0 &&
    adjacentHexagon.value === 0 &&
    nextAdjacentHexagon.value === 0
  ) {
    nextAdjacentHexagon.value = currentHexagon.value;
    currentHexagon.value = 0;
  }

  if (
    hasLengthThree &&
    adjacentHexagon.value > 0 &&
    currentHexagon.value === 0 &&
    nextAdjacentHexagon.value === 0
  ) {
    nextAdjacentHexagon.value = adjacentHexagon.value;
    adjacentHexagon.value = 0;
  }
};

const MoveTwoHexagons = (
  currentHexagon: HexProps,
  adjacentHexagon: HexProps,
  nextAdjacentHexagon: HexProps,
  hasLengthThree: boolean
) => {
  if (
    hasLengthThree &&
    currentHexagon.value > 0 &&
    adjacentHexagon.value > 0 &&
    nextAdjacentHexagon.value === 0
  ) {
    nextAdjacentHexagon.value = adjacentHexagon.value;
    adjacentHexagon.value = currentHexagon.value;
    currentHexagon.value = 0;
  }

  if (
    hasLengthThree &&
    currentHexagon.value > 0 &&
    adjacentHexagon.value === 0 &&
    nextAdjacentHexagon.value > 0
  ) {
    adjacentHexagon.value = currentHexagon.value;
    currentHexagon.value = 0;
  }
};

const reorderStrategies: any = {
  MoveSingleHexagon: MoveSingleHexagon,
  MoveTwoHexagons: MoveTwoHexagons,
};

export const applyReorderStrategies = (orderedArr: HexProps[]) => {
  orderedArr.forEach((_, index) => {
    const currentHexagon = orderedArr[index];
    const adjacentHexagon = orderedArr[Number(index) + 1];
    const nextAdjacentHexagon = orderedArr[Number(index) + 2];

    const hasLengthThree =
      currentHexagon && adjacentHexagon && nextAdjacentHexagon;

    for (const strategyKey in reorderStrategies) {
      const strategy = reorderStrategies[strategyKey];
      strategy(
        currentHexagon,
        adjacentHexagon,
        nextAdjacentHexagon,
        hasLengthThree
      );
    }
  });
};
