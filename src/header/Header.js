import React from "react";
import nav_bg from "../asstes/bg/product.jpg";
import Logo from "../asstes/logo.png";
import burger from "../images/buger.png";
import { MdTopHeader, SmTopHeader } from "./TopHeader";
import { useLocation } from "react-router-dom";
import food_dilevery from "../images/food_dilevery.png";
import food_dilevery2 from "../images/food_dilevery2.png";
export default function Header({ setCartVisisble }) {
  const Location = useLocation();
  const openCart = () => {
    setCartVisisble(true);
  };
  const closeCart = () => {
    setCartVisisble(false);
  };
  React.useEffect(() => {
    if (Location.pathname === "/menu") {
      // console.log(Location);
    }
  }, [Location]);
  return (
    <div
      style={{
        backgroundImage: `url(${nav_bg})`,
        backgroundSize: "cover",
      }}
      className={`w-full md:w-[95vw] md:mx-[2.5vw]
                 md:mt-5 rounded-xl 
                 ${Location.pathname.startsWith("/menu") ? "" : "lg:h-1/2"}`}
    >
      <div className="h-full w-full p-4  text-white ">
        <div className="flex justify-between items-center w-full relative">
          <div className="lg:flex items-center hidden">
            <img className="w-[50px] h-[50px] " src={Logo} alt="logo" />
            <h4 className="text-[#5B6D5B] font-bold m-0">World's Dwich 42</h4>
          </div>
          <MdTopHeader closeCart={closeCart} openCart={openCart} />
          <SmTopHeader closeCart={closeCart} openCart={openCart} />
        </div>
        {!Location.pathname.startsWith("/menu") && (
          <div className="flex justify-between lg:mx-6 w-full lg:mt-4 ">
            {Location.pathname.startsWith("/checkout") && (
              <div className="relative flex items-center justify-center w-full">
                <img
                  className="md:w-[180px] md:h-[80px] h-[50px]  absolute -top-8 right-14 lg:-top-12 lg:right-1/3"
                  src={food_dilevery}
                  alt="food_dilevery"
                />
                <img
                  className="lg:w-[300px] lg:h-[200px] w-[120px] h-[100px] absolute  -bottom-6 -left-4   lg:left-1/4 lg:-bottom-14"
                  src={food_dilevery2}
                  alt="food_dilevery2"
                />
                <div className="hero">
                  <div className="hero-content text-center">
                    <div className="max-w-md">
                      <h1
                        style={{
                          fontFamily: "Rubik Wet Paint, cursive",
                        }}
                        className="text-5xl md:text-8xl font-bold"
                      >
                        checkout
                      </h1>
                      <p className="py-6 ">
                        Sur place , à emporter et en livraison
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!Location.pathname.startsWith("/checkout") && (
              <div className="relative">
                <div className="flex items-center lg:hidden">
                  <img className="w-[40px] h-[40px] " src={Logo} alt="logo" />
                  <h4 className="font-medium m-0">World's Dwich 42</h4>
                </div>
                <p
                  className="ml-5 text-2xl md:text-4xl lg:text-6xl"
                  style={{
                    fontFamily: "Qwigley, cursive",
                  }}
                >
                  Spécaile
                </p>
                <p
                  className="ml-[15vw] text-xl md:text-2xl lg:text-4xl font-bold"
                  style={{
                    fontFamily: "Readex Pro, sans-serif",
                    color: "#5B6D5B",
                  }}
                >
                  Délicieux
                </p>
                <p
                  className="text-3xl md:text-4xl lg:text-6xl ml-10  text-shadow-lg text-shadow-white "
                  style={{
                    fontFamily: "Rubik Wet Paint, cursive",
                    textShadow: "40px 30px 30px #FFFFFF45",
                  }}
                >
                  Burger
                </p>
                <p className="text-xs lg:text-lg hidden lg:block ml-20 mt-5">
                  Sur place , à emporter et en livraison
                </p>
              </div>
            )}
            {!Location.pathname.startsWith("/checkout") && (
              <div className="w-1/2 lg:w-1/4">
                <img className="w-full h-full" src={burger} alt="burger" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
