import React from "react";
import { HexGrid, Hexagon, Layout, Text } from "react-hexgrid";

type HexProps = {
  x: number;
  y: number;
  z: number;
  value: number;
};

const MOCK_HEX_ARRAY: HexProps[] = [
  {
    x: -2,
    y: 0,
    z: 2,
    value: 0,
  },
  {
    x: -2,
    y: 1,
    z: 1,
    value: 0,
  },
  {
    x: -2,
    y: 2,
    z: 0,
    value: 0,
  },
  {
    x: -1,
    y: -1,
    z: 2,
    value: 0,
  },
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
    x: -1,
    y: 2,
    z: -1,
    value: 0,
  },
  {
    x: 0,
    y: -2,
    z: 2,
    value: 2,
  },
  {
    x: 0,
    y: -1,
    z: 1,
    value: 0,
  },
  {
    x: 0,
    y: 0,
    z: 0,
    value: 4,
  },
  {
    x: 0,
    y: 1,
    z: -1,
    value: 2,
  },
  {
    x: 0,
    y: 2,
    z: -2,
    value: 0,
  },
  {
    x: 1,
    y: -2,
    z: 1,
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
    value: 0,
  },
  {
    x: 1,
    y: 1,
    z: -2,
    value: 0,
  },
  {
    x: 2,
    y: -2,
    z: 0,
    value: 0,
  },
  {
    x: 2,
    y: -1,
    z: -1,
    value: 0,
  },
  {
    x: 2,
    y: 0,
    z: -2,
    value: 0,
  },
];

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
const HexagonGrid = () => {
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
    const radius = 4;
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
    fetchHexValue();
  }, []);

  const orderNumberUp = (hexArray: HexProps[]) => {
    let hexArrayCopy = [...hexArray];

    hexArrayCopy.forEach((hex) => {
      const sameY = hexArrayCopy.filter((hex2) => hex2.y === hex.y);
      sameY.forEach((hex2) => {
        if (hex2.value > hex.value && hex2.z < hex.z) {
          const tempZ = hex2.z;
          const tempX = hex2.x;
          hex2.z = hex.z;
          hex2.x = hex.x;
          hex.z = tempZ;
          hex.x = tempX;
        }
      });
    });

    setHexArray(hexArrayCopy);
  };

  React.useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp" || event.key === "w" || event.key === "W") {
        orderNumberUp(hexArray);
      }
    };

    window.addEventListener("keyup", handleKeyUp);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [hexArray]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <button onClick={() => orderNumberUp(hexArray)}>UP</button>
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
              key={`${hex.x}-${hex.y}-${hex.z}`}
              q={hex.y}
              r={hex.x}
              s={hex.z}
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
