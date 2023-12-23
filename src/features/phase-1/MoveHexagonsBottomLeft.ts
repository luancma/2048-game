import { HexProps } from "../../components/App";

export class MoveHexagonsBottomLeft {
  constructor() {}
  moveHexagons = (hexagonsArray: HexProps[]) => {
    const result = [...hexagonsArray];
    for (let i = -1; i < 2; i++) {
      // 4 4 -> 8 0
      if (
        result[i]?.value > 0 &&
        result[i]?.value === result[i + 1]?.value &&
        result[i].x > result[i + 1].x &&
        !result[i + 2]
      ) {
        result[i].value *= 2;
        result[i + 1].value = 0;
      }
      // 4 4 8 -> 8 8 0
      if (
        result[i + 2]?.value > 0 &&
        result[i + 2]?.value < result[i]?.value &&
        result[i + i]?.value === result[i]?.value
      ) {
        result[i + 2].value *= 2;
        result[i + 1].value = result[i].value;
        result[i].value = 0;
        break;
      }
      // 0 4 8 -> 4 8 0
      if (
        result[i] &&
        result[i + 1] &&
        result[i + 2] &&
        result[i]?.value > 0 &&
        result[i + 1]?.value > 0 &&
        result[i + 2]?.value === 0
      ) {
        result[i + 2].value = result[i + 1].value;
        result[i + 1].value = result[i].value;
        result[i].value = 0;
      }
      if (result[i]?.value > 0 && result[i].value === result[i + 1]?.value) {
        // if (result[i + 2]?.value === null && result[i + 1].x > result[i].x) {
        //   result[i + 1].value *= 2;
        //   result[i].value = 0;
        //   break;
        // }
        if (
          result[i + 2]?.value > 0 &&
          result[i + 2].value === result[i].value
        ) {
          result[i + 2].value *= 2;
          result[i + 1].value = result[i].value;
          result[i].value = 0;
          break;
        }
        // if (result[i + 2]?.value > 0 && result[i + 2].value > result[i].value) {
        //   console.log("AAAAA");
        // }
        else {
          result[i + 1].value *= 2;
          result[i].value = 0;
          break;
        }
      }
    }
    return result;
  };
  execute(hexagonsArray: HexProps[]) {
    let newBoard = [...hexagonsArray];
    const leftColumn = newBoard.filter((hex) => hex.z === -1);
    const rightColumn = newBoard.filter((hex) => hex.z === 1);
    const middleColumn = newBoard.filter((hex) => hex.z === 0);

    const middleColumnSorted = middleColumn.sort((a, b) => {
      return a.x - b.x;
    });

    const middleResult = this.moveHexagons(middleColumnSorted);
    const leftResult = this.moveHexagons(leftColumn);
    const rightResult = this.moveHexagons(rightColumn);

    newBoard = [...leftResult, ...middleResult, ...rightResult];

    return newBoard;
  }
}
