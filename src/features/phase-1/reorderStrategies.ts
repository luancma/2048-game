import { HexProps } from "../../App";

export const DefaultSortStrategy = (hexagonGrid: HexProps[]) => {
  let hasChanged;
  do {
    hasChanged = false;
    for (let i = hexagonGrid.length - 1; i >= 0; i--) {
      if (hexagonGrid[i]?.value === 0 && hexagonGrid[i - 1]?.value > 0) {
        hexagonGrid[i].value = hexagonGrid[i - 1]?.value;
        hexagonGrid[i - 1].value = 0;
        hasChanged = true;
      }
    }
  } while (hasChanged);
  return hexagonGrid;
};

const reorderStrategiesList: any = {
  Default: DefaultSortStrategy,
};

export const reorderStrategies = (orderedArr: HexProps[]) => {
  const checkIfHasMerged = (hexagon: HexProps) => hexagon.hasMerged === true;
  const hasMerged = orderedArr.some(checkIfHasMerged);
  if (!hasMerged) {
    reorderStrategiesList.Default(orderedArr);
  }
  return orderedArr;
};
