import React from "react";
import { MoveHexagonsDown } from "../features/phase-1/MoveHexagonsDown";
import { MoveHexagonsTop } from "../features/phase-1/MoveHexagonsTop";
import { MoveHexagonsBottomLeft } from "../features/phase-1/BottomLeft/MoveHexagonsBottomLeft";
import { Grid } from "../components/Grid";
import { mockHexagonalArrayRadius2 } from "../mocks/hexagonalArray";
import { HandleTopRight } from "../features/phase-1/TopRight/HandleTopRight";
import { SharedTopMovements } from "../features/phase-1/SharedTopMovements";

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
    const radius = 2;
    const hexagonalArray = useMock
      ? mockHexagonalArrayRadius2
      : generateHexagonalArray(radius);
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
      setHexArray(hexagonalArray);
    } else {
      fetchHexValue();
    }
  }, []);

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
      if (event.key === "w" || event.key === "W") {
        const handleMovement = new MoveHexagonsTop();
        const newList = handleMovement.execute(hexArray);
        setHexArray(newList);
        if (!useMock) getNewServerList();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "s" || event.key === "S") {
        const handleMoveDown = new MoveHexagonsDown();
        const newList = handleMoveDown.execute(hexArray);
        setHexArray(newList);
        if (!useMock) getNewServerList();
      }
    };

    const handleKeyboardBottomLeft = (event: KeyboardEvent) => {
      if (event.key === "a" || event.key === "A") {
        const handleMoveDown = new MoveHexagonsBottomLeft();
        const newList = handleMoveDown.execute(hexArray);
        newList.forEach((hex) => {
          hex.hasMerged = false;
        });
        setHexArray(newList);
        if (!useMock) getNewServerList();
      }
    };

    const handleKeyboardTopRight = (event: KeyboardEvent) => {
      if (event.key === "e" || event.key === "E") {
        const handleMoveDown = new SharedTopMovements("x", "z");
        const newList = handleMoveDown.execute(hexArray);
        newList.forEach((hex) => {
          hex.hasMerged = false;
        });
        setHexArray(newList);
        if (!useMock) getNewServerList();
      }
    };

    const handleKeyboardTopLeft = (event: KeyboardEvent) => {
      if (event.key === "q" || event.key === "Q") {
        const handleMoveDown = new SharedTopMovements("y", "x");
        const newList = handleMoveDown.execute(hexArray);
        console.log(newList.filter((hex) => hex.x === -1));
        newList.forEach((hex) => {
          hex.hasMerged = false;
        });
        setHexArray(newList);
        if (!useMock) getNewServerList();
      }
    };

    const handleKeyboardBottomRight = (event: KeyboardEvent) => {
      if (event.key === "d" || event.key === "D") {
        const handleMoveDown = new SharedTopMovements("z", "x");
        const newList = handleMoveDown.execute(hexArray);
        console.log(newList.filter((hex) => hex.x === -1));
        newList.forEach((hex) => {
          hex.hasMerged = false;
        });
        setHexArray(newList);
        if (!useMock) getNewServerList();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keydown", handleKeyboardBottomLeft);
    window.addEventListener("keydown", handleKeyboardTopLeft);
    window.addEventListener("keydown", handleKeyboardTopRight);
    window.addEventListener("keydown", handleKeyboardBottomRight);
    window.addEventListener("keydown", handleKeyUp);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyUp);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keydown", handleKeyboardTopLeft);
      window.removeEventListener("keydown", handleKeyboardBottomLeft);
      window.removeEventListener("keydown", handleKeyboardBottomRight);
      window.removeEventListener("keydown", handleKeyboardTopRight);
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
      <Grid hexArray={hexArray} manageColor={manageColor} />
    </div>
  );
};

export const App: React.FC = () => {
  return <HexagonGrid />;
};
