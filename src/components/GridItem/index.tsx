import { Hexagon, Text } from "react-hexgrid";
import { HexProps } from "../../App";
import "./style.css";
import { useGridContext } from "../../context/GridContext";

type GridItemProps = {
  hex: HexProps;
};

export const GridItem = ({ hex }: GridItemProps) => {
  const { newHexagons } = useGridContext();
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
      data-newitem={
        newHexagons.some(
          (newHex) =>
            newHex.x === hex.x && newHex.y === hex.y && newHex.z === hex.z
        )
          ? "true"
          : "false"
      }
    >
      <Text className="item-text">{hex.value}</Text>
    </Hexagon>
  );
};
