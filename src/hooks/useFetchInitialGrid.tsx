import { useEffect } from "react";
import { getUrlParams } from "../utils/getUrlParams";
import { generateHexagonalArray } from "../utils/generateHexagonsGrid";
import { fetchHexValue } from "../utils/api";
import { useGridContext } from "../context/GridContext";
import { mergeArrays } from "../utils/mergeArrays";

export const useFetchInitialGrid = () => {
  const { setHexArray, isError, setIsError, setIsIdle } = useGridContext();
  useEffect(() => {
    const { radius } = getUrlParams();
    const hexagonalArray = generateHexagonalArray(radius);

    fetchHexValue({
      currentHexArray: [],
    })
      .then((res) => {
        setHexArray(mergeArrays(res, hexagonalArray));
        if (isError) {
          setIsError(false);
        }
      })
      .catch(() => {
        setIsError(true);
        setHexArray(hexagonalArray);
      })
      .finally(() => {
        setIsIdle(false);
      });
  }, []);
};
