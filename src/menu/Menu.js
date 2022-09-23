import { useState } from "react";
import { GridSreenMenu } from "./components/GridSreenMenu";
import HorizentalMenu from "./components/HorizentalMenu";


const Menu = () => {
  const [showGrid, setShowGrid] = useState(true);
  const handleHide = () => {
    setShowGrid(false)
    console.log(showGrid);
  };
  return (
    <div className="flex-col md:w-[95vw] md:mx-[2.5vw]  ">
      <HorizentalMenu />
      <GridSreenMenu handleHide={handleHide} />
    </div>
  );
};

export default Menu;
