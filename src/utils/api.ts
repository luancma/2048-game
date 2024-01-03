import { HexProps } from "../App";
import { getUrlParams } from "./getUrlParams";

type FetchNewHexProps = {
  currentHexArray: HexProps[];
};

export const fetchHexValue = async ({ currentHexArray }: FetchNewHexProps) => {
  let result: HexProps[] = [];
  const { port, radius, hostname } = getUrlParams();
  const { NODE_ENV } = process.env;

  const portValue = NODE_ENV === "production" && port === 80 ? "" : `:${port}`;

  await fetch(
    `${
      NODE_ENV === "development" ? "http" : "https"
    }://${hostname}${portValue}/${radius}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentHexArray ? currentHexArray : []),
    }
  )
    .then((res) => res.json())
    .then((res) => {
      result = res;
    });

  return result;
};
