import React from "react";
import { HexGrid, Hexagon, Layout, Text } from "react-hexgrid";

export type HexProps = {
  x: number;
  y: number;
  z: number;
  value: number;
  hasMerged?: boolean;
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
  let newBoard = [...obj];
  const leftColumn = newBoard.filter((hex) => hex.y === -1);
  const rightColumn = newBoard.filter((hex) => hex.y === 1);
  const middleColumn = newBoard.filter((hex) => hex.y === 0);

  const middleColumnSorted = middleColumn.sort((a, b) => {
    return a.x - b.x;
  });

  const handleMiddleColumn = (arr: HexProps[]) => {
    for (let i = arr.length - 1; i >= 0; i--) {
      if (
        arr[i]?.value === 0 &&
        arr[i - 1] &&
        arr[i - (arr.length - 1)] &&
        arr[i - (arr.length - 1)].value > 0 &&
        arr[i - 1].value === 0
      ) {
        arr[i].value = arr[i - 2].value;
        arr[i - 2].value = 0;
      }
      if (arr[i]?.value === 0 && arr[i - 1]) {
        arr[i].value = arr[i - 1].value;
        arr[i - 1].value = 0;
      }

      if (arr[i].value === arr[i - 1]?.value && arr[i].value > 0) {
        arr[i].value *= 2;
        arr[i - 1].value = 0;
      }
    }
  };

  handleMiddleColumn(middleColumnSorted);
  handleMiddleColumn(leftColumn);
  handleMiddleColumn(rightColumn);

  newBoard = [...leftColumn, ...middleColumnSorted, ...rightColumn];

  return newBoard;
}

export function testingMoveElementsToTop(obj: HexProps[]) {
  let newBoard = [...obj];
  const leftColumn = newBoard.filter((hex) => hex.y === -1);
  const rightColumn = newBoard.filter((hex) => hex.y === 1);
  const middleColumn = newBoard.filter((hex) => hex.y === 0);

  const middleColumnSorted = middleColumn.sort((a, b) => {
    return a.x - b.x;
  });

  const handleMiddleColumn = (arr: HexProps[]) => {
    if (arr.some((hex) => hex.value > 0)) {
      for (let i = 0; i <= arr.length - 1; i++) {
        if (
          arr[i]?.value === 0 &&
          arr[i + 1] &&
          arr[i + 1].value === 0 &&
          arr[i + 2] &&
          arr[i + 2].value > 0
        ) {
          arr[i].value = arr[i + 2].value;
          arr[i + 2].value = 0;
        }

        if (arr[i].value === 0 && arr[i + 1]) {
          arr[i].value = arr[i + 1].value;
          arr[i + 1].value = 0;
        }

        if (arr[i].value === arr[i + 1]?.value && arr[i].value > 0) {
          arr[i].value *= 2;
          arr[i + 1].value = 0;
        }
      }
    }
  };

  handleMiddleColumn(middleColumnSorted);
  handleMiddleColumn(leftColumn);
  handleMiddleColumn(rightColumn);

  newBoard = [...leftColumn, ...middleColumnSorted, ...rightColumn];

  return newBoard;
}

const HexagonGrid = () => {
  const useMock = false;
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
          value: 0,
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
          value: 0,
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
          value: 2,
        },
        {
          x: 1,
          y: 0,
          z: -1,
          value: 8,
        },
      ]);
    } else {
      fetchHexValue();
    }
  }, []);

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
        const newList = testingMoveElementsToTop(hexArray);
        setHexArray(newList);
        if (!useMock) getNewServerList();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" || event.key === "s" || event.key === "S") {
        const newList = testingClickDown(hexArray);
        setHexArray(newList);
        if (!useMock) getNewServerList();
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
