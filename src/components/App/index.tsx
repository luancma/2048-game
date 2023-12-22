import React from "react";
import { Hex, HexGrid, Hexagon, Layout, Text } from "react-hexgrid";
import { hexagonalArray } from "../../mocks/hexagonalArray";

export type HexProps = {
  x: number;
  y: number;
  z: number;
  value: number;
  hasMerged?: boolean;
  moved?: boolean;
  prev?: {
    x: number;
    y: number;
    z: number;
  };
};

function generateHexagonalArray(radius: number): HexProps[] {
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

export function testingClickDown(obj: HexProps[]) {
  const result = [...obj];
  for (let column = 0; column < result.length; column++) {
    for (let row = 0; row < result.length; row++) {
      if (
        result[row].value > 0 &&
        result[column].value === 0 &&
        result[row].y === result[column].y &&
        result[column].x > result[row].x
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
        result[row].z < result[column].z
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

const HexagonGrid = () => {
  const useMock = true;
  const [newItems, setNewItems] = React.useState<HexProps[]>([]);
  const [hexArray, setHexArray] = React.useState<HexProps[]>([]);
  const newArrayValue = (serverArray: HexProps[], localArray: HexProps[]) => {
    const newHexArray = localArray.map((hex: HexProps) => {
      const serverHex = serverArray.find(
        (serverHex: HexProps) =>
          serverHex.x === hex.x &&
          serverHex.y === hex.y &&
          serverHex.z === hex.z
      );
      if (serverHex) {
        return serverHex;
      }
      return hex;
    });
    return newHexArray;
  };

  React.useEffect(() => {
    const radius = 3;
    const hexagonalArray = generateHexagonalArray(radius);
    const fetchHexValue = async () => {
      await fetch("http://localhost:13337/2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([]),
      })
        .then((res) => res.json())
        .then((res) => res)
        .then((res) => {
          setHexArray(newArrayValue(res, hexagonalArray));
        });
    };

    if (useMock) {
      setHexArray([
        {
          x: -1,
          y: 0,
          z: 1,
          value: 2,
        },
        {
          x: -1,
          y: 1,
          z: 0,
          value: 0,
        },
        {
          x: 0,
          y: -1,
          z: 1,
          value: 2,
        },
        {
          x: 0,
          y: 0,
          z: 0,
          value: 8,
        },
        {
          x: 0,
          y: 1,
          z: -1,
          value: 2,
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
          value: 0,
        },
      ]);
    } else {
      fetchHexValue();
    }
  }, []);

  const orderDown = (hexArray: HexProps[]) => {
    const useOld = true;
    let hexArrayCopy = [...hexArray];
    if (useOld) {
      hexArrayCopy.forEach((hex) => {
        const columnY = hexArrayCopy.filter((hex2) => hex2.y === hex.y);
        columnY.forEach((hex2) => {
          if (hex2.value > 0 && hex2.z > hex.z) {
            const tempZ = hex2.z;
            const tempX = hex2.x;
            hex2.z = hex.z;
            hex2.x = hex.x;
            hex.z = tempZ;
            hex.x = tempX;
          }
        });
      });
    } else {
      hexArrayCopy.forEach((hex) => {
        const adjacentHexes = hexArrayCopy.filter(
          (hex2) =>
            hex2.y === hex.y &&
            Math.abs(hex2.x - hex.x) >= 1 &&
            Math.abs(hex2.z - hex.z) <= 1 &&
            hex2 !== hex
        );

        adjacentHexes.forEach((adjacentHex) => {
          if (
            adjacentHex.value === hex.value &&
            hex.value > 0 &&
            hex.value !== 2048 &&
            adjacentHex.z > hex.z
          ) {
            const tempZ = adjacentHex.z;
            const tempX = adjacentHex.x;

            // Move the merged hexagon down
            adjacentHex.z = hex.z;
            adjacentHex.x = hex.x;

            // Set the original hexagon to zero
            hex.z = tempZ;
            hex.x = tempX;
            hex.value = 0;

            // Update the value of the merged hexagon
            adjacentHex.value *= 2;
          }
        });
      });

      // hexArrayCopy.forEach((hex) => {
      //   const adjacentHexes = hexArrayCopy.filter(
      //     (hex2) =>
      //       hex2.y === hex.y &&
      //       Math.abs(hex2.x - hex.x) <= 1 &&
      //       Math.abs(hex2.z - hex.z) <= 1 &&
      //       hex2 !== hex
      //   );

      //   adjacentHexes.forEach((adjacentHex) => {
      //     if (
      //       adjacentHex.value > 0 &&
      //       hex.value === 0 &&
      //       adjacentHex.z > hex.z
      //     ) {
      //       const tempZ = adjacentHex.z;
      //       const tempX = adjacentHex.x;
      //       adjacentHex.z = hex.z;
      //       adjacentHex.x = hex.x;
      //       hex.z = tempZ;
      //       hex.x = tempX;
      //     }
      //   });
      // });

      // hexArrayCopy.forEach((hex) => {
      //   const columnY = hexArrayCopy.filter((hex2) => hex2.y === hex.y);
      //   columnY.forEach((hex2) => {
      //     if (hex2.value > 0 && hex.value === 0 && hex2.z > hex.z) {
      //       const tempZ = hex2.z;
      //       const tempX = hex2.x;
      //       hex2.z = hex.z;
      //       hex2.x = hex.x;
      //       hex.z = tempZ;
      //       hex.x = tempX;
      //     }
      //   });
      // });
    }
    return hexArrayCopy;
  };

  const handleClickDown = (hexArray: HexProps[]) => {
    const hexArrayCopy = orderDown(hexArray);
    setHexArray(hexArrayCopy);
    return;
    hexArrayCopy.forEach((hex) => {
      const sameY = hexArrayCopy.filter((hex2) => hex2.y === hex.y);
      sameY.forEach((hex2) => {
        if (
          hex2.value === hex.value &&
          hex2.z !== hex.z &&
          hex.hasMerged !== true &&
          hex2.hasMerged !== true
        ) {
          hex.value = hex2.value + hex.value; // Sum the values
          hex.hasMerged = true; // Prevents the hex from being merged again
          hex2.value = 0;
        }
      });
    });
    orderDown(hexArrayCopy);
    setHexArray(orderDown(hexArrayCopy));
    getNewServerList();
  };

  const orderUp = (hexArray: HexProps[]) => {
    let hexArrayCopy = [...hexArray];
    hexArrayCopy.forEach((hex) => {
      const sameY = hexArrayCopy.filter((hex2) => hex2.y === hex.y);
      sameY.forEach((hex2) => {
        if (hex.value === 0 && hex2.z < hex.z) {
          const tempZ = hex2.z;
          const tempX = hex2.x;
          hex2.z = hex.z;
          hex2.x = hex.x;
          hex.z = tempZ;
          hex.x = tempX;
        }
      });
    });
    return hexArrayCopy;
  };

  const handleClickUp = (hexArray: HexProps[]) => {
    const hexArrayCopy = orderUp(hexArray);
    hexArrayCopy.forEach((hex) => {
      const sameY = hexArrayCopy.filter((hex2) => hex2.y === hex.y);
      sameY.forEach((hex2) => {
        if (
          hex2.value === hex.value &&
          hex2.z !== hex.z &&
          hex.hasMerged !== true &&
          hex2.hasMerged !== true
        ) {
          hex.value = hex2.value + hex.value; // Sum the values
          hex.hasMerged = true; // Prevents the hex from being merged again
          hex2.value = 0;
        }
      });
    });
    orderUp(hexArrayCopy);
    setHexArray(orderUp(hexArrayCopy));
    getNewServerList();
  };

  const getNewServerList = () => {
    const filteredHexWithValues = hexArray
      .filter((hex) => hex.value > 0)
      .map((hex) => {
        return {
          x: hex.x,
          y: hex.y,
          z: hex.z,
          value: hex.value,
        };
      });
    setNewItems([]);
    const fetchHexValue = async () => {
      await fetch("http://localhost:13337/2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filteredHexWithValues),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.length === 0) {
            alert("You lost");
            return;
          }
          res.forEach((hex: any) => {
            delete hex.hasMerged;
          });
          hexArray.forEach((hex) => {
            delete hex.hasMerged;
          });
          setNewItems(res);
          setHexArray(newArrayValue(res, hexArray));
        });
    };
    fetchHexValue();
  };

  React.useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp" || event.key === "w" || event.key === "W") {
        handleClickUp(hexArray);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" || event.key === "s" || event.key === "S") {
        const newList = testingClickDown(hexArray);
        console.log(newList);
        setHexArray(newList);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    window.addEventListener("keyup", handleKeyUp);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [hexArray]);

  const manageColor = (hex: HexProps) => {
    if (newItems.find((item) => item.x === hex.x && item.y === hex.y)) {
      return "green";
    }
    if (hex.value === 0) {
      return "grey";
    }
    if (hex.value > 0) {
      return "black";
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <button onClick={() => orderUp(hexArray)}>UP DEBUG</button>
      <HexGrid width={1200} height={800} viewBox="-50 -50 100 100">
        <Layout
          size={{ x: 8, y: 8 }}
          flat={true}
          spacing={1.1}
          origin={{ x: 0, y: 0 }}
        >
          {hexArray?.map((hex) => (
            <Hexagon
              data-y={hex.y}
              data-x={hex.x}
              data-z={hex.z}
              data-value={hex.value}
              key={`${hex.x}-${hex.y}-${hex.z}`}
              q={hex.y}
              r={hex.x}
              s={hex.z}
              style={{
                fill: manageColor(hex),
              }}
            >
              <Text
                style={{
                  fill: "white",
                  fontSize: "2px",
                  zIndex: 3,
                }}
              >
                x: {hex.x}
                y: {hex.y}
                z: {hex.z}
              </Text>
              <Text
                style={{
                  fill: "red",
                  fontSize: "4px",
                  transform: "translate(0, -4px)",
                }}
              >
                {hex.value}
              </Text>
            </Hexagon>
          ))}
        </Layout>
      </HexGrid>
    </div>
  );
};

export const App: React.FC = () => {
  return <HexagonGrid />;
};
