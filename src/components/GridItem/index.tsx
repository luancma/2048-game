import { Hexagon, Text } from "react-hexgrid";
import { HexProps } from "../../App";

type GridItemProps = {
  hex: HexProps;
  manageColor: (hex: HexProps) => string | undefined;
};

export const GridItem = ({ hex, manageColor }: GridItemProps) => {
  return (
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
  );
};
