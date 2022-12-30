import React from "react";
import { HorizentalMenuData } from "../icons/data";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link, useLocation } from "react-router-dom";
import { Categories } from "../../context/categorycontext";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: HorizentalMenuData.length,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 7,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};
const MenuItem = ({ icon, text, isActive, id }) => {
  let { search } = useLocation();
  let categoryId = Math.abs(search.replace(/^\D+/g, ""));
  const color = categoryId === id ? "[#5B6D5B]" : "white";

  return (
    <Link
      href="/store/menu"
      to={`/store/menu/category?id=${id}`}
      className={` flex items-center  flex-1 gap-2 w-full text-${color} ${
        isActive ? "font-bold shadow-md shadow-[#5B6D5B] " : ""
      }`}
    >
      <img
        className={`w-[25px] h-[35px] fill-${color} `}
        src={icon}
        alt={text}
      />
      <p className="text-md md:text-lg capitalize w-full">{text}</p>
    </Link>
  );
};

const HorizentalMenu = () => {
  const categories = React.useContext(Categories);

  return (
    <div className="sticky top-0  z-50">
      <Carousel
        keyBoardControl={true}
        containerClass="w-full  py-4 md:p-6 md:my-6 bg-[#272935] shadow-lg shadow-gray-800"
        responsive={responsive}
        itemClass="!w-max badge !p-4 !mx-2 !hover:shadow-xl bg-[#28231B]"
      >
        {categories.map((el) => (
          <MenuItem  key={el.id} id={el.id} icon={el.icon} text={el.name} />
        ))}
      </Carousel>
    </div>
  );
};

export default HorizentalMenu;
