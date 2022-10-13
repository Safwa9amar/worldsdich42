import React, { useCallback, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

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
import { Cartstorage } from "../context/LocalStorageContext";
import { Checkout } from "../context/checkoutContext";

const leadingActions = () => (
  <LeadingActions>
    <SwipeAction onClick={() => console.info("swipe action triggered")}>
      Voire votre Commande
    </SwipeAction>
  </LeadingActions>
);

const trailingActions = (
  hybrid_id,
  handleDeletetedFromTocart,
  handleStorageEdit
) => (
  <TrailingActions>
    <SwipeAction
      destructive={true}
      onClick={() => {
        let storage = JSON.parse(localStorage.getItem("cartData"));
        let newCartData = JSON.stringify(
          storage.filter((el) => `${el.id}_${el.category}` !== hybrid_id)
        );
        handleStorageEdit(JSON.parse(newCartData));
        localStorage.setItem("cartData", newCartData);
        handleDeletetedFromTocart(hybrid_id);
      }}
    >
      <MdDeleteForever className="fill-red-500 w-[25px] h-full" />
    </SwipeAction>
  </TrailingActions>
);

const CartItem = (props) => {
  const { id, parent_id, img, header, price, isMenu, handleStorageEdit } =
    props;
  const MyContext = JSON.parse(useContext(Cartstorage));
  const [count, setCount] = React.useState(() => {
    let arr = [];
    MyContext.forEach((el) => {
      if (el.hybrid_id === `${id}_${parent_id}`) arr.push(el.amount);
    });
    return arr[0] || 1;
  });
  const [supp] = React.useState(() => {
    let arr = [];
    MyContext.forEach((el) => {
      if (el.hybrid_id === `${id}_${parent_id}`) arr.push(el.suppData);
    });
    try {
      return (
        arr[0].map((el) => el.price).reduce((curr, next) => curr + next) || 0
      );
    } catch (error) {
      return 0;
    }
  });

  const [_price, set_price] = React.useState(price);
  const increment = () => {
    count >= 1 &&
      count <= 9 &&
      setCount(count + 1) &&
      set_price(_price + price);

    count <= 9 && handleStorageEdit(addArticleAmount(MyContext, count + 1));
  };
  const decrement = () => {
    count > 1 && setCount(count - 1) && set_price(_price - price);
    count > 1 && handleStorageEdit(addArticleAmount(MyContext, count - 1));
  };
  const addArticleAmount = useCallback(
    (data, count) => {
      return data.map((el) => {
        if (`${el.id}_${el.category}` === `${id}_${parent_id}`) {
          // console.log(count);
          if ("amount" in el) {
            el.amount = count;
          } else {
            Object.assign(el, { amount: count });
          }
        }
        return el;
      });
    },
    [id, parent_id]
  );
  useEffect(() => {
    set_price(_price);
    // console.log(count);
  }, [count, _price]);
  return (
    <div className=" w-full h-fit flex items-center justify-between bg-neutral rounded-xl px-2 select-none	cursor-grab ">
      <figure>
        <img className="h-[100px] w-[100px]" src={img} alt={header} />
      </figure>
      <p>{header}</p>
      <p className="flex flex-col">
        <span>
          ({price}€ x {count}) article
        </span>
        <span>{isMenu ? `+ ( 2€ x ${count} ) Menu  ` : ""} </span>
        <span>{supp ? `+ ( ${supp}€ x ${count} ) Supplément ` : ""}</span>
      </p>
      <div className="cursor-default flex justify-between gap-4 items-center bg-[#5B6D5B] px-4 rounded-md">
        <div onClick={decrement} className=" font-bold">
          -
        </div>
        <div>{count}</div>
        <div onClick={increment} className="font-bold">
          +
        </div>
      </div>
    </div>
  );
};

function Cart({
  isVisisble,
  setCartVisisble,
  handleDeletetedFromTocart,
  handleStorageEdit,
}) {
  const MyCheckout = useContext(Checkout);
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
      <div className="px-2 my-10 w-full h-full text-white   gap-10 flex flex-col items-center  text-center">
        <h1 className="text-2xl text-white font-bold">Cart</h1>
        <p className="flex items-center gap-2">
          <MdOutlineSwipe />
          glisser à gauche pour supprimer l'élément
          <br />
          glisser à droit pour voire votre cammande
        </p>
        <SwipeableList className="overflow-hidden  w-full overflow-y-scroll">
          {MyCheckout?.map((el) => {
            return (
              <SwipeableListItem
                key={`${el.id}_${el.category}`}
                className="my-4"
                leadingActions={leadingActions()}
                trailingActions={trailingActions(
                  `${el.id}_${el.category}`,
                  handleDeletetedFromTocart,
                  handleStorageEdit
                )}
              >
                <CartItem
                  key={`${el.id}_${el.category}`}
                  id={el.id}
                  parent_id={el.category}
                  img={el.img_url}
                  header={el.name}
                  price={el.prix}
                  isMenu={el.isMenu}
                  handleDeletetedFromTocart={handleDeletetedFromTocart}
                  handleStorageEdit={handleStorageEdit}
                />
              </SwipeableListItem>
            );
          })}
        </SwipeableList>
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
