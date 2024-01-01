import { GridMovements } from "../phaseManager/GridMovements";
import { MOCK } from "../phaseManager/utils/MOCK";
import { overrideMock } from "../phaseManager/utils/overrideMock";

describe("Movements", () => {
  describe("TopLeft", () => {
    const handleClass = new GridMovements("x", "z");

    const withThreeElements = ({
      value1,
      value2,
      value3,
      expectedValue1,
      expectedValue2,
      expectedValue3,
      mergedIndex,
    }: {
      value1: number;
      value2: number;
      value3: number;
      expectedValue1: number;
      expectedValue2: number;
      expectedValue3: number;
      mergedIndex: number | false;
    }) => {
      const arr = overrideMock(MOCK, [
        {
          x: -1,
          y: 1,
          z: 0,
          value: value1,
          hasMerged: false,
        },
        {
          x: 0,
          y: 0,
          z: 0,
          value: value2,
          hasMerged: false,
        },
        {
          x: 1,
          y: -1,
          z: 0,
          value: value3,
          hasMerged: false,
        },
      ]);
      const result = handleClass?.execute(arr);
      expect(result).toContainEqual({
        x: -1,
        y: 1,
        z: 0,
        value: expectedValue1,
        hasMerged: mergedIndex === 1,
      });
      expect(result).toContainEqual({
        x: 0,
        y: 0,
        z: 0,
        value: expectedValue2,
        hasMerged: mergedIndex === 2,
      });
      expect(result).toContainEqual({
        x: 1,
        y: -1,
        z: 0,
        value: expectedValue3,
        hasMerged: mergedIndex === 3,
      });
    };

    const withTwoElements = ({
      value1,
      value2,
      expectedValue1,
      expectedValue2,
      mergedIndex,
    }: {
      value1: number;
      value2: number;
      expectedValue1: number;
      expectedValue2: number;
      mergedIndex: number | false;
    }) => {
      const arr = overrideMock(MOCK, [
        {
          x: -1,
          y: 0,
          z: 1,
          value: value1,
          hasMerged: false,
        },
        {
          x: 0,
          y: -1,
          z: 1,
          value: value2,
          hasMerged: false,
        },
      ]);
      const result = handleClass?.execute(arr);
      expect(result).toContainEqual({
        x: -1,
        y: 0,
        z: 1,
        value: expectedValue1,
        hasMerged: mergedIndex === 1,
      });
      expect(result).toContainEqual({
        x: 0,
        y: -1,
        z: 1,
        value: expectedValue2,
        hasMerged: mergedIndex === 2,
      });
    };

    it.each([
      [
        "4 0 4 and return 8 0 0",
        {
          value1: 4,
          value2: 0,
          value3: 4,
          expectedValue1: 8,
          expectedValue2: 0,
          expectedValue3: 0,
          mergedIndex: 1,
        },
      ],
      [
        "4 4 4 and return 8 4 0",
        {
          value1: 4,
          value2: 4,
          value3: 4,
          expectedValue1: 8,
          expectedValue2: 4,
          expectedValue3: 0,
          mergedIndex: 1,
        },
      ],
      [
        "4 4 8 and return 8 8 0",
        {
          value1: 4,
          value2: 4,
          value3: 8,
          expectedValue1: 8,
          expectedValue2: 8,
          expectedValue3: 0,
          mergedIndex: 1,
        },
      ],
      [
        "16 4 8 and return 16 4 0",
        {
          value1: 16,
          value2: 4,
          value3: 8,
          expectedValue1: 16,
          expectedValue2: 4,
          expectedValue3: 8,
          mergedIndex: false,
        },
      ],
      [
        "16 0 2 and return 16 2 0",
        {
          value1: 16,
          value2: 0,
          value3: 2,
          expectedValue1: 16,
          expectedValue2: 2,
          expectedValue3: 0,
          mergedIndex: false,
        },
      ],
    ])("should receive %s", async (_, obj) => {
      withThreeElements(obj);
    });
    it("should receive 4 4 and return 8 0", () => {
      withTwoElements({
        value1: 4,
        value2: 4,
        expectedValue1: 8,
        expectedValue2: 0,
        mergedIndex: 1,
      });
    });
    it("should receive 0 4 and return 4 0", () => {
      withTwoElements({
        value1: 0,
        value2: 4,
        expectedValue1: 4,
        expectedValue2: 0,
        mergedIndex: false,
      });
    });
  });

  describe("TopRight", () => {
    const handleClass = new GridMovements("z", "y");

    const withThreeElements = ({
      value1,
      value2,
      value3,
      expectedValue1,
      expectedValue2,
      expectedValue3,
      mergedIndex,
    }: {
      value1: number;
      value2: number;
      value3: number;
      expectedValue1: number;
      expectedValue2: number;
      expectedValue3: number;
      mergedIndex: number | false;
    }) => {
      const arr = overrideMock(MOCK, [
        {
          x: -1,
          y: 0,
          z: 1,
          value: value1,
          hasMerged: false,
        },
        {
          x: 0,
          y: 0,
          z: 0,
          value: value2,
          hasMerged: false,
        },
        {
          x: 1,
          y: 0,
          z: -1,
          value: value3,
          hasMerged: false,
        },
      ]);
      const result = handleClass.execute(arr);
      expect(result).toContainEqual({
        x: -1,
        y: 0,
        z: 1,
        value: expectedValue1,
        hasMerged: mergedIndex === 1,
      });
      expect(result).toContainEqual({
        x: 0,
        y: 0,
        z: 0,
        value: expectedValue2,
        hasMerged: mergedIndex === 2,
      });
      expect(result).toContainEqual({
        x: 1,
        y: 0,
        z: -1,
        value: expectedValue3,
        hasMerged: mergedIndex === 3,
      });
    };

    const withTwoElements = ({
      value1,
      value2,
      expectedValue1,
      expectedValue2,
      mergedIndex,
    }: {
      value1: number;
      value2: number;
      expectedValue1: number;
      expectedValue2: number;
      mergedIndex: number | false;
    }) => {
      const arr = overrideMock(MOCK, [
        {
          x: 1,
          y: 0,
          z: -1,
          value: value1,
          hasMerged: mergedIndex === 1,
        },
        {
          x: 1,
          y: 0,
          z: -1,
          value: value2,
          hasMerged: mergedIndex === 2,
        },
      ]);
      const result = handleClass?.execute(arr);
      expect(result).toContainEqual({
        x: 1,
        y: 0,
        z: -1,
        value: expectedValue1,
        hasMerged: mergedIndex === 1,
      });
      expect(result).toContainEqual({
        x: 0,
        y: -1,
        z: 1,
        value: expectedValue2,
        hasMerged: mergedIndex === 2,
      });
    };

    it.each([
      [
        "0 4 4 and return 0 0 8",
        {
          value1: 4,
          value2: 4,
          value3: 0,
          expectedValue1: 0,
          expectedValue2: 0,
          expectedValue3: 8,
          mergedIndex: 3,
        },
      ],
      [
        "4 4 4 and return 0 4 8",
        {
          value1: 4,
          value2: 4,
          value3: 4,
          expectedValue1: 0,
          expectedValue2: 4,
          expectedValue3: 8,
          mergedIndex: 3,
        },
      ],
      [
        "4 4 16 and return 0 8 16",
        {
          value1: 4,
          value2: 4,
          value3: 16,
          expectedValue1: 0,
          expectedValue2: 8,
          expectedValue3: 16,
          mergedIndex: 2,
        },
      ],
      [
        "16 0 2 and return 0 16 2",
        {
          value1: 16,
          value2: 0,
          value3: 2,
          expectedValue1: 0,
          expectedValue2: 16,
          expectedValue3: 2,
          mergedIndex: false,
        },
      ],
    ])("should receive %s", async (_, obj) => {
      withThreeElements(obj);
    });
  });
});
