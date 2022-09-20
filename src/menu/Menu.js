import { useState } from "react";
import { Outlet } from "react-router-dom";
import { GridSreenMenu } from "./components/GridSreenMenu";
import HorizentalMenu from "./components/HorizentalMenu";

const Menu = () => {
  const [showGrid, setShowGrid] = useState(true);
  const [Id, setId] = useState();
  const handleHide = () => {
    setShowGrid(false)
  };
  return (
    <div className="flex-col md:w-[95vw] md:mx-[2.5vw]">
      <HorizentalMenu />
      <GridSreenMenu handleHide={handleHide} />
      
    </div>
  );
};

export default Menu;
