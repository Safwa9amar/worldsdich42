import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
    <div className="relative m-4">
      <Link
        onClick={handleclick}
        to={`/store/menu/category?id=${itemId}`}
        onMouseEnter={AnimatEnenter}
        onMouseLeave={AnimatEnLeave}
        className={`
        ${cutting_off_status ? 'rounded-br-[60%]' : '' }
        relative text-center bg-[#28231B] w-[150px] lg:w-[250px] h-[150px] hover:shadow-sm hover:shadow-gray-600  cursor-pointer p-8 flex flex-col justify-end items-center gap-2 rounded-lg text-white
        `}
      >
        <LazyLoadImage
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
      </Link>

      {cutting_off_status && (
        <div className="badge badge-info absolute right-0 top-0 -z-[1] h-full w-full ">
          <p className=" absolute right-2 bottom-1 text-md lg:text-xl">
          -{cutting_off}% 

          </p>
          </div>
      )}
    </div>
  );
}
