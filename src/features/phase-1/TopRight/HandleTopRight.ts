import { HexProps } from "../../../App";
import { applyMergeStrategies } from "./stategies/mergeStategies";
import { applyReorderStrategies } from "./stategies/reorderStategies";

export class HandleTopRight {
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

  mergeHexagons(hexagonsArray: HexProps[]) {
    let result: HexProps[] = [];

    const uniqHexagonsColumn = Array.from(
      new Set(hexagonsArray.map((hexagon) => hexagon.z))
    );

    for (const z of uniqHexagonsColumn) {
      const hexagons = hexagonsArray.filter((hexagon) => hexagon.z === z);
      hexagons.forEach((_, index) => {
        applyMergeStrategies(hexagons);
      });
      result = [...result, ...hexagons];
    }
    return result;
  }

  execute(hexagonsArray: HexProps[]) {
    const recordedGrid = this.reorderGrid(hexagonsArray);
    return this.mergeHexagons(recordedGrid);
  }
}
