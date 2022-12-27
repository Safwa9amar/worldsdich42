import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function MenuItem({
  itemName,
  itemImg,
  itemId,
  handleHide,
  cutting_off,
  cutting_off_status,
}) {
  const [isHover, setisHover] = useState(false);

  const AnimatEnenter = () => {
    setisHover(true);
  };
  const AnimatEnLeave = () => {
    setisHover(false);
  };
  const handleclick = () => {
    handleHide();
  };
  return (
    <Link
      onClick={handleclick}
      to={`/store/menu/category?id=${itemId}`}
      onMouseEnter={AnimatEnenter}
      onMouseLeave={AnimatEnLeave}
      className="relative text-center bg-[#28231B] w-[150px] lg:w-[250px] h-[150px] hover:shadow-sm hover:shadow-gray-600  cursor-pointer p-8 flex flex-col justify-end items-center gap-2 rounded-lg m-4 text-white"
    >
      <img
        className={`w-[100px] h-[80px] lg:w-[200px] lg:h-[150px] translate-y-0 lg:translate-y-8 scale-75 ${
          isHover ? "!-translate-y-1 !scale-90" : ""
        } transition-transform duration-200`}
        src={itemImg}
        alt={itemName}
      />
      <h3 className="lg:text-2xl text-sm tracking-widest capitalize">
        {itemName.toLowerCase()}
      </h3>
      <div className="uppercase lg:text-xl bg-[#5B6D5B] rounded-lg px-6">
        découvrir
      </div>
      {/* add promotion div with good styling using cutting_off cutting_off_status  */}
      {cutting_off_status && (
        <div className="badge badge-accent ">-{cutting_off}% </div>

      )}
      
    </Link>
  );
}
