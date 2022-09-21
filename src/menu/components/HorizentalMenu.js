import React from "react";
import { HorizentalMenuData } from "../icons/data";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: HorizentalMenuData.length,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: HorizentalMenuData.length,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
  },
};
const MenuItem = ({ icon, text, isActive }) => {
  const color = isActive ? "[#5B6D5B]" : "white";
  return (
    <a
      href="/menu"
      className={`flex items-center flex-1 gap-2 text-${color} ${
        isActive ? "font-bold shadow-md shadow-[#5B6D5B] " : ""
      }`}
    >
      <img
        className={`w-[25px] h-[35px] fill-${color} `}
        src={icon}
        alt={text}
      />
      <p className="text-md md:text-lg capitalize">{text}</p>
    </a>
  );
};

const HorizentalMenu = () => {
  return (
    <div className="sticky top-0 z-50 bg-[#1E1E1E]">
      <Carousel
        containerClass="w-full   md:bg-[#1E1E1E] py-4 md:p-6 md:my-6 border-b-2 border-b-[#5B6D5B]"
        responsive={responsive}
      >
        {HorizentalMenuData.map((el) => (
          <MenuItem icon={el.icon} text={el.text} />
        ))}
      </Carousel>
    </div>
  );
};

export default HorizentalMenu;
