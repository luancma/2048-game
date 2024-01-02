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
    const clonedArray = Array.from(hexagonsArray);
    const uniqHexagonsColumn = this.getUniqHexagonsColumn(clonedArray);

    const hasMerged = clonedArray.some((hexagon) => hexagon.hasMerged === true);

    const result: HexProps[] = uniqHexagonsColumn
      .map((uniqColumn) => {
        const hexagonsInColumn = clonedArray.filter(
          (hexagon) => hexagon[this.column] === uniqColumn
        );

        const sortedHexagonsInColumn =
          this.getSortedHexagonsInColumn(hexagonsInColumn);

        if (!hasMerged) {
          reorderHexagons(sortedHexagonsInColumn);
        }

        return sortedHexagonsInColumn;
      })
      .flat();

    return result;
  }

  mergeHexagons(hexagonsArray: HexProps[]) {
    const uniqHexagonsColumn = this.getUniqHexagonsColumn(hexagonsArray);
    const result: HexProps[] = uniqHexagonsColumn
      .map((uniqColumn) => {
        const hexagons = hexagonsArray.filter(
          (hexagon) => hexagon[this.column] === uniqColumn
        );
        reorderHexagons(mergeHexagonsWithSameValue(hexagons));
        return hexagons;
      })
      .flat();
    return result;
  }

  execute(hexagonsArray: HexProps[]) {
    const reorderedGrid = this.reorderGrid(hexagonsArray);
    const mergedHexagons = this.mergeHexagons(reorderedGrid);
    return mergedHexagons;
  }
}
