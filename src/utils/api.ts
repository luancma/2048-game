import { HexProps } from "../App";
import { getUrlParams } from "./getUrlParams";

type FetchNewHexProps = {
  currentHexArray: HexProps[];
};

export const fetchHexValue = async ({ currentHexArray }: FetchNewHexProps) => {
  let result: HexProps[] = [];
  const { port, radius, hostname } = getUrlParams();
  await fetch(`http://${hostname}:${port}/${radius}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(currentHexArray ? currentHexArray : []),
  })
    .then((res) => res.json())
    .then((res) => {
      result = res;
    });

  return result;
};
