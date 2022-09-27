import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Categories } from "../context/category";

import CloseOverlay from "../icons/close.svg";

import { MdDeleteForever, MdOutlineSwipe } from "react-icons/md";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

const leadingActions = () => (
  <LeadingActions>
    <SwipeAction onClick={() => console.info("swipe action triggered")}>
      Voire votre Commande
    </SwipeAction>
  </LeadingActions>
);

const trailingActions = (handleDelete) => (
  <TrailingActions>
    <SwipeAction destructive={true} onClick={handleDelete}>
      <MdDeleteForever className="fill-red-500 w-[25px] h-full" />
    </SwipeAction>
  </TrailingActions>
);

const CartItem = ({
  id,
  parent_id,
  img,
  header,
  price,
  isMenu,
  handleDeletetedFromTocart,
}) => {
  const [count, setCount] = React.useState(1);
  const [_price, set_price] = React.useState(price);
  const increment = () => {
    setCount(count + 1);
    count >= 1 && set_price(_price + price);
  };
  const decrement = () => {
    setCount(count - 1);
    count >= 1 && set_price(_price - price);
  };
  const handleDelete = () => {
    let storage = JSON.parse(localStorage.getItem("cartData"));
    let newCartData = JSON.stringify(
      storage.filter((el) => `${el.id}_${el.category}` !== `${id}_${parent_id}`)
    );
    localStorage.setItem("cartData", newCartData);
    handleDeletetedFromTocart();
  };
  useEffect(() => {
    set_price(_price);
    console.log(_price);
  }, [count, _price]);
  return (
    <SwipeableList className="overflow-hidden">
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions(handleDelete)}
      >
        <div className=" w-full h-fit flex items-center justify-between bg-neutral rounded-xl px-2 select-none	cursor-grab ">
          <figure>
            <img className="h-[100px] w-[100px]" src={img} alt={header} />
          </figure>
          <p>{header}</p>
          <p>
            €{_price} {isMenu ? "+ 2€" : ""}
          </p>
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
      </SwipeableListItem>
    </SwipeableList>
  );
};

function Cart({
  isVisisble,
  setCartVisisble,
  isAdedTocart,
  handleDeletetedFromTocart,
}) {
  const categories = useContext(Categories);
  const [storageData, setStorageData] = useState();

  const retriveCartData = (_storageData, categoriesContext) => {
    let arr = [];
    _storageData?.map((el) => {
      categoriesContext.map((_el) => {
        if (_el.id === el.category) {
          // console.log(_el.list);
          _el.list.forEach((__el) => {
            if (el.id === __el.id) {
              Object.assign(__el, { isMenu: el.isMenu });
              arr.push(__el);
            }
          });
        }
        return false;
      });
      return false;
    });
    setStorageData(arr);
    return arr;
  };

  useEffect(() => {
    let storage = JSON.parse(localStorage.getItem("cartData"));
    retriveCartData(storage, categories);
  }, [categories, isAdedTocart, isVisisble]);
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
          glisser à gauche pour supprimer l'élément
          <br />
          glisser à droit pour voire votre cammande
        </p>
        <div className="w-full  h-full flex flex-col   gap-5 overflow-y-scroll">
          {storageData?.map((el) => {
            return (
              <CartItem
                key={`${el.id}_${el.category}`}
                id={el.id}
                parent_id={el.categoryID}
                img={el.img}
                header={el.name}
                price={el.prix}
                isMenu={el.isMenu}
                handleDeletetedFromTocart={handleDeletetedFromTocart}
              />
            );
          })}
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
