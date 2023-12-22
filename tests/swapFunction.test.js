function testingClickDown(obj) {
  const result = [...obj];
  for (let column = 0; column < result.length; column++) {
    for (let row = 0; row < result.length; row++) {
      if (
        result[row].value > 0 &&
        result[column].value === 0 &&
        result[row].y === result[column].y &&
        result[row].x > result[column].x
      ) {
        const tempZ = result[column].z;
        const tempX = result[column].x;
        result[column].z = result[row].z;
        result[column].x = result[row].x;
        result[row].z = tempZ;
        result[row].x = tempX;
      }

      if (
        result[row].value > 0 &&
        result[column].value === result[row].value &&
        result[row].y === result[column].y &&
        result[row].z > result[column].z
      ) {
        const tempZ = result[column].z;
        const tempX = result[column].x;
        result[column].value *= 2;
        result[column].z = result[row].z;
        result[column].x = result[row].x;
        result[row].z = tempZ;
        result[row].x = tempX;
        result[row].value = 0;
      }
    }
  }
  return result;
}

const mock = [
  {
    x: 1,
    y: 0,
    z: -1,
    value: 2,
  },
  {
    x: 0,
    y: 0,
    z: 0,
    value: 8,
  },
  {
    x: -1,
    y: 0,
    z: 1,
    value: 0,
  },
];

it("should swap the values", () => {
  const result = testingClickDown(mock);
  console.log(result)
});
