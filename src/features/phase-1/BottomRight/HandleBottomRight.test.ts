import { HexProps } from "../../../App";
import { MOCK } from "../utils/MOCK";
import { HandleBottomRight } from "./HandleBottomRight";

const overrideMock = (mock: HexProps[], override: HexProps[]) => {
  const arr = mock.map((item) => {
    const find = override.find((i) => i.x === item.x && i.y === item.y);
    if (find) {
      return find;
    }
    return item;
  });
  return arr;
};

describe("HandleBottomRight", () => {
  describe("should reorganize the Grid", () => {
    // structure: x1, x0, x-1
    it("should return 0 0 4 when receive 4 0 0", () => {
      const array = [
        {
          x: -1,
          y: 1,
          z: 0,
          value: 4,
          hasMerged: false,
        },
        {
          x: 0,
          y: 0,
          z: 0,
          value: 0,
          hasMerged: false,
        },
        {
          x: 1,
          y: -1,
          z: 0,
          value: 0,
          hasMerged: false,
        },
      ];
      const classHandler = new HandleBottomRight();
      const arr = overrideMock(MOCK, array);
      const result = classHandler.execute(arr);
      expect(result).toContainEqual({
        x: -1,
        y: 1,
        z: 0,
        value: 4,
        hasMerged: false,
      });
    });

    it("should return 0 0 4 when receive 0 4 0", () => {
      const array = [
        {
          x: -1,
          y: 1,
          z: 0,
          value: 0,
          hasMerged: false,
        },
        {
          x: 0,
          y: 0,
          z: 0,
          value: 4,
          hasMerged: false,
        },
        {
          x: 1,
          y: -1,
          z: 0,
          value: 0,
          hasMerged: false,
        },
      ];
      const classHandler = new HandleBottomRight();
      const arr = overrideMock(MOCK, array);
      const result = classHandler.execute(arr);
      expect(result).toContainEqual({
        x: -1,
        y: 1,
        z: 0,
        value: 4,
        hasMerged: false,
      });
    });

    it("should return 0 4 4 when receive 4 4 0", () => {
      const array = [
        {
          x: -1,
          y: 1,
          z: 0,
          value: 0,
          hasMerged: false,
        },
        {
          x: 0,
          y: 0,
          z: 0,
          value: 4,
          hasMerged: false,
        },
        {
          x: 1,
          y: -1,
          z: 0,
          value: 4,
          hasMerged: false,
        },
      ];
      const classHandler = new HandleBottomRight();
      const arr = overrideMock(MOCK, array);
      const result = classHandler.execute(arr);
      expect(result).toContainEqual({
        x: 0,
        y: 0,
        z: 0,
        value: 4,
        hasMerged: false,
      });
      expect(result).toContainEqual({
        x: -1,
        y: 1,
        z: 0,
        value: 4,
        hasMerged: false,
      });
    });

    it("should return 0 4 4 when receive 4 0 4", () => {
      const array = [
        {
          x: -1,
          y: 1,
          z: 0,
          value: 4,
          hasMerged: false,
        },
        {
          x: 0,
          y: 0,
          z: 0,
          value: 0,
          hasMerged: false,
        },
        {
          x: 1,
          y: -1,
          z: 0,
          value: 4,
          hasMerged: false,
        },
      ];
      const classHandler = new HandleBottomRight();
      const arr = overrideMock(MOCK, array);
      const result = classHandler.execute(arr);
      expect(result).toContainEqual({
        x: 1,
        y: -1,
        z: 0,
        value: 0,
        hasMerged: false,
      });
      expect(result).toContainEqual({
        x: 0,
        y: 0,
        z: 0,
        value: 4,
        hasMerged: false,
      });
      expect(result).toContainEqual({
        x: -1,
        y: 1,
        z: 0,
        value: 4,
        hasMerged: false,
      });
    });

    it("should return 4 0 when receive 0 4", () => {
      const array = [
        {
          x: 0,
          y: -1,
          z: 1,
          value: 4,
          hasMerged: false,
        },
        {
          x: -1,
          y: 0,
          z: 1,
          value: 0,
          hasMerged: false,
        },
      ];
      const classHandler = new HandleBottomRight();
      const arr = overrideMock(MOCK, array);
      const result = classHandler.execute(arr);
      expect(result).toContainEqual({
        x: 0,
        y: -1,
        z: 1,
        value: 0,
        hasMerged: false,
      });
      expect(result).toContainEqual({
        x: -1,
        y: 0,
        z: 1,
        value: 4,
        hasMerged: false,
      });
    });
  });
});
