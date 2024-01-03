import { HexProps } from "../App";

export const mergeArrays = (serverArray: HexProps[], localArray: HexProps[]) =>
  localArray.map((hex: HexProps) => {
    const serverHex = serverArray.find(
      (serverHex: HexProps) =>
        serverHex.x === hex.x && serverHex.y === hex.y && serverHex.z === hex.z
    );
    if (serverHex) {
      return serverHex;
    }
    return hex;
  });
