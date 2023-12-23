import { HexProps } from "../../components/App";

export class MoveHexagonsBottomLeft {
  constructor() {}
  moveHexagons = (hexagonsArray: HexProps[]) => {
    const result = [...hexagonsArray];
    for (let i = -1; i <= 1; i++) {
      //   if (
      //     result[i]?.value === 0 &&
      //     result[i - 1] &&
      //     result[i - (result.length - 1)] &&
      //     result[i - (result.length - 1)].value > 0 &&
      //     result[i - 1].value === 0
      //   ) {
      //     result[i].value = result[i - 2].value;
      //     result[i - 2].value = 0;
      //   }
      if (result[i]?.value === 0 && result[i + 1] && result[i + 1].value > 0) {
        // result[i].value = result[i - 1].value;
        // result[i - 1].value = 0;
      }

      if (
        result[i] &&
        result[i].value === result[i + 1]?.value &&
        result[i]?.value > 0
      ) {
        console.log(result[i], result[i + 1]);
        if (result[i + 1].x > result[i].x) {
          result[i + 1].value *= 2;
          result[i].value = 0;
        } else {
          result[i + 1].value = 0;
          result[i].value *= 2;
        }
      }
      //   if (
      //     result[i].value === result[i - 2]?.value &&
      //     result[i].value > 0 &&
      //     result[i - 1]?.value === 0
      //   ) {
      //     result[i].value *= 2;
      //     result[i - 2].value = 0;
      //   }
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
