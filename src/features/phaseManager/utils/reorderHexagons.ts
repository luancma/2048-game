import { HexProps } from "../../../App";

export function reorderHexagons(hexagonGrid: HexProps[]): HexProps[] {
  for (let i = hexagonGrid.length - 1; i > 0; i--) {
    if (hexagonGrid[i]?.value === 0 && hexagonGrid[i - 1]?.value > 0) {
      hexagonGrid[i].value = hexagonGrid[i - 1]?.value;
      hexagonGrid[i - 1].value = 0;
      i = hexagonGrid.length;
    }
  }
  return hexagonGrid;
}
