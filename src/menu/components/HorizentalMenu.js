import React from "react";
import { HorizentalMenuData } from "../icons/data";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link, useLocation } from "react-router-dom";
import { Categories } from "../../context/categorycontext";
// import ALl from "../icons/all.svg";
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
const MenuItem = ({ icon, text, id, Length, setActiveItem }) => {
  let { search } = useLocation();
  let categoryId = Math.abs(search.replace(/^\D+/g, ""));

  return (
    <Link
      href="/menu"
      to={`/menu/category?id=${id}`}
      className={` flex items-center  flex-1 gap-2 w-full badge !p-4 !hover:shadow-xl hover:bg-accent-focus hover:text-white  ${
        categoryId === id ? "badge-accent text-white" : ""
      } `}
    >
      <img className={`w-[25px] h-[35px]   `} src={icon} alt={text} />
      <p className="hidden md:block text-md md:text-lg capitalize w-full">
        {text} {Length ? `(${Length})` : ""}
      </p>
    </Link>
  );
};

const HorizentalMenu = () => {
  const categories = React.useContext(Categories);
  // const dataLength = categories.map((el) => el.list.length).reduce((a, b) => a + b, 0);
  return (
    <div className="sticky top-0  z-50">
      <Carousel
        keyBoardControl={true}
        containerClass="w-full  py-4 md:p-6 md:my-6 bg-[#272935] shadow-lg shadow-gray-800"
        responsive={responsive}
        itemClass={`!w-max mx-2 `}
      >
        {/* <MenuItem  key={300} id={"All"} text={`Tout (${dataLength})`} icon={ALl} /> */}

        {categories.map((el) => (
          <MenuItem
            key={el.id}
            id={el.id}
            icon={el.icon}
            text={el.name}
            Length={el.list.length}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default HorizentalMenu;
