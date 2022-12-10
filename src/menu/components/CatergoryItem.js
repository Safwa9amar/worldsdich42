import React, { useEffect, useContext, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { BsCartPlusFill } from "react-icons/bs";
import { BsCartCheckFill } from "react-icons/bs";
import menuImg from "../../images/Menu.png";
import product_bg from "../../images/product_bg.jpg";
import arcticons_manga from "../../icons/arcticons_manga-plus.svg";
import { Cartstorage } from "../../context/LocalStorageContext";
import { Credentiel } from "../../context/CredentielContext";
import { SERVER_URI } from "../../helpers/UrlProvider";

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
      btn btn-xs 
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
    setcheckBoxState,
    price,
    toggleModal,
    id,
    reciveOptionclick,
    handleAddToCart,
    isDeletetedFromTocart,
    hybrid_idFroDeletion,
    getCartBoudaries,
    with_menu,
    etat,
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
  const { UserData } = useContext(Credentiel);
  //
  const RATE_SERVER_URI = useContext(SERVER_URI);
  //
  const [MaxRating, setMaxRating] = useState(false);
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
  const ratingChanged = (newRating) => {
    console.log(newRating);
    fetch(`${RATE_SERVER_URI}/rating`, {
      mode: "cors", // no-cors, *cors, same-origins
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        user: UserData.id,
        rating: newRating,
        food_id: id,
      }),
    }).then((res) => {
      if (res.status === 401) {
        console.log(res.status);
        setcheckBoxState(true);
      }
    });
  };
  useEffect(() => {
    hybrid_idFroDeletion === `${id}_${category_ID}` && setToggleCart(false);
  }, [
    isDeletetedFromTocart,
    hybrid_idFroDeletion,
    id,
    category_ID,
    RATE_SERVER_URI,
  ]);
  useEffect(() => {
    fetch(`${RATE_SERVER_URI}/rating?get_rate_data=${id}`, {
      mode: "cors",
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        let maxRate = data.rating.filter((el) =>
          Math.max(Object.values(el))
        )[0];
        maxRate &&
          setMaxRating({
            stars: parseInt(Object.keys(maxRate)[0]),
            rate: Math.ceil((Object.values(maxRate) / data.tatalRating) * 100),
            count: Object.values(maxRate),
          });
      });
  }, [RATE_SERVER_URI, id]);

  return (
    <>
      <div
        onClick={() => {
          setMobileToggleView(true);
        }}
        className="md:hidden relative bg-[#28231B] w-[170px] h-[150px] hover:shadow-sm hover:shadow-gray-600  cursor-pointer p-8 flex flex-col justify-end items-center gap-2 rounded-lg m-6 text-white"
      >
        <img
          className={`w-[100px] h-[150px] translate-y-15`}
          src={img}
          alt={img}
        />
        {/* 
        {MaxRating && (
          <ReactStars
            value={MaxRating.stars}
            count={5}
            size={20}
            activeColor="#ffd700"
          />
        )} */}
        <h3 className="lg:text-2xl text-md font-bold tracking-widest capitalize">
          {header.toLowerCase()}
        </h3>
        <p className="text-[#5B6D5B] font-bold text-xl">
          €{Math.abs(Price) + Math.abs(MenuPrice)}
        </p>
        <img
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
      ${
        etat ? 'bg-[#28231B]' : 'bg-[#1b1812]'
      } 
      text-white 
      md:visible
      flex flex-col md:flex-row justify-between 
      items-stretch 
      md:rounded-lg  md:p-4 w-full
      
      `}
      >
        <div
          style={{
            backgroundImage: `url(${product_bg})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
          className="  rounded-t-[2.5rem] relative overflow-hidden bg-[#9E9995] md:rounded-md flex items-center justify-center  "
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
            <img className="w-[200px] lg:w-[150px]  " src={img} alt={header} />
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
        <div className=" flex flex-col  items-start justify-between md:w-4/6 gap-4 p-4 md:p-0 md:mx-4">
          <div className="flex justify-between  w-full gap-6">
            <p className="text-xl flex items-center gap-2 ">
              {header}
              <sup className="text-[#5B6D5B]">({category})</sup>
            </p>

            {etat && (
              <>
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
              </>
            )}
          </div>

          {description && (
            <p className="text-[#888888] text-lg">
              {description
                .map((el) => el.name + ", ")
                .toString()
                .slice(0, 100)}
              ...
            </p>
          )}
          <div className="flex text-xl font-bold">
            {
              <ReactStars
                // edit={isloged}
                onChange={ratingChanged}
                value={MaxRating.stars || 5}
                count={5}
                size={24}
                activeColor="#ffd700"
              />
            }
            <sup className="text-[#5B6D5B]">( {MaxRating.rate || 0} %)</sup>
          </div>
          <div className="flex justify-between gap-10 w-full">
            <div className="flex items-center gap-2">
              <p className="text-[#5B6D5B] font-bold text-xl">
                €{Math.abs(Price) + Math.abs(MenuPrice)}
              </p>
              {with_menu && etat && (
                <MenuBtn updatePrice={updatePrice} ToggleCart={ToggleCart} />
              )}
            </div>
            {etat && (
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
            )}
            {
              !etat && (
                <p className="text-[#5B6D5B] font-bold text-xl">
                  Indisponible
                </p>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
};
