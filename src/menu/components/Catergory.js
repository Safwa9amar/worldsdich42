import React from "react";
import { useLocation } from "react-router-dom";
import HorizentalMenu from "./HorizentalMenu";
import { CatergoryItem } from "./CatergoryItem";


export default function Catergory() {
  const Location = useLocation();
  console.log(Location.search);
  return (
    <div className="flex-col md:w-[95vw] md:mx-[2.5vw]">
      <HorizentalMenu />
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 my-10 place-items-center ">
        <CatergoryItem />
      </div>
    </div>
  );
}
