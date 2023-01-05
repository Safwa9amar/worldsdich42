import { Link } from "react-router-dom";
import CartIcon from "../icons/cart.svg";
import menuHumberger from "../icons/menuHumberger.svg";
import { useState, useContext } from "react";
// import nav_bg from "../images/nav_bg.jpg";
import CloseIco from "../icons/close.svg";
import { useLocation } from "react-router-dom";
import React from "react";
import { Cartstorage } from "../context/LocalStorageContext";

// import { BiQrScan } from "react-icons/bi";
export const NavigationsLinks = ({ setisVisible }) => {
  let location = useLocation();
  let activeClass = "text-[#FFC700] transition-all duration-300 ";

  const handleClick = (e) => {
    try {
      setisVisible(false);
    } catch (error) {
      return false;
    }
  };
  return (
    <>
      <li onClick={handleClick}>
        <Link
          className={`no-underline ${
            location.pathname === "/store/" ? activeClass : ""
          }`}
          to="/store/"
        >
          Accueil
        </Link>
      </li>
      <li onClick={handleClick}>
        <Link
          className={`no-underline ${
            location.pathname.startsWith("/store/menu") ? activeClass : ""
          }`}
          to="store/menu"
        >
          Menu
        </Link>
      </li>
      <li onClick={handleClick}>
        <Link
          className={`no-underline ${
            location.pathname.startsWith("/store/contact") ? activeClass : ""
          }`}
          to="store/contact"
        >
          Contact
        </Link>
      </li>
      {/* <li>
        <BiQrScan />
        <Link
          onClick={() => setisVisible(false)}
          className="no-underlin"
          to="contact"
        ></Link>
        Menu Scanner
      </li> */}
    </>
  );
};

export const CartIndicator = ({ openCart, handleCartBoudries, className }) => {
  const CartStorage = JSON.parse(useContext(Cartstorage));
  const Location = useLocation();
  const handleLoad = (e) => {
    handleCartBoudries(e.target);
    // console.log(e.target.getBoundingClientRect());
  };
  return (
    <button onClick={openCart} className={className} onLoad={handleLoad}>
      <p className="absolute bottom-10 right-0 bg-[#5B6D5B] w-5 h-5 rounded-full text-sm ">
        {CartStorage?.length || 0}
      </p>

      <svg
        width="42"
        height="36"
        viewBox="0 0 42 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={
          Location.pathname.startsWith("/store/checkout")
            ? `stroke-accent fill-accent `
            : `stroke-current`
        }
      >
        <path
          d="M34.0131 9.07407H5.78598C5.21403 9.07409 4.64843 9.18253 4.12564 9.39241C3.60285 9.60229 3.13447 9.90894 2.7507 10.2926C2.36692 10.6763 2.07626 11.1284 1.89747 11.6199C1.71867 12.1115 1.65569 12.6314 1.7126 13.1463L2.94076 24.2574C3.04177 25.1713 3.51452 26.0186 4.26723 26.635C5.01995 27.2513 5.99893 27.5925 7.01413 27.5926H26.5623C27.509 27.5929 28.4266 27.2964 29.1589 26.7534C29.8911 26.2105 30.3928 25.4547 30.5783 24.6148L34.0131 9.07407Z"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M34.0131 9.07406L35.6711 3.06851C35.782 2.66805 36.0376 2.3126 36.3973 2.05861C36.757 1.80462 37.2003 1.66667 37.6566 1.66666H40.1538M27.8723 35H23.7785M11.4969 35H7.40306"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export const MdTopHeader = ({
  openCart,
  isAdedTocart,
  isDeletetedFromTocart,
  handleCartBoudries,
}) => {
  return (
    <div className="hidden lg:block lg:mx-4">
      <ul className="flex items-center gap-10 list-none text-2xl">
        <NavigationsLinks />
        {/* <li>
          <CartIndicator
            openCart={openCart}
            isAdedTocart={isAdedTocart}
            isDeletetedFromTocart={isDeletetedFromTocart}
            handleCartBoudries={handleCartBoudries}
          />
        </li> */}
      </ul>
    </div>
  );
};

export const SmTopHeader = ({
  openCart,
  closeCart,
  isAdedTocart,
  isDeletetedFromTocart,
  handleCartBoudries,
}) => {
  const [isVisible, setisVisible] = useState(false);
  const handleClick = () => {
    setisVisible(!isVisible);
    closeCart();
  };
  return (
    <div className="lg:hidden w-full">
      <div className=" flex justify-between w-full  gap-3 list-none mt-2 ">
        {isVisible && (
          <button
            className="absolute top-5 left-5 z-[999990999]"
            onClick={handleClick}
          >
            <img className="w-[25px]" src={CloseIco} alt="close" />
          </button>
        )}
        <button className="w-[40px] h-[40px]" onClick={handleClick}>
          <img className="w-full h-full" src={menuHumberger} alt="menu" />
        </button>
        <div
          className={`bg-[#121618fb] fixed z-[9999999] ${
            isVisible ? "" : "opacity-0 pointer-events-none"
          } transition-opacity duration-150 h-screen w-screen z-50 top-0 left-0
          text-4xl text-center overflow-hidden
        `}
        >
          <div className="w-full h-full  opacity-70 absolute z-10"></div>
          <div className="absolute w-full h-full z-20 flex justify-center items-center">
            <ul className="grid grid-rows-4 gap-8">
              <NavigationsLinks setisVisible={setisVisible} />
            </ul>
          </div>
        </div>
        <div className="relative">
          <li>
            <CartIndicator
              openCart={openCart}
              isAdedTocart={isAdedTocart}
              isDeletetedFromTocart={isDeletetedFromTocart}
              handleCartBoudries={handleCartBoudries}
              className={"lg:relative "}
            />
          </li>
        </div>
      </div>
    </div>
  );
};
