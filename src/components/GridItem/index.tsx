import { Hexagon, Text } from "react-hexgrid";
import { HexProps } from "../../App";
import "./style.css";
import { useGridContext } from "../../context/GridContext";

type GridItemProps = {
  hex: HexProps;
};

export const GridItem = ({ hex }: GridItemProps) => {
  const { newHexagons } = useGridContext();
  console.log(newHexagons);
  const itemsBoBeAnimated = newHexagons.some(
    (item) => item.x === hex.x && item.y === hex.y && item.z === hex.z
  );
  return (
    <Hexagon
      className="grid-item"
      key={`${hex.x}-${hex.y}-${hex.z}`}
      data-y={hex.y}
      data-x={hex.x}
      data-z={hex.z}
      data-value={hex.value}
      q={hex.x}
      s={hex.y}
      r={hex.z}
      data-newitem={itemsBoBeAnimated ? "true" : "false"}
    >
      <Text className="item-text">{hex.value}</Text>
    </Hexagon>
  );
};
