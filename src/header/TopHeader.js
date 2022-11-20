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

const CartIndicator = ({ openCart, handleCartBoudries }) => {
  const CartStorage = JSON.parse(useContext(Cartstorage));

  const handleLoad = (e) => {
    handleCartBoudries(e.target);
    // console.log(e.target.getBoundingClientRect());
  };
  return (
    <button onClick={openCart} className="lg:relative" onLoad={handleLoad}>
      <p className="absolute bottom-10 right-0 bg-[#5B6D5B] w-5 h-5 rounded-full text-sm ">
        {CartStorage?.length || 0}
      </p>
      <img className="w-[40px] h-[40px]" src={CartIcon} alt="cart" />
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
      <ul className="flex items-center gap-3 list-none text-xl">
        <NavigationsLinks />
        <li>
          <CartIndicator
            openCart={openCart}
            isAdedTocart={isAdedTocart}
            isDeletetedFromTocart={isDeletetedFromTocart}
            handleCartBoudries={handleCartBoudries}
          />
        </li>
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
          // style={{
          //   backgroundImage: `url(${nav_bg})`,
          //   backgroundSize: "100% 100%",
          // }}
          className={`bg-red-400 fixed z-[9999999] ${
            isVisible ? "" : "opacity-0 pointer-events-none"
          } transition-opacity duration-300 h-screen w-screen z-50 top-0 left-0
          text-4xl text-center overflow-hidden
        `}
        >
          <div className="w-full h-full bg-[#603601] opacity-70 absolute z-10"></div>
          <div className="absolute w-full h-full z-20 flex justify-center items-center">
            <ul className="grid grid-rows-4 gap-8">
              <NavigationsLinks setisVisible={setisVisible} />
            </ul>
          </div>
        </div>
        <div>
          <li>
            <CartIndicator
              openCart={openCart}
              isAdedTocart={isAdedTocart}
              isDeletetedFromTocart={isDeletetedFromTocart}
              handleCartBoudries={handleCartBoudries}
            />
          </li>
        </div>
      </div>
    </div>
  );
};
