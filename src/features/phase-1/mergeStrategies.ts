import { HexProps } from "../../App";
import { DefaultSortStrategy } from "./reorderStrategies";

const checkIfHasMerged = (hexagonsArray: HexProps[]) => {
  return hexagonsArray?.some((hexagon) => hexagon?.hasMerged === true);
};

const DefaultMergeStrategy = (
  currentHexagon: HexProps,
  adjacentHexagon: HexProps,
  nextAdjacentHexagon: HexProps,
  hasLengthThree: boolean,
  hasMerged: boolean
) => {
  if (
    !hasLengthThree &&
    currentHexagon &&
    adjacentHexagon &&
    currentHexagon.value > 0 &&
    adjacentHexagon.value === currentHexagon.value &&
    !checkIfHasMerged([currentHexagon, adjacentHexagon])
  ) {
    adjacentHexagon.value *= 2;
    adjacentHexagon.hasMerged = true;
    currentHexagon.value = 0;
  }
  if (
    hasLengthThree &&
    currentHexagon.value > 0 &&
    adjacentHexagon.value > 0 &&
    nextAdjacentHexagon.value > 0 &&
    currentHexagon.value > adjacentHexagon.value &&
    adjacentHexagon.value === nextAdjacentHexagon.value &&
    !checkIfHasMerged([currentHexagon, adjacentHexagon, nextAdjacentHexagon])
  ) {
    nextAdjacentHexagon.value *= 2;
    nextAdjacentHexagon.hasMerged = true;
    adjacentHexagon.value = currentHexagon.value;
    currentHexagon.value = 0;
  }
  if (
    hasLengthThree &&
    currentHexagon.value === 0 &&
    adjacentHexagon.value > 0 &&
    adjacentHexagon.value === nextAdjacentHexagon.value &&
    !checkIfHasMerged([currentHexagon, adjacentHexagon, nextAdjacentHexagon])
  ) {
    nextAdjacentHexagon.value *= 2;
    nextAdjacentHexagon.hasMerged = true;
    adjacentHexagon.value = 0;
    currentHexagon.value = 0;
  }
  if (
    !checkIfHasMerged([currentHexagon, adjacentHexagon, nextAdjacentHexagon]) &&
    hasLengthThree &&
    currentHexagon.value > 0 &&
    adjacentHexagon.value > 0 &&
    nextAdjacentHexagon.value > 0 &&
    currentHexagon.value === adjacentHexagon.value &&
    nextAdjacentHexagon.value > currentHexagon.value
  ) {
    adjacentHexagon.value *= 2;
    adjacentHexagon.hasMerged = true;
    currentHexagon.value = 0;
  }
  if (
    !hasMerged &&
    hasLengthThree &&
    currentHexagon.value > 0 &&
    adjacentHexagon.value > 0 &&
    currentHexagon.value === adjacentHexagon.value &&
    currentHexagon.value === nextAdjacentHexagon.value
  ) {
    nextAdjacentHexagon.value *= 2;
    nextAdjacentHexagon.hasMerged = true;
    currentHexagon.value = 0;
  }

  if (
    hasLengthThree &&
    !hasMerged &&
    currentHexagon.value > 0 &&
    adjacentHexagon.value > 0 &&
    nextAdjacentHexagon?.value > 0 &&
    currentHexagon.value > adjacentHexagon.value &&
    adjacentHexagon.value === nextAdjacentHexagon?.value
  ) {
    nextAdjacentHexagon.value *= 2;
    nextAdjacentHexagon.hasMerged = true;
    adjacentHexagon.value = currentHexagon.value;
    currentHexagon.value = 0;
  }
  // 2 16 16 -> 0 2 32
  if (
    hasLengthThree &&
    !hasMerged &&
    currentHexagon.value > 0 &&
    adjacentHexagon.value > 0 &&
    nextAdjacentHexagon?.value > 0 &&
    adjacentHexagon.value === nextAdjacentHexagon?.value
  ) {
    nextAdjacentHexagon.value *= 2;
    nextAdjacentHexagon.hasMerged = true;
    adjacentHexagon.value = currentHexagon.value;
    currentHexagon.value = 0;
  }
  // 2 16 16 -> 2 32 0
  if (
    hasLengthThree &&
    !hasMerged &&
    currentHexagon?.value > 0 &&
    adjacentHexagon?.value > 0 &&
    nextAdjacentHexagon?.value > 0 &&
    adjacentHexagon.value === currentHexagon?.value &&
    nextAdjacentHexagon.value < currentHexagon.value
  ) {
    nextAdjacentHexagon.hasMerged = true;
    adjacentHexagon.value *= 2;
    adjacentHexagon.hasMerged = true;
    currentHexagon.value = 0;
  }
};

const Big0Merge = (hexagonGrid: HexProps[]) => {
  let hasChanged;
  do {
    hasChanged = false;
    for (let i = hexagonGrid.length - 1; i >= 0; i--) {
      if (
        hexagonGrid[i]?.value > 0 &&
        hexagonGrid[i - 1] &&
        hexagonGrid[i - 1]?.value === hexagonGrid[i]?.value &&
        hexagonGrid[i]?.hasMerged !== true &&
        hexagonGrid[i - 1]?.hasMerged !== true
      ) {
        console.log({ hexagonGrid });
        hexagonGrid[i].value *= 2;
        hexagonGrid[i].hasMerged = true;
        hexagonGrid[i - 1].value = 0;
        hasChanged = true;
      }
    }
  } while (hasChanged);
  return hexagonGrid;
};

const mergeStrategiesList: any = {
  DefaultMergeStrategy: DefaultMergeStrategy,
  Big0Merge: Big0Merge,
};

export const mergeStrategies = (orderedArr: HexProps[]) => {
  DefaultSortStrategy(mergeStrategiesList.Big0Merge(orderedArr));
  // orderedArr.forEach((_, index) => {
  //   const currentHexagon = orderedArr[index];
  //   const adjacentHexagon = orderedArr[Number(index) + 1];
  //   const nextAdjacentHexagon = orderedArr[Number(index) + 2];

  //   const hasLengthThree =
  //     currentHexagon && adjacentHexagon && nextAdjacentHexagon;

  //   const hasMerged =
  //     currentHexagon?.hasMerged === true ||
  //     adjacentHexagon?.hasMerged === true ||
  //     nextAdjacentHexagon?.hasMerged === true;

  //   for (const strategyKey in mergeStrategiesList) {
  //     const strategy = mergeStrategiesList[strategyKey];
  //     strategy(
  //       currentHexagon,
  //       adjacentHexagon,
  //       nextAdjacentHexagon,
  //       hasLengthThree,
  //       hasMerged
  //     );
  //   }
  // });
};
