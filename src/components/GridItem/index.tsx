import { Hexagon, Text } from "react-hexgrid";
import { HexProps } from "../../App";
import "./style.css";

type GridItemProps = {
  hex: HexProps;
};

export const GridItem = ({ hex }: GridItemProps) => {
  return (
    <Hexagon
      className="grid-item"
      data-y={hex.y}
      data-x={hex.x}
      data-z={hex.z}
      data-value={hex.value}
      key={`${hex.x}-${hex.y}-${hex.z}`}
      q={hex.x}
      s={hex.y}
      r={hex.z}
    >
      <Text
        style={{
          fill: "red",
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
