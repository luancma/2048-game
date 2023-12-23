import { HexProps } from "../../components/App";
import { MoveHexagonsBottomLeft } from "./MoveHexagonsBottomLeft";

const MOCK = [
  {
    x: -1,
    y: 0,
    z: 1,
    value: 4,
  },
  {
    x: -1,
    y: 1,
    z: 0,
    value: 4,
  },
  {
    x: 0,
    y: -1,
    z: 1,
    value: 4,
  },
  {
    x: 0,
    y: 0,
    z: 0,
    value: 0,
  },
  {
    x: 0,
    y: 1,
    z: -1,
    value: 0,
  },
  {
    x: 1,
    y: -1,
    z: 0,
    value: 0,
  },
  {
    x: 1,
    y: 0,
    z: -1,
    value: 4,
  },
];

const overrideMock = (newObjects: HexProps[]) => {
  const updatedResult = newObjects.map((hex) => {
    const foundHex = newObjects.find(
      (newHex) => newHex.x === hex.x && newHex.y === hex.y && newHex.z === hex.z
    );
    return foundHex ? foundHex : hex;
  });
  return updatedResult;
};

it("should return z:[4,0,0] when receive z:[0,0,4]", () => {
  const classHandler = new MoveHexagonsBottomLeft();
  const result = classHandler.execute(MOCK);
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

it("should return z:[4,0,0] when receive z:[0,4,0]", () => {
  const classHandler = new MoveHexagonsBottomLeft();
  const result = classHandler.execute([
    ...MOCK,
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
  ]);
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
  expect(result).toContainEqual({
    x: -1,
    y: 1,
    z: 0,
    value: 0,
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
        value: 4,
      },
    ])
  );
  console.log(result);
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
    value: 4,
  });
  expect(result).toContainEqual({
    x: 1,
    y: -1,
    z: 0,
    value: 8,
  });
});

it("should return z:[4,4,8] when receive z:[8,8,0]", () => {
  const classHandler = new MoveHexagonsBottomLeft();
  const result = classHandler.execute(
    overrideMock([
      {
        x: -1,
        y: 1,
        z: 0,
        value: 8,
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
        value: 4,
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
    value: 8,
  });
  expect(result).toContainEqual({
    x: 1,
    y: -1,
    z: 0,
    value: 8,
  });
});
