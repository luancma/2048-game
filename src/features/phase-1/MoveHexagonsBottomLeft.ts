import { HexProps } from "../../components/App";

export class MoveHexagonsBottomLeft {
  constructor() {}
  moveHexagons = (hexagonsArray: HexProps[]) => {
    const hasThreeItems = hexagonsArray.length === 3;
    const newOrder = (overrideArr = hexagonsArray) => {
      let clonedArray = [...overrideArr];

      clonedArray.forEach((item, i) => {
        const nextItem = clonedArray[i + 1];
        const nextNextItem = clonedArray[i + 2];
        // 4 0 4 -> 4 4 0
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
        if (
          hasThreeItems &&
          item.value === 0 &&
          nextItem?.value > 0 &&
          nextNextItem?.value > 0
        ) {
          item.value = nextItem.value;
          nextItem.value = nextNextItem.value;
          nextNextItem.value = 0;
          return;
        }
        return item;
      });
      return clonedArray;
    };
    const mergeNearByItems = (overrideArr = hexagonsArray) => {
      const hasThreeItems = overrideArr.length === 3;
      const orderedArr = newOrder(overrideArr);
      orderedArr.map((item, i) => {
        // 0 8 8 -> 16 0 0
        if (
          hasThreeItems &&
          item.value === 0 &&
          item?.value === orderedArr[i + 1]?.value
        ) {
          item.value = item.value * 2;
          orderedArr[i + 1].value = 0;
        }
        // 0 4 0 -> 4 0 0 || 0 0 4 -> 4 0 0
        if (
          hasThreeItems &&
          item.value === 0 &&
          orderedArr[i + 1]?.value > 0 &&
          orderedArr[i + 2]?.value === 0
        ) {
          item.value = orderedArr[i + 1].value;
          orderedArr[i + 1].value = 0;
        }
        // 8 4 4 -> 8 8 0
        if (
          hasThreeItems &&
          item.value > 0 &&
          orderedArr[i + 1]?.value === item.value &&
          orderedArr[i + 2]?.value > item.value
        ) {
          orderedArr[i + 1].value *= 2;
          item.value = 0;
        }
        if (
          hasThreeItems &&
          orderedArr[i + 1]?.value > 0 &&
          orderedArr[i + 2]?.value > 0 &&
          orderedArr[i + 1]?.value === orderedArr[i + 2]?.value &&
          orderedArr[i]?.value > orderedArr[i + 1]?.value
        ) {
          orderedArr[i + 2].value *= 2;
          orderedArr[i + 1].value = item.value;
          item.value = 0;
        }
        if (
          orderedArr.length === 2 &&
          item?.value > 0 &&
          item?.value === orderedArr[i + 1]?.value
        ) {
          orderedArr[i + 1].value *= 2;
          item.value = 0;
        }
        if (
          orderedArr.length === 3 &&
          item?.value > 0 &&
          orderedArr[i + 2]?.value === 0 &&
          orderedArr[i + 1]?.value > 0 &&
          item?.value !== orderedArr[i + 1]?.value
        ) {
          orderedArr[i + 2].value = orderedArr[i + 1].value;
          orderedArr[i + 1].value = item.value;
          item.value = 0;
        }
        if (
          hasThreeItems &&
          item?.value === orderedArr[i + 1]?.value &&
          orderedArr[i + 1]?.value === orderedArr[i + 2]?.value
        ) {
          orderedArr[i + 2].value *= 2;
          orderedArr[i + 1].value = item.value;
          item.value = 0;
        }
        return item;
      });
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
    const rightResult = rightColumn;

    return [...leftResult, ...middleResult, ...rightResult];
  }
}
