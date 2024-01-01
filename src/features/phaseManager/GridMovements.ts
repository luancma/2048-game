import { HexProps } from "../../App";
import { mergeHexagonsWithSameValue } from "./utils/mergeHexagonsWithSameValue";
import { reorderHexagons } from "./utils/reorderHexagons";

export class GridMovements {
  constructor(
    public sortVarDirection: "x" | "y" | "z",
    public column: "x" | "y" | "z"
  ) {
    this.sortVarDirection = sortVarDirection;
    this.column = column;
  }

  getUniqHexagonsColumn(hexagonsArray: HexProps[]) {
    return Array.from(
      new Set(hexagonsArray.map((hexagon) => hexagon[this.column]))
    );
  }

  getSortedHexagonsInColumn(hexagonsArray: HexProps[]) {
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

      const checkIfHasMerged = (hexagon: HexProps) =>
        hexagon.hasMerged === true;
      const hasMerged = hexagonsArray.some(checkIfHasMerged);
      if (!hasMerged) {
        reorderHexagons(sortedHexagonsInColumn);
      }
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
      reorderHexagons(mergeHexagonsWithSameValue(hexagons));
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
