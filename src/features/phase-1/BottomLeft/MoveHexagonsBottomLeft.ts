import { HexProps } from "../../../App";
import {
  mergeStrategies,
} from "./moveHexagonsBottomLeftStategies";

export class MoveHexagonsBottomLeft {
  constructor() {}
  moveHexagons = (hexagonsArray: HexProps[]) => {
    const hasThreeItems = hexagonsArray.length === 3;
    const newOrder = (overrideArr = hexagonsArray) => {
      let clonedArray = [...overrideArr];

      clonedArray.forEach((item, i) => {
        const nextItem = clonedArray[i + 1];
        const nextNextItem = clonedArray[i + 2];

        if (
          !hasThreeItems &&
          nextItem &&
          item.value > 0 &&
          nextItem.value === 0
        ) {
          nextItem.value = item.value;
          item.value = 0;
        }
        if (
          hasThreeItems &&
          item.value > 0 &&
          nextItem?.value === 0 &&
          nextNextItem?.value > 0
        ) {
          nextItem.value = item.value;
          item.value = 0;
          return;
        }
        // 0 0 4 -> 4 0 0
        if (
          hasThreeItems &&
          item.value > 0 &&
          nextItem?.value === 0 &&
          nextNextItem?.value === 0
        ) {
          nextNextItem.value = item.value;
          nextItem.value = 0;
          item.value = 0;
          return;
        }
        // 4 4 0 -> 4 4 0
        if (
          hasThreeItems &&
          item.value > 0 &&
          nextItem?.value === item.value &&
          nextNextItem?.value === 0
        ) {
          nextNextItem.value = item.value;
          item.value = 0;
          return;
        }
        // 0 4 0 -> 4 0 0
        if (
          hasThreeItems &&
          item.value === 0 &&
          nextItem?.value > 0 &&
          nextNextItem?.value === 0
        ) {
          nextNextItem.value = nextItem.value;
          nextItem.value = 0;
          return;
        }
        return item;
      });
      return clonedArray;
    };
    const mergeNearByItems = (overrideArr = hexagonsArray) => {
      const hasThreeItems = overrideArr.length === 3;
      const orderedArr = newOrder(overrideArr);

      const strategies = {
        ShiftMiddleAddZeroEnd: mergeStrategies.ShiftMiddleAddZeroEnd,
        ShiftLeftAddZeroEnd: mergeStrategies.ShiftLeftAddZeroEnd,
        ShiftLeftAddZeroMiddle: mergeStrategies.ShiftLeftAddZeroMiddle,
      };

      const applyStrategies = (
        orderedArr: HexProps[],
        strategies: any,
        hasThreeItems: boolean
      ) => {
        orderedArr.forEach((item, i) => {
          const nextItem = orderedArr[i + 1];
          const nextNextItem = orderedArr[i + 2];

          for (const strategyKey in strategies) {
            const strategy = strategies[strategyKey];
            strategy(item, nextItem, nextNextItem, hasThreeItems);
          }
        });
      };

      applyStrategies(orderedArr, strategies, hasThreeItems);

      return orderedArr;
    };
    return mergeNearByItems();
  };

  execute(hexagonsArray: HexProps[]) {
    let newBoard = [...hexagonsArray];
    const leftColumn = newBoard.filter((hex) => hex.z === 1);
    const middleColumn = newBoard.filter((hex) => hex.z === 0);
    const rightColumn = newBoard.filter((hex) => hex.z === -1);

    const sortListByX = (list: HexProps[]) => {
      return list.sort((a, b) => {
        return a.x - b.x;
      });
    };

    const middleResult = this.moveHexagons(sortListByX(middleColumn));
    const leftResult = this.moveHexagons(sortListByX(leftColumn));
    const rightResult = this.moveHexagons(sortListByX(rightColumn));

    return [...leftResult, ...middleResult, ...rightResult];
  }
}
