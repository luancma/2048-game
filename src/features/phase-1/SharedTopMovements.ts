import { HexProps } from "../../App";
import { sharedTopMergeStrategies } from "./sharedTopMergeStrategies";
import { sharedTopReorderStrategies } from "./sharedTopReorderStrategies";

export class SharedTopMovements {
  constructor(
    public sortVarDirection: "x" | "y" | "z",
    public column: "x" | "y" | "z",
    public direction: "bottom" | "top" = "top"
  ) {
    this.sortVarDirection = sortVarDirection;
    this.column = column;
    this.direction = direction;
  }

  getUniqHexagonsColumn(hexagonsArray: HexProps[]) {
    return Array.from(
      new Set(hexagonsArray.map((hexagon) => hexagon[this.column]))
    );
  }

  getSortedHexagonsInColumn(hexagonsArray: HexProps[]) {
    if (this.direction === "bottom") {
      return hexagonsArray.sort(
        (a, b) => a[this.sortVarDirection] - b[this.sortVarDirection]
      );
    }
    return hexagonsArray.sort(
      (a, b) => b[this.sortVarDirection] - a[this.sortVarDirection]
    );
  }

  reorderGrid(hexagonsArray: HexProps[]) {
    let result: HexProps[] = [];

    const uniqHexagonsColumn = this.getUniqHexagonsColumn(hexagonsArray);

    for (const uniqColumn of uniqHexagonsColumn) {
      const hexagonsInColumn = hexagonsArray.filter(
        (hexagon) => hexagon[this.column] === uniqColumn
      );
      const sortedHexagonsInColumn =
        this.getSortedHexagonsInColumn(hexagonsInColumn);
      sharedTopReorderStrategies(sortedHexagonsInColumn);
      result = [...result, ...sortedHexagonsInColumn];
    }

    return result;
  }

  mergeHexagons(hexagonsArray: HexProps[]) {
    let result: HexProps[] = [];
    const uniqHexagonsColumn = this.getUniqHexagonsColumn(hexagonsArray);
    for (const uniqColumn of uniqHexagonsColumn) {
      const hexagons = hexagonsArray.filter(
        (hexagon) => hexagon[this.column] === uniqColumn
      );
      hexagons.forEach((_, index) => {
        sharedTopMergeStrategies(hexagons);
      });
      result = [...result, ...hexagons];
    }
    return result;
  }

  execute(hexagonsArray: HexProps[]) {
    const reorderedGrid = this.reorderGrid(hexagonsArray);
    const mergedHexagons = this.mergeHexagons(reorderedGrid);
    return mergedHexagons;
  }
}
