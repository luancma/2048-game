import { HexProps } from "../App";

export function generateHexagonalArray(receivedRadius: number): HexProps[] {
  let radius = receivedRadius;

  if (receivedRadius < 3) {
    radius = 2;
  } else if (receivedRadius === 3) {
    radius = 4;
  } else if (receivedRadius === 4) {
    radius = 6;
  } else {
    radius = 2;
  }

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
