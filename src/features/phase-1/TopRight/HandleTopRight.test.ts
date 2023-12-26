import { HexProps } from "../../../App";
import { MOCK } from "../utils/MOCK";
import { HandleTopRight } from "./HandleTopRight";

export const newOverrideMock = (mock: HexProps[], override: HexProps[]) => {
  const arr = mock.map((item) => {
    const find = override.find((i) => i.x === item.x && i.y === item.y);
    if (find) {
      return find;
    }
    return item;
  });
  return arr;
};

describe("HandleTopRight", () => {
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
      const classHandler = new HandleTopRight();
      const arr = newOverrideMock(MOCK, array);
      const result = classHandler.reorderGrid(arr);
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
      const classHandler = new HandleTopRight();
      const arr = newOverrideMock(MOCK, array);
      const result = classHandler.reorderGrid(arr);
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
      const classHandler = new HandleTopRight();
      const arr = newOverrideMock(MOCK, array);
      const result = classHandler.reorderGrid(arr);
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
      const classHandler = new HandleTopRight();
      const arr = newOverrideMock(MOCK, array);
      const result = classHandler.reorderGrid(arr);
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

    it("should return 4 4 4 when receive 4 4 4", () => {
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
      const classHandler = new HandleTopRight();
      const arr = newOverrideMock(MOCK, array);
      const result = classHandler.reorderGrid(arr);
      expect(result).toContainEqual({
        x: 1,
        y: -1,
        z: 0,
        value: 4,
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
      const classHandler = new HandleTopRight();
      const arr = newOverrideMock(MOCK, array);
      const result = classHandler.reorderGrid(arr);
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

    it("should return 2 4 2 when receive 2 4 2", () => {
      const array = [
        {
          x: 1,
          y: -1,
          z: 0,
          value: 2,
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
          x: -1,
          y: 1,
          z: 0,
          value: 2,
          hasMerged: false,
        },
      ];
      const classHandler = new HandleTopRight();
      const arr = newOverrideMock(MOCK, array);
      const result = classHandler.reorderGrid(arr);
      expect(result).toContainEqual({
        x: 1,
        y: -1,
        z: 0,
        value: 2,
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
        value: 2,
        hasMerged: false,
      });
    });
  });
  describe("should merge the hexagons", () => {
    it("should return 0 0 8 when receive 0 4 4", () => {
      const array = [
        {
          x: 1,
          y: -1,
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
          x: -1,
          y: 1,
          z: 0,
          value: 4,
          hasMerged: false,
        },
      ];
      const classHandler = new HandleTopRight();
      const arr = newOverrideMock(MOCK, array);
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
        value: 0,
        hasMerged: false,
      });
      expect(result).toContainEqual({
        x: -1,
        y: 1,
        z: 0,
        value: 8,
        hasMerged: true,
      });
    });

    it("should return 2 2 4 when receive 0 4 4", () => {
      const array = [
        {
          x: 1,
          y: -1,
          z: 0,
          value: 2,
          hasMerged: false,
        },
        {
          x: 0,
          y: 0,
          z: 0,
          value: 2,
          hasMerged: false,
        },
        {
          x: -1,
          y: 1,
          z: 0,
          value: 4,
          hasMerged: false,
        },
      ];
      const classHandler = new HandleTopRight();
      const arr = newOverrideMock(MOCK, array);
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
        hasMerged: true,
      });
      expect(result).toContainEqual({
        x: -1,
        y: 1,
        z: 0,
        value: 4,
        hasMerged: false,
      });
    });

    it("should return 2 2 2 when receive 0 4 4", () => {
      const array = [
        {
          x: 1,
          y: -1,
          z: 0,
          value: 2,
          hasMerged: false,
        },
        {
          x: 0,
          y: 0,
          z: 0,
          value: 2,
          hasMerged: false,
        },
        {
          x: -1,
          y: 1,
          z: 0,
          value: 2,
          hasMerged: false,
        },
      ];
      const classHandler = new HandleTopRight();
      const arr = newOverrideMock(MOCK, array);
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
        value: 2,
        hasMerged: false,
      });
      expect(result).toContainEqual({
        x: -1,
        y: 1,
        z: 0,
        value: 4,
        hasMerged: true,
      });
    });

    it("should return 4 2 2 when receive 0 4 4", () => {
      const array = [
        {
          x: 1,
          y: -1,
          z: 0,
          value: 4,
          hasMerged: false,
        },
        {
          x: 0,
          y: 0,
          z: 0,
          value: 2,
          hasMerged: false,
        },
        {
          x: -1,
          y: 1,
          z: 0,
          value: 2,
          hasMerged: false,
        },
      ];
      const classHandler = new HandleTopRight();
      const arr = newOverrideMock(MOCK, array);
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
        hasMerged: true,
      });
    });

    it("should return 2 4 2 when receive 2 4 2", () => {
      const array = [
        {
          x: 1,
          y: -1,
          z: 0,
          value: 2,
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
          x: -1,
          y: 1,
          z: 0,
          value: 2,
          hasMerged: false,
        },
      ];
      const classHandler = new HandleTopRight();
      const arr = newOverrideMock(MOCK, array);
      const result = classHandler.execute(arr);
      expect(result).toContainEqual({
        x: 1,
        y: -1,
        z: 0,
        value: 2,
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
        value: 2,
        hasMerged: false,
      });
    });
  });
});
