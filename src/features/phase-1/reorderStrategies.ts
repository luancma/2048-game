import { HexProps } from "../../App";

const MoveSingleHexagon = (
  currentHexagon: HexProps,
  adjacentHexagon: HexProps,
  nextAdjacentHexagon: HexProps,
  hasLengthThree: boolean,
  hasMerged: boolean
) => {
  if (
    !hasLengthThree &&
    currentHexagon.value > 0 &&
    adjacentHexagon?.value === 0 &&
    !hasMerged
  ) {
    adjacentHexagon.value = currentHexagon.value;
    currentHexagon.value = 0;
  }

  if (
    hasLengthThree &&
    currentHexagon.value > 0 &&
    adjacentHexagon.value === 0 &&
    nextAdjacentHexagon.value === 0 &&
    !hasMerged
  ) {
    nextAdjacentHexagon.value = currentHexagon.value;
    currentHexagon.value = 0;
  }

  if (
    hasLengthThree &&
    adjacentHexagon.value > 0 &&
    currentHexagon.value === 0 &&
    nextAdjacentHexagon.value === 0 &&
    !hasMerged
  ) {
    nextAdjacentHexagon.value = adjacentHexagon.value;
    adjacentHexagon.value = 0;
  }
};

const MoveTwoHexagons = (
  currentHexagon: HexProps,
  adjacentHexagon: HexProps,
  nextAdjacentHexagon: HexProps,
  hasLengthThree: boolean,
  hasMerged: boolean
) => {
  if (
    hasLengthThree &&
    currentHexagon.value > 0 &&
    adjacentHexagon.value > 0 &&
    nextAdjacentHexagon.value === 0 &&
    !hasMerged
  ) {
    nextAdjacentHexagon.value = adjacentHexagon.value;
    adjacentHexagon.value = currentHexagon.value;
    currentHexagon.value = 0;
  }

  if (
    hasLengthThree &&
    currentHexagon.value > 0 &&
    adjacentHexagon.value === 0 &&
    nextAdjacentHexagon.value > 0 &&
    !hasMerged
  ) {
    adjacentHexagon.value = currentHexagon.value;
    currentHexagon.value = 0;
  }
};

const reorderStrategiesList: any = {
  MoveTwoHexagons: MoveTwoHexagons,
  MoveSingleHexagon: MoveSingleHexagon,
};

export const reorderStrategies = (orderedArr: HexProps[]) => {
  orderedArr.forEach((_, index) => {
    const currentHexagon = orderedArr[index];
    const adjacentHexagon = orderedArr[Number(index) + 1];
    const nextAdjacentHexagon = orderedArr[Number(index) + 2];

    const hasLengthThree =
      currentHexagon && adjacentHexagon && nextAdjacentHexagon;

    const hasMerged =
      currentHexagon?.hasMerged === true ||
      adjacentHexagon?.hasMerged === true ||
      nextAdjacentHexagon?.hasMerged === true;

    for (const strategyKey in reorderStrategiesList) {
      const strategy = reorderStrategiesList[strategyKey];
      strategy(
        currentHexagon,
        adjacentHexagon,
        nextAdjacentHexagon,
        hasLengthThree,
        hasMerged
      );
    }
  });
};
