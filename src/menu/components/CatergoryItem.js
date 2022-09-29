import React, { useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { BsCartPlusFill } from "react-icons/bs";
import { BsCartCheckFill } from "react-icons/bs";
import menuImg from "../../images/Menu.png";
import product_bg from "../../images/product_bg.jpg";
import arcticons_manga from "../../icons/arcticons_manga-plus.svg";
import { Cartstorage } from "../../context/LocalStorageContext";


function MenuBtn({
  price = 2,
  updatePrice,
  ToggleCart,
  isStoredInLocalStorage,
}) {
  const [active, setactive] = React.useState(false);
  const handleClick = () => {
    setactive(!active);
  };
  React.useEffect(() => {
    if (active) updatePrice(price);
    if (!active) updatePrice(0);
  }, [active, price, updatePrice]);
  return (
    <button
      onClick={handleClick}
      className={`
      btn btn-sm 
      ${active ? "" : "btn-outline"}
      ${
        ToggleCart || isStoredInLocalStorage
          ? "pointer-events-none text-gray-600 "
          : ""
      }
       btn-success`}
    >
      Menu + {price}€
    </button>
  );
}

export const CatergoryItem = (props) => {
  const {
    img,
    header,
    category,
    category_ID,
    description,
    rating,
    price,
    toggleModal,
    id,
    reciveOptionclick,
    handleAddToCart,
    isDeletetedFromTocart,
    hybrid_idFroDeletion,
    getCartBoudaries
  } = props;
  //
  const [Price] = React.useState(price);
  //
  const [MenuPrice, setMenuPrice] = React.useState(false);
  //
  const [mobileToggleView, setMobileToggleView] = React.useState(false);
  //
  const [ToggleCart, setToggleCart] = React.useState(false);

  //
  const MyCartstorage = React.useContext(Cartstorage);
  useEffect(() => {
    JSON.parse(MyCartstorage).map(
      (el) => el.hybrid_id === `${id}_${category_ID}` && setToggleCart(true)
    );
  });
  function updatePrice(menuPrice) {
    setMenuPrice(menuPrice);
  }
  //
  const addToCart = () => {
    handleAddToCart({
      id: id,
      isMenu: MenuPrice ? true : false,
    });
    setToggleCart(true);
     console.log(getCartBoudaries.getBoundingClientRect());

  };

  //
  const handleOptionclick = () => {
    toggleModal();
    reciveOptionclick(id);
  };

  //

  useEffect(() => {
    hybrid_idFroDeletion === `${id}_${category_ID}` && setToggleCart(false);
  }, [isDeletetedFromTocart, hybrid_idFroDeletion, id, category_ID]);

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
          €{Math.abs(Price) + Math.abs(MenuPrice)}
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
          <div className="flex justify-between  w-full">
            <p className="text-xl flex items-center gap-2  ">
              {header}
              <sup className="text-[#5B6D5B]">({category})</sup>
            </p>

            <BsCartCheckFill
              className={`
                w-[30px] h-[30px]
                transition-all duration-300
                ${
                  !ToggleCart
                    ? "scale-0 invisible"
                    : "scale-1 visible fill-warning"
                }
                `}
            />

            <button
              onClick={addToCart}
              className={`${ToggleCart ? "hidden" : ""} cursor-pointer`}
            >
              <BsCartPlusFill className={`w-[30px] h-[30px]`} />
            </button>
          </div>

          <p className="text-[#888888] text-lg">
            {description
              .map((el) => el.recip + ", ")
              .toString()
              .slice(0, 100)}
            ...
          </p>
          <div className="flex text-xl font-bold">
            <ReactStars
              value={rating?.stars}
              count={5}
              size={24}
              activeColor="#ffd700"
            />
            <sup className="text-[#5B6D5B]">( {rating?.count} )</sup>
          </div>
          <div className="flex justify-between gap-10 w-full">
            <div className="flex items-center gap-2">
              <p className="text-[#5B6D5B] font-bold text-xl">
                €{Math.abs(Price) + Math.abs(MenuPrice)}
              </p>
              <MenuBtn updatePrice={updatePrice} ToggleCart={ToggleCart} />
            </div>
            <button
              onClick={handleOptionclick}
              className={`${
                ToggleCart ? "pointer-events-none text-gray-600" : ""
              } flex justify-end items-center  cursor-pointer hover:text-[#5B6D5B] `}
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
