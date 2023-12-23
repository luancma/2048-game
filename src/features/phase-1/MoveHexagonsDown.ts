import { HexProps } from "../../components/App";

export class MoveHexagonsDown {
  constructor() {}
  moveHexagonsDown = (hexagonsArray: HexProps[]) => {
    const result = [...hexagonsArray];
    for (let i = result.length - 1; i >= 0; i--) {
      if (
        result[i]?.value === 0 &&
        result[i - 1] &&
        result[i - (result.length - 1)] &&
        result[i - (result.length - 1)].value > 0 &&
        result[i - 1].value === 0
      ) {
        result[i].value = result[i - 2].value;
        result[i - 2].value = 0;
      }
      if (result[i]?.value === 0 && result[i - 1]) {
        result[i].value = result[i - 1].value;
        result[i - 1].value = 0;
      }

      if (result[i].value === result[i - 1]?.value && result[i].value > 0) {
        result[i].value *= 2;
        result[i - 1].value = 0;
      }
      if (
        result[i].value === result[i - 2]?.value &&
        result[i].value > 0 &&
        result[i - 1]?.value === 0
      ) {
        result[i].value *= 2;
        result[i - 2].value = 0;
      }
    }
    return result;
  };
  execute(hexagonsArray: HexProps[]) {
    let newBoard = [...hexagonsArray];
    const leftColumn = newBoard.filter((hex) => hex.y === -1);
    const rightColumn = newBoard.filter((hex) => hex.y === 1);
    const middleColumn = newBoard.filter((hex) => hex.y === 0);

    const middleColumnSorted = middleColumn.sort((a, b) => {
      return a.x - b.x;
    });

    const middleResult = this.moveHexagonsDown(middleColumnSorted);
    const leftResult = this.moveHexagonsDown(leftColumn);
    const rightResult = this.moveHexagonsDown(rightColumn);

    newBoard = [...leftResult, ...middleResult, ...rightResult];

    return newBoard;
  }
}
