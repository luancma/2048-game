import { HexGrid, Hexagon, Layout, Text } from "react-hexgrid";
import { HexProps } from "../App";
import { GridItem } from "./GridItem";

type GridProps = {
  hexArray: HexProps[];
  manageColor: (hex: HexProps) => string | undefined;
};

export const Grid = ({ hexArray, manageColor }: GridProps) => {
  return (
    <HexGrid width={1200} height={800} viewBox="-50 -50 100 100">
      <Layout
        size={{ x: 8, y: 8 }}
        flat={true}
        spacing={1.1}
        origin={{ x: 0, y: 0 }}
      >
        {hexArray?.map((hex) => (
          <GridItem hex={hex} manageColor={manageColor} />
        ))}
      </Layout>
    </HexGrid>
  );
};
