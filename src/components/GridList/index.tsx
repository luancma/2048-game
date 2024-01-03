import { HexGrid, Layout } from "react-hexgrid";
import { HexProps } from "../../App";
import { GridItem } from "../GridItem";
import { useGridContext } from "../../context/GridContext";

export const GridList = () => {
  const { gridArray } = useGridContext();

  return (
    <HexGrid
      width={"100%"}
      height={"100%"}
      viewBox="-50 -50 100 100"
      style={{
        margin: "2rem",
      }}
    >
      <Layout
        size={{ x: 7, y: 7 }}
        flat={true}
        spacing={1.1}
        origin={{ x: 0, y: 0 }}
      >
        {gridArray?.map((hex: HexProps) => (
          <GridItem key={`${hex.x}-${hex.y}-${hex.z}`} hex={hex} />
        ))}
      </Layout>
    </HexGrid>
  );
};
