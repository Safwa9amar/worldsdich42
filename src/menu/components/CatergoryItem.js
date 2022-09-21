import React from "react";
import ReactStars from "react-rating-stars-component";
import { SupplementCard } from "./SupplementCard";
import { BsCartPlusFill } from "react-icons/bs";
import menuImg from "../../images/Menu.png";
import product_bg from "../../images/product_bg.jpg";
import arcticons_manga from "../../icons/arcticons_manga-plus.svg";
function MenuBtn({ price = 2, updatePrice }) {
  const [active, setactive] = React.useState(false);
  const handleClick = () => {
    setactive(!active);
  };
  React.useEffect(() => {
    if (active) updatePrice(price);
    if (!active) updatePrice(0);
  }, [active]);
  return (
    <button
      onClick={handleClick}
      className={`btn btn-sm ${active ? "" : "btn-outline"} btn-success`}
    >
      Menu + {price}€
    </button>
  );
}

export const CatergoryItem = ({
  img,
  header,
  category,
  description,
  rating,
  price,
  toggleModal,
}) => {
  const handleClick = () => {
    alert("cliked");
  };
  const [Price, setPrice] = React.useState(price);
  const [MenuPrice, setMenuPrice] = React.useState(false);
  const [mobileToggleView, setMobileToggleView] = React.useState(false);

  function updatePrice(menuPrice) {
    console.log(MenuPrice);
    setMenuPrice(menuPrice);
  }

  return (
    <>
      <div className="md:hidden relative bg-[#28231B] w-[170px] h-[150px] hover:shadow-sm hover:shadow-gray-600  cursor-pointer p-8 flex flex-col justify-end items-center gap-2 rounded-lg m-6 text-white">
        <img
          className={`w-[100px] h-[150px] translate-y-10 `}
          src={img}
          alt={img}
        />

        <ReactStars
          value={rating?.stars}
          count={5}
          size={20}
          activeColor="#ffd700"
        />
        <h3 className="lg:text-2xl text-md font-bold tracking-widest capitalize">
          {header.toLowerCase()}
        </h3>
        <p className="text-[#5B6D5B] font-bold text-xl">
          €{eval(Math.abs(Price) + MenuPrice)}
        </p>
        <img
          onClick={() => {
            setMobileToggleView(true);
          }}
          className="absolute bottom-4 right-4"
          src={arcticons_manga}
          alt="plus"
        />
      </div>

      <div
        className={`
      ${
        !mobileToggleView
          ? "translate-y-[100%] invisible "
          : "flex translate-y-0 visible	"
      }
      absolute z-[10] bottom-0  md:translate-y-0 
      transition-all duration-300 
      overflow-hidden 
      md:static 
      bg-[#28231B] 
      text-white 
      md:visible
      flex flex-col md:flex-row
      
      items-stretch gap-4 
      md:rounded-lg  md:p-4 w-fit
      
      `}
      >
        <div
          style={{
            backgroundImage: `url(${product_bg})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
          className=" rounded-t-[2.5rem] relative overflow-hidden bg-[#9E9995] md:rounded-md flex items-center justify-center  "
        >
          <svg
            onClick={() => setMobileToggleView(!mobileToggleView)}
            className="absolute w-[50px] h-[50px] rotate-90 top-0 md:hidden"
            viewBox="0 0 46 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.3875 5.2085L13.4167 8.43766L28.6542 25.0002L13.4167 41.5627L16.3875 44.7918L34.5 25.0002L16.3875 5.2085Z"
              fill="#5B6D5B"
            />
          </svg>
          <figure>
            <img className="w-[250px] lg:w-[350px]  " src={img} alt="classic" />
          </figure>
          <figure>
            <img
              className={`
            md:w-[85px] absolute transition-all duration-100
            ${MenuPrice ? "bottom-0" : "-bottom-full"} left-0`}
              src={menuImg}
              alt="classic"
            />
          </figure>
        </div>
        <div className=" flex flex-col  items-start gap-4 p-4 md:p-0">
          <div className="flex justify-between w-full">
            <p className="text-xl">
              {header}
              <sup className="text-[#5B6D5B]">({category})</sup>
            </p>
            <BsCartPlusFill className="w-[30px] h-[30px] cursor-pointer" />
          </div>

          <p className="text-[#888888] text-lg ">{description}</p>
          <p className="flex text-xl font-bold">
            <ReactStars
              value={rating?.stars}
              count={5}
              size={24}
              activeColor="#ffd700"
            />
            <sup className="text-[#5B6D5B]">( {rating?.count} )</sup>
          </p>
          <div className="flex justify-between w-full">
            <div className="flex items-center gap-2">
              <p className="text-[#5B6D5B] font-bold text-xl">
                €{eval(Math.abs(Price) + MenuPrice)}
              </p>
              <MenuBtn updatePrice={updatePrice} />
            </div>
            <button
              onClick={() => toggleModal()}
              className="flex justify-end items-center  cursor-pointer hover:text-[#5B6D5B] "
            >
              <p>OPTIONS</p>
              <svg
                className="w-[50px] h-[25px]"
                viewBox="0 0 46 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.3875 5.2085L13.4167 8.43766L28.6542 25.0002L13.4167 41.5627L16.3875 44.7918L34.5 25.0002L16.3875 5.2085Z"
                  fill="#5B6D5B"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
