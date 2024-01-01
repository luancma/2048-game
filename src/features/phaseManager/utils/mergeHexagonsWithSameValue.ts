import { HexProps } from "../../../App";

export const mergeHexagonsWithSameValue = (hexagonGrid: HexProps[]) => {
  for (let i = hexagonGrid.length - 1; i >= 0; i--) {
    if (
      hexagonGrid[i].value !== 0 &&
      hexagonGrid[i - 1] &&
      hexagonGrid[i].value === hexagonGrid[i - 1].value &&
      !hexagonGrid[i].hasMerged
    ) {
      hexagonGrid[i].value *= 2;
      hexagonGrid[i].hasMerged = true;
      hexagonGrid[i - 1].value = 0;
    }
  }
  return hexagonGrid;
};
