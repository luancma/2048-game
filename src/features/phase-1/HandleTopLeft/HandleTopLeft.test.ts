import { SharedTopMovements } from "../SharedTopMovements";
import { HandleTopRight } from "../TopRight/HandleTopRight";
import { newOverrideMock } from "../TopRight/HandleTopRight.test";
import { MOCK } from "../utils/MOCK";

describe("HandleTopLeft", () => {
  describe("Movements", () => {
    it("should receive 4 0 0 and return 0 0 4", () => {
      const handleClass = new SharedTopMovements("y", "x");
      const arr = newOverrideMock(MOCK, [
        {
          x: -1,
          y: 0,
          z: 1,
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
      ]);
      const result = handleClass.execute(arr);
      expect(result).toContainEqual({
        x: -1,
        y: 0,
        z: 1,
        value: 8,
        hasMerged: true,
      });
      expect(result).toContainEqual({
        x: -1,
        y: 1,
        z: 0,
        value: 0,
        hasMerged: false,
      });
    });
  });
});
