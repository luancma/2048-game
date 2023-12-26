import { HexProps } from "../../../App";

const DefaultMergeStrategy = (
  currentHexagon: HexProps,
  adjacentHexagon: HexProps,
  nextAdjacentHexagon: HexProps,
  hasLengthThree: boolean,
  hasMerged: boolean
) => {};

const reorderStrategies: any = {
  default: DefaultMergeStrategy,
};

const applyReorderStrategies = (hexagonsArray: HexProps[]) => {
  hexagonsArray.forEach((_, index) => {
    const currentHexagon = hexagonsArray[index];
    const adjacentHexagon = hexagonsArray[Number(index) + 1];
    const nextAdjacentHexagon = hexagonsArray[Number(index) + 2];

    const hasLengthThree =
      currentHexagon && adjacentHexagon && nextAdjacentHexagon;

    const hasMerged =
      currentHexagon?.hasMerged === true ||
      adjacentHexagon?.hasMerged === true ||
      nextAdjacentHexagon?.hasMerged === true;

    for (const strategyKey in reorderStrategies) {
      const strategy = reorderStrategies[strategyKey];
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

export class HandleTopLeft {
  constructor() {}

  reorderGrid(hexagonsArray: HexProps[]) {
    let result: HexProps[] = [];

    const sortLeftToRight = (arr: HexProps[]) => {
      return arr.sort((a, b) => b.x - a.x);
    };

    const uniqHexagonsColumn = Array.from(
      new Set(hexagonsArray.map((hexagon) => hexagon.z))
    );

    for (const z of uniqHexagonsColumn) {
      const hexagons = hexagonsArray.filter((hexagon) => hexagon.z === z);
      const sortedHexagons = sortLeftToRight(hexagons);
      applyReorderStrategies(sortedHexagons);
      result = [...result, ...sortedHexagons];
    }
    return result;
  }
}
