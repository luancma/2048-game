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
      <Text className="item-text">{hex.value}</Text>
    </Hexagon>
  );
};
