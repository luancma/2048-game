import { HexProps } from "../App";
import { useGridContext } from "../context/GridContext";
import { fetchHexValue } from "../utils/api";
import { mergeArrays } from "../utils/mergeArrays";

export const useFetchNewHexagons = () => {
  const { gridArray, setHexArray, setNewHexagons } = useGridContext();

  const getNewServerList = async (
    updatedList: Omit<HexProps, "hasMerged">[]
  ) => {
    const hexGridWithoutZero = updatedList.filter((hex) => hex.value > 0);
    setNewHexagons([]);
    return fetchHexValue({
      currentHexArray: hexGridWithoutZero,
    }).then((res) => {
      res.forEach((hex: any) => {
        delete hex.hasMerged;
      });
      const mergedList = gridArray.filter((hex) => hex.hasMerged);
      setNewHexagons(mergedList);
      gridArray.forEach((hex) => {
        delete hex.hasMerged;
      });
      const newList = mergeArrays(res, updatedList);
      setHexArray(newList);
    });
  };

  const fetchNewItems = (updatedList: HexProps[]) => {
    getNewServerList(updatedList);
  };

  return { fetchNewItems };
};
