import React, { Component } from "react";
import nav_bg from "../asstes/bg/product.jpg";
import Logo from "../asstes/logo.png";
import burger from "../images/buger.png";
import { MdTopHeader, SmTopHeader } from "./TopHeader";



export default function Header({ setCartVisisble }) {
  const openCart = ()=>{
    setCartVisisble(true)
  }
  const closeCart = ()=>{
    setCartVisisble(false)
  }
  return (
    <div
      style={{
        backgroundImage: `url(${nav_bg})`,
        backgroundSize: "100% 100%",
      }}
      className="w-full md:w-[95vw] md:mx-[2.5vw]
                 md:mt-5 rounded-xl 
                 lg:h-1/2
                 "
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
        <div className="flex justify-between lg:mx-6 w-full lg:mt-4 ">
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
          <div className="w-1/2 lg:w-1/3">
            <img className="w-full h-full" src={burger} alt="burger" />
          </div>
        </div>
      </div>
      {/* <div className="bg-[#603601] absolute top-0 left-0 z-10 opacity-40 w-full h-full rounded-xl"></div> */}
    </div>
  );
}
