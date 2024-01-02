import { HexProps } from "../App";

export function generateHexagonalArray(receivedRadius: number): HexProps[] {
  const radiusMapping = {
    2: 2,
    3: 4,
    4: 6,
  } as {
    [index: number]: number;
  };

  let radius = radiusMapping[receivedRadius] || 2;

  const hexArray: HexProps[] = [];

  for (let x = -radius; x <= radius; x++) {
    for (let y = -radius; y <= radius; y++) {
      const z = -x - y;
      const isValidHex = Math.abs(x) + Math.abs(y) + Math.abs(z) <= radius;
      if (isValidHex) {
        hexArray.push({ x, y, z, value: 0 });
      }
    }
  }
  return hexArray;
}
