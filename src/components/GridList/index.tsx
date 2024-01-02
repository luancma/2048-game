import { HexGrid, Layout } from "react-hexgrid";
import { HexProps } from "../../App";
import { GridItem } from "../GridItem";

type GridProps = {
  hexArray: HexProps[];
};

export const GridList = ({ hexArray }: GridProps) => {
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
       {
         hexArray?.map((hex: HexProps) => <GridItem hex={hex} />)
       }
      </Layout>
    </HexGrid>
  );
};
