import { HexProps } from "../../../App";

export const overrideMock = (mock: HexProps[], override: HexProps[]) => {
  const arr = mock.map((item) => {
    const find = override.find((i) => i.x === item.x && i.y === item.y);
    if (find) {
      return find;
    }
    return item;
  });
  return arr;
};
