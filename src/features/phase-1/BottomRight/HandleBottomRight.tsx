import { HexProps } from "../../../App";
import { applyReorderStrategies } from "./stategies/reorderStategies";

export class HandleBottomRight {
  constructor() {}

  reorderGrid(hexagonsArray: HexProps[]) {
    const topHexagons = hexagonsArray.filter((hexagon) => hexagon.z === 1);
    const middleHexagons = hexagonsArray.filter((hexagon) => hexagon.z === 0);
    const bottomHexagons = hexagonsArray.filter((hexagon) => hexagon.z === -1);

    const sortLeftToRight = (arr: HexProps[]) => {
      return arr.sort((a, b) => b.x - a.x);
    };

    const reorderedMiddleHexagons = sortLeftToRight(middleHexagons);
    const reorderedBottomHexagons = sortLeftToRight(bottomHexagons);
    const reorderedTopHexagons = sortLeftToRight(topHexagons);
    
    applyReorderStrategies(reorderedTopHexagons);
    applyReorderStrategies(reorderedMiddleHexagons);
    applyReorderStrategies(reorderedBottomHexagons);

 
    return [...reorderedTopHexagons, ...reorderedMiddleHexagons, ...reorderedBottomHexagons];
  }

  execute(hexagonsArray: HexProps[]) {
    return this.reorderGrid(hexagonsArray);
  }
}
