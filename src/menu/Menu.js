import { GridSreenMenu } from "./components/GridSreenMenu";
import HorizentalMenu from "./components/HorizentalMenu";


const Menu = () => {
  
  return (
    <div className="flex-col md:w-[95vw] md:mx-[2.5vw]">
      <HorizentalMenu />
      <GridSreenMenu  />
    </div>
  );
};

export default Menu;
