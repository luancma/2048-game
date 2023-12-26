import { MOCK } from "../utils/MOCK";
import { overrideMock } from "../utils/overrideMock";
import { MoveHexagonsBottomLeft } from "./MoveHexagonsBottomLeft";

it("should return z:[0,4,4] when receive z:[0,0,8]", () => {
  const classHandler = new MoveHexagonsBottomLeft();
  const result = classHandler.execute(
    overrideMock([
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
        value: 0,
        hasMerged: false,
      },
    ])
  );
  expect(result).toContainEqual({
    x: -1,
    y: 1,
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
    x: 1,
    y: -1,
    z: 0,
    value: 8,
    hasMerged: true,
  });
});

it("should return z:[2,8,8] when receive z:[2,16,0]", () => {
  const classHandler = new MoveHexagonsBottomLeft();
  const result = classHandler.execute(
    overrideMock([
      {
        x: -1,
        y: 1,
        z: 0,
        value: 8,
        hasMerged: false,
      },
      {
        x: 0,
        y: 0,
        z: 0,
        value: 8,
        hasMerged: false,
      },
      {
        x: 1,
        y: -1,
        z: 0,
        value: 2,
        hasMerged: false,
      },
    ])
  );
  expect(result).toContainEqual({
    x: -1,
    y: 1,
    z: 0,
    value: 0,
    hasMerged: false,
  });
  expect(result).toContainEqual({
    x: 0,
    y: 0,
    z: 0,
    value: 16,
    hasMerged: true,
  });
  expect(result).toContainEqual({
    x: 1,
    y: -1,
    z: 0,
    value: 2,
    hasMerged: false,
  });
});

it("should return z:[4,0,0] when receive z:[0,0,4]", () => {
  const classHandler = new MoveHexagonsBottomLeft();
  const result = classHandler.execute(MOCK);
  expect(result).toContainEqual({
    x: 0,
    y: 0,
    z: 0,
    value: 0,
    hasMerged: false,
  });

  expect(result).toContainEqual({
    x: 1,
    y: -1,
    z: 0,
    value: 4,
    hasMerged: false,
  });
});

it("should return z:[4,0,0] when receive z:[0,4,0]", () => {
  const classHandler = new MoveHexagonsBottomLeft();
  const result = classHandler.execute(
    overrideMock([
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
    ])
  );
  expect(result).toContainEqual({
    x: 0,
    y: 0,
    z: 0,
    value: 0,
    hasMerged: false,
  });
  expect(result).toContainEqual({
    x: 1,
    y: -1,
    z: 0,
    value: 4,
    hasMerged: false,
  });
  expect(result).toContainEqual({
    x: -1,
    y: 1,
    z: 0,
    value: 0,
    hasMerged: false,
  });
});

it("should return z:[4,4,4] when receive z:[8,4,0]", () => {
  const classHandler = new MoveHexagonsBottomLeft();
  const result = classHandler.execute(
    overrideMock([
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
    ])
  );
  expect(result).toContainEqual({
    x: -1,
    y: 1,
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
    x: 1,
    y: -1,
    z: 0,
    value: 8,
    hasMerged: true,
  });
});

it("should return z:[0,4,0] when receive z:[4,0,0]", () => {
  const classHandler = new MoveHexagonsBottomLeft();
  const result = classHandler.execute(
    overrideMock([
      {
        x: -1,
        y: 1,
        z: 0,
        value: 0,
      },
      {
        x: 0,
        y: 0,
        z: 0,
        value: 4,
      },
      {
        x: 1,
        y: -1,
        z: 0,
        value: 0,
      },
    ])
  );
  expect(result).toContainEqual({
    x: -1,
    y: 1,
    z: 0,
    value: 0,
  });
  expect(result).toContainEqual({
    x: 0,
    y: 0,
    z: 0,
    value: 0,
  });
  expect(result).toContainEqual({
    x: 1,
    y: -1,
    z: 0,
    value: 4,
  });
});

it("should return z:[4,4,0] when receive z:[8,0,0]", () => {
  const classHandler = new MoveHexagonsBottomLeft();
  const result = classHandler.execute(
    overrideMock([
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
    ])
  );
  expect(result).toContainEqual({
    x: -1,
    y: 1,
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
    x: 1,
    y: -1,
    z: 0,
    value: 8,
    hasMerged: true,
  });
});

it("should return z:[0,4] when receive z:[4,0]", () => {
  const classHandler = new MoveHexagonsBottomLeft();
  const result = classHandler.execute(
    overrideMock([
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
    ])
  );
  expect(result).toContainEqual({
    x: -1,
    y: 1,
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
});
