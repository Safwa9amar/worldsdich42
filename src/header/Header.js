import React from "react";
// import nav_bg from "../asstes/bg/header.png";
import Logo from "../asstes/logo.png";
// import burger from "../images/buger.png";
import { CartIndicator, MdTopHeader, SmTopHeader } from "./TopHeader";
import { Link, useLocation } from "react-router-dom";
// import food_dilevery from "../images/food_dilevery.png";
// import food_dilevery2 from "../images/food_dilevery2.png";
import { motion } from "framer-motion";

// import botiqueFronImg from "../asstes/botiqueFronImg.jpg";

export default function Header({
  setCartVisisble,
  isAdedTocart,
  isDeletetedFromTocart,
  handleCartBoudries,
  locations,
}) {
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
  // return (
  //   <div className="hero w-screen h-1/2" style={{ backgroundImage: `url(${botiqueFronImg})`, backgroundSize:"100% 100%" }}>
  //   <div className="hero-overlay bg-opacity-60"></div>
  //   <div className="hero-content text-center text-neutral-content">
  //     <div className="">
  //     <div className="flex justify-between items-center w-full relative">
  //         <MdTopHeader
  //           cartElementCount={5}
  //           closeCart={closeCart}
  //           openCart={openCart}
  //           isAdedTocart={isAdedTocart}
  //           isDeletetedFromTocart={isDeletetedFromTocart}
  //           handleCartBoudries={handleCartBoudries}
  //         />
  //         <SmTopHeader
  //           closeCart={closeCart}
  //           openCart={openCart}
  //           isAdedTocart={isAdedTocart}
  //           isDeletetedFromTocart={isDeletetedFromTocart}
  //           handleCartBoudries={handleCartBoudries}
  //         />
  //       </div>
  //     </div>
  //   </div>
  // </div>
  // );

  return (
    <div className="transition-all  w-full rounded-xl">
      <div className="h-full w-full text-white flex flex-col gap-4 items-center ">
        <div className="flex justify-between items-center w-full md:w-5/6 relative m-10  ">
          <Link to={"/"} className="lg:flex items-center hidden">
            <img className="w-[50px] h-[50px] " src={Logo} alt="logo" />
            <h4 className="text-white m-0 text-xl font-DancingScript font-bold">
              World's Dwich 42
            </h4>
          </Link>
          <Link
            to="/profile"
            className="btn btn-ghost btn-circle avatar md:hidden "
          >
            <div className="w-10 rounded-full">
              <svg
                className={
                  Location.pathname.startsWith("/profile")
                    ? `stroke-accent fill-accent `
                    : `stroke-current fill-current `
                }
                width="40"
                height="40"
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.75016 28.5002C11.1668 27.4168 12.7502 26.5624 14.5002 25.9368C16.2502 25.3124 18.0835 25.0002 20.0002 25.0002C21.9168 25.0002 23.7502 25.3124 25.5002 25.9368C27.2502 26.5624 28.8335 27.4168 30.2502 28.5002C31.2224 27.3613 31.9796 26.0696 32.5218 24.6252C33.063 23.1807 33.3335 21.6391 33.3335 20.0002C33.3335 16.3057 32.0352 13.1596 29.4385 10.5618C26.8407 7.96516 23.6946 6.66683 20.0002 6.66683C16.3057 6.66683 13.1602 7.96516 10.5635 10.5618C7.96572 13.1596 6.66683 16.3057 6.66683 20.0002C6.66683 21.6391 6.93794 23.1807 7.48016 24.6252C8.02128 26.0696 8.77794 27.3613 9.75016 28.5002ZM20.0002 21.6668C18.3613 21.6668 16.9791 21.1046 15.8535 19.9802C14.7291 18.8546 14.1668 17.4724 14.1668 15.8335C14.1668 14.1946 14.7291 12.8124 15.8535 11.6868C16.9791 10.5624 18.3613 10.0002 20.0002 10.0002C21.6391 10.0002 23.0213 10.5624 24.1468 11.6868C25.2713 12.8124 25.8335 14.1946 25.8335 15.8335C25.8335 17.4724 25.2713 18.8546 24.1468 19.9802C23.0213 21.1046 21.6391 21.6668 20.0002 21.6668ZM20.0002 36.6668C17.6946 36.6668 15.5279 36.2291 13.5002 35.3535C11.4724 34.4791 9.7085 33.2918 8.2085 31.7918C6.7085 30.2918 5.52127 28.5279 4.64683 26.5002C3.77127 24.4724 3.3335 22.3057 3.3335 20.0002C3.3335 17.6946 3.77127 15.5279 4.64683 13.5002C5.52127 11.4724 6.7085 9.7085 8.2085 8.2085C9.7085 6.7085 11.4724 5.52072 13.5002 4.64516C15.5279 3.77072 17.6946 3.3335 20.0002 3.3335C22.3057 3.3335 24.4724 3.77072 26.5002 4.64516C28.5279 5.52072 30.2918 6.7085 31.7918 8.2085C33.2918 9.7085 34.4791 11.4724 35.3535 13.5002C36.2291 15.5279 36.6668 17.6946 36.6668 20.0002C36.6668 22.3057 36.2291 24.4724 35.3535 26.5002C34.4791 28.5279 33.2918 30.2918 31.7918 31.7918C30.2918 33.2918 28.5279 34.4791 26.5002 35.3535C24.4724 36.2291 22.3057 36.6668 20.0002 36.6668Z" />
              </svg>
            </div>
          </Link>
          <MdTopHeader
            cartElementCount={5}
            closeCart={closeCart}
            openCart={openCart}
            isAdedTocart={isAdedTocart}
            isDeletetedFromTocart={isDeletetedFromTocart}
            handleCartBoudries={handleCartBoudries}
          />
          <SmTopHeader
            closeCart={closeCart}
            openCart={openCart}
            isAdedTocart={isAdedTocart}
            isDeletetedFromTocart={isDeletetedFromTocart}
            handleCartBoudries={handleCartBoudries}
          />
          <div className="flex items-center gap-2">
            <Link
              to="/profile"
              className="btn btn-ghost btn-circle avatar hidden md:block "
            >
              <div className="w-10 rounded-full">
                <svg
                  className={
                    Location.pathname.startsWith("/profile")
                      ? `stroke-accent fill-accent `
                      : `stroke-current fill-current `
                  }
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.75016 28.5002C11.1668 27.4168 12.7502 26.5624 14.5002 25.9368C16.2502 25.3124 18.0835 25.0002 20.0002 25.0002C21.9168 25.0002 23.7502 25.3124 25.5002 25.9368C27.2502 26.5624 28.8335 27.4168 30.2502 28.5002C31.2224 27.3613 31.9796 26.0696 32.5218 24.6252C33.063 23.1807 33.3335 21.6391 33.3335 20.0002C33.3335 16.3057 32.0352 13.1596 29.4385 10.5618C26.8407 7.96516 23.6946 6.66683 20.0002 6.66683C16.3057 6.66683 13.1602 7.96516 10.5635 10.5618C7.96572 13.1596 6.66683 16.3057 6.66683 20.0002C6.66683 21.6391 6.93794 23.1807 7.48016 24.6252C8.02128 26.0696 8.77794 27.3613 9.75016 28.5002ZM20.0002 21.6668C18.3613 21.6668 16.9791 21.1046 15.8535 19.9802C14.7291 18.8546 14.1668 17.4724 14.1668 15.8335C14.1668 14.1946 14.7291 12.8124 15.8535 11.6868C16.9791 10.5624 18.3613 10.0002 20.0002 10.0002C21.6391 10.0002 23.0213 10.5624 24.1468 11.6868C25.2713 12.8124 25.8335 14.1946 25.8335 15.8335C25.8335 17.4724 25.2713 18.8546 24.1468 19.9802C23.0213 21.1046 21.6391 21.6668 20.0002 21.6668ZM20.0002 36.6668C17.6946 36.6668 15.5279 36.2291 13.5002 35.3535C11.4724 34.4791 9.7085 33.2918 8.2085 31.7918C6.7085 30.2918 5.52127 28.5279 4.64683 26.5002C3.77127 24.4724 3.3335 22.3057 3.3335 20.0002C3.3335 17.6946 3.77127 15.5279 4.64683 13.5002C5.52127 11.4724 6.7085 9.7085 8.2085 8.2085C9.7085 6.7085 11.4724 5.52072 13.5002 4.64516C15.5279 3.77072 17.6946 3.3335 20.0002 3.3335C22.3057 3.3335 24.4724 3.77072 26.5002 4.64516C28.5279 5.52072 30.2918 6.7085 31.7918 8.2085C33.2918 9.7085 34.4791 11.4724 35.3535 13.5002C36.2291 15.5279 36.6668 17.6946 36.6668 20.0002C36.6668 22.3057 36.2291 24.4724 35.3535 26.5002C34.4791 28.5279 33.2918 30.2918 31.7918 31.7918C30.2918 33.2918 28.5279 34.4791 26.5002 35.3535C24.4724 36.2291 22.3057 36.6668 20.0002 36.6668Z" />
                </svg>
              </div>
            </Link>
            <CartIndicator
              openCart={openCart}
              isAdedTocart={isAdedTocart}
              isDeletetedFromTocart={isDeletetedFromTocart}
              handleCartBoudries={handleCartBoudries}
              className={"lg:relative hidden lg:block"}
            />
          </div>
        </div>
        {(Location.pathname === "/" || Location.pathname === "") &&
          !Location.pathname.startsWith("/menu") && <div></div>}
        {Location.pathname === "/checkout" && (
          <div className="relative flex items-center justify-center w-full">
            {/* <img
          className="md:w-[180px] md:h-[80px] h-[50px]  absolute -top-8 right-14 lg:-top-12 lg:right-1/4"
          src={food_dilevery}
          alt="food_dilevery"
        /> */}
            {/* <img
              className="lg:w-[300px] lg:h-[200px] w-[120px] h-[100px] absolute  -bottom-6 -left-4   lg:left-1/4 lg:-bottom-14"
              src={food_dilevery2}
              alt="food_dilevery2"
            /> */}
            <div className="hero">
              <div className="hero-content text-center">
                <div className="max-w-md">
                  <h1
                    style={{
                      fontFamily: "Rubik Wet Paint, cursive",
                    }}
                    className="text-5xl md:text-6xl font-bold"
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
      </div>
    </div>
  );
}

// {!Location.pathname.startsWith("/menu") && (
//   <div className="flex justify-between lg:mx-6 w-full lg:mt-4 ">
//     {Location.pathname.startsWith("/checkout") && (
//       <div className="relative flex items-center justify-center w-full">
//         <img
//           className="md:w-[180px] md:h-[80px] h-[50px]  absolute -top-8 right-14 lg:-top-12 lg:right-1/3"
//           src={food_dilevery}
//           alt="food_dilevery"
//         />
//         <img
//           className="lg:w-[300px] lg:h-[200px] w-[120px] h-[100px] absolute  -bottom-6 -left-4   lg:left-1/4 lg:-bottom-14"
//           src={food_dilevery2}
//           alt="food_dilevery2"
//         />
//         <div className="hero">
//           <div className="hero-content text-center">
//             <div className="max-w-md">
//               <h1
//                 style={{
//                   fontFamily: "Rubik Wet Paint, cursive",
//                 }}
//                 className="text-5xl md:text-8xl font-bold"
//               >
//                 checkout
//               </h1>
//               <p className="py-6 ">
//                 Sur place , à emporter et en livraison
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     )}
//     {!Location.pathname.startsWith("/checkout") && (
//       <div className="relative">
//         <div className="flex items-center lg:hidden">
//           <img className="w-[40px] h-[40px] " src={Logo} alt="logo" />
//           <h4 className="font-medium m-0">World's Dwich 42</h4>
//         </div>
//         <p
//           className="ml-5 text-2xl md:text-4xl lg:text-6xl"
//           style={{
//             fontFamily: "Qwigley, cursive",
//           }}
//         >
//           Spécaile
//         </p>
//         <p
//           className="ml-[15vw] text-xl md:text-2xl lg:text-4xl font-bold"
//           style={{
//             fontFamily: "Readex Pro, sans-serif",
//             color: "#5B6D5B",
//           }}
//         >
//           Délicieux
//         </p>
//         <p
//           className="text-3xl md:text-4xl lg:text-6xl ml-10  text-shadow-lg text-shadow-white "
//           style={{
//             fontFamily: "Rubik Wet Paint, cursive",
//             textShadow: "40px 30px 30px #FFFFFF45",
//           }}
//         >
//           Burger
//         </p>
//         <p className="text-xs lg:text-lg hidden lg:block ml-20 mt-5">
//           Sur place , à emporter et en livraison
//         </p>
//       </div>
//     )}
//     {!Location.pathname.startsWith("/checkout") && (
//       <div className="w-1/2 lg:w-1/4">
//         <img className="w-full h-full" src={burger} alt="burger" />
//       </div>
//     )}
//   </div>
// )}
