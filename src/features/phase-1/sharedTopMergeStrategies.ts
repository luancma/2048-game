import { HexProps } from "../../App";

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

const mergeStrategies: any = {
  DefaultMergeStrategy: DefaultMergeStrategy,
};

export const sharedTopMergeStrategies = (orderedArr: HexProps[]) => {
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

    for (const strategyKey in mergeStrategies) {
      const strategy = mergeStrategies[strategyKey];
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
