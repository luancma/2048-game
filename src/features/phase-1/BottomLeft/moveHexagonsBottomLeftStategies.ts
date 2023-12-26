import { HexProps } from "../../../App";

export type MergeStrategies = {
  [key: string]: (
    item: HexProps,
    nextItem: HexProps,
    nextNextItem: HexProps,
    hasThreeItems: boolean
  ) => void;
};

export const mergeStrategies: MergeStrategies = {
  ZeroInitAndMergeAdjacent: (
    item: HexProps,
    nextItem: HexProps,
    nextNextItem: HexProps,
    hasThreeItems: Boolean
  ) => {
    console.log("ZeroInitAndMergeAdjacent");
    if (hasThreeItems && item.value === 0 && item?.value === nextItem?.value) {
      item.value *= 2;
      nextItem.value = 0;
      item.hasMerged = true;
    }
  },
  ShiftLeftAddZeroEnd: (
    item: HexProps,
    nextItem: HexProps,
    nextNextItem: HexProps,
    hasThreeItems: Boolean
  ) => {    
    if(!hasThreeItems && nextItem && item.value === nextItem.value && !nextItem.hasMerged){
      nextItem.value *= 2;
      item.value = 0;
      nextItem.hasMerged = true;
    }
    if (
      (hasThreeItems &&
        item?.value === nextItem?.value &&
        nextItem?.value === nextNextItem?.value) ||
      (hasThreeItems &&
        item?.value > 0 &&
        nextItem?.value === nextNextItem?.value &&
        item?.value > nextItem?.value)
    ) {
      console.log("ShiftLeftAddZeroEnd");
      nextNextItem.value *= 2;
      nextItem.value = item.value;
      item.value = 0;
      nextNextItem.hasMerged = true;
      return;
    }
  },
  ShiftMiddleAddZeroEnd: (item, nextItem, nextNextItem, hasThreeItems) => {
    if (
      hasThreeItems &&
      item?.value > 0 &&
      nextNextItem?.value > 0 &&
      item?.value === nextItem?.value &&
      item?.value > nextNextItem?.value
    ) {
      console.log("ShiftMiddleAddZeroEnd");
      nextItem.value *= 2;
      item.value = 0;
      nextItem.hasMerged = true;
    }
  },
  ShiftLeftAddZeroMiddle: (item, nextItem, nextNextItem, hasThreeItems) => {
    if (
      hasThreeItems &&
      nextNextItem &&
      item?.value === 0 &&
      nextItem?.value === nextNextItem?.value
      && !nextNextItem.hasMerged
    ) {
      console.log("ShiftMiddleAddZeroEnd");
      nextNextItem.value *= 2;
      nextItem.value = 0;
      nextNextItem.hasMerged = true;
    }
  },
};
