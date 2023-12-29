import { HexProps } from "../../../App";

export const overrideMock = (newObjects: HexProps[]) => {
  const updatedResult = newObjects.map((hex) => {
    const foundHex = newObjects.find(
      (newHex) => newHex.x === hex.x && newHex.y === hex.y && newHex.z === hex.z
    );
    return foundHex ? foundHex : hex;
  });
  return updatedResult;
};
