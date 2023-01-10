import { useState , useContext} from "react";
import { GridSreenMenu } from "./components/GridSreenMenu";
import HorizentalMenu from "./components/HorizentalMenu";
import { motion } from "framer-motion";
import ErrorPage from "../404/OutOfServices";

import {ClientStatus } from "../context/CientStatus";

const Menu = () => {
  const [showGrid, setShowGrid] = useState(true);
  const isClientActive = useContext(ClientStatus);

  const handleHide = () => {
    setShowGrid(false);
    return showGrid;
  };
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: [0.5, 0.7, 0.9, 1],
        translateY: ["20px", "0px"],
      }}
      className="flex-col md:w-[95vw] md:mx-[2.5vw]  "
    >
      {isClientActive.isActivated ? (
        <>
          <HorizentalMenu />
          <GridSreenMenu handleHide={handleHide} />
        </>
      ) : (
        <ErrorPage />
      )}
    </motion.div>
  );
};

export default Menu;
