import React from "react";
import CloseOverlay from "../icons/close.svg";
import classicImg from "../menu/images/category/classic.png";
import {MdOutlineSwipe} from 'react-icons/md'
// import SwipeToDelete from "react-swipe-to-delete-component";
// import "react-swipe-to-delete-component/dist/swipe-to-delete.css";
import {Link } from "react-router-dom"
const CartItem = ({ img, header, price }) => {
  const [count, setCount] = React.useState(0);
  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };
  return (
    // <SwipeToDelete onDelete={()=>{console.log('deleted')}} classNameTag="rounded-xl !bg-blue-200 my-6"></SwipeToDelete>
      <div className="w-full h-fit flex items-center justify-between bg-neutral rounded-xl px-2 ">
        <figure>
          <img className="h-[100px] w-[100px]" src={img} alt={header} />
        </figure>
        <p>{header}</p>
        <p>€{price}</p>
        <div className="flex justify-between gap-4 items-center bg-[#5B6D5B] px-4 rounded-md">
          <div onClick={decrement} className="cursor-pointer font-bold">
            -
          </div>
          <div>{count}</div>
          <div onClick={increment} className="cursor-pointer font-bold">
            +
          </div>
        </div>
      </div>
    
  );
};

function Cart({ isVisisble, setCartVisisble }) {
  return (
    <div
      className={`
        ${isVisisble ? "" : "opacity-0 pointer-events-none"}
        transition-opaciy
        duration-500
        absolute top-0 right-0 z-[9999] w-full h-screen bg-[#121618fb]
        lg:w-1/3
        overflow-hidden
      `}
    >
      <button
        onClick={() => setCartVisisble(false)}
        className="absolute top-5 left-5"
      >
        <img className="w-[25px]" src={CloseOverlay} alt="close overlay" />
      </button>
      <div className="px-2 my-20 w-full h-full text-white   gap-10 flex flex-col items-center  text-center">
        <h1 className="text-2xl text-white font-bold">Cart</h1>
        <p className="flex items-center gap-2">
          <MdOutlineSwipe />
          glisser pour supprimer l'élément
        </p>
        <div className="w-full overflow-y-scroll">
          <CartItem img={classicImg} header="classic burger" price={"10"} />
        </div>
        <Link
          onClick={() => setCartVisisble(false)}
          to="/checkout"
          className="btn btn-active btn-accent fixed bottom-10 z-50 px-10"
        >
          Complete order
        </Link>
      </div>
    </div>
  );
}

export default Cart;
