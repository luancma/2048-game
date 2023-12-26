import { HexProps } from "../../App";

export function testingMoveElementsToTop(obj: HexProps[]) {}

export class MoveHexagonsTop {
  constructor() {}

  manageHexagonsMovement = (hexagonsArray: HexProps[]) => {
    const result = [...hexagonsArray];
    if (result.some((hex) => hex.value > 0)) {
      for (let i = 0; i <= result.length - 1; i++) {
        if (
          result[i]?.value === 0 &&
          result[i + 1] &&
          result[i + 1].value === 0 &&
          result[i + 2] &&
          result[i + 2].value > 0
        ) {
          result[i].value = result[i + 2].value;
          result[i + 2].value = 0;
        }

        if (result[i].value === 0 && result[i + 1]) {
          result[i].value = result[i + 1].value;
          result[i + 1].value = 0;
        }

        if (result[i].value === result[i + 1]?.value && result[i].value > 0) {
          result[i].value *= 2;
          result[i + 1].value = 0;
        }

        if (
          result[i].value === result[i + 2]?.value &&
          result[i].value > 0 &&
          result[i + 1]?.value === 0
        ) {
          result[i].value *= 2;
          result[i + 2].value = 0;
        }
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

    const middleResult = this.manageHexagonsMovement(middleColumnSorted);
    const leftResult = this.manageHexagonsMovement(leftColumn);
    const rightResult = this.manageHexagonsMovement(rightColumn);

    newBoard = [...leftResult, ...middleResult, ...rightResult];

    return newBoard;
  }
}
