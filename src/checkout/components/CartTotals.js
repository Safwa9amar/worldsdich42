import React, { Fragment, useContext, useEffect, useState } from "react";
import OrderNow from "./OrderNow";
// import formatEUR from helpers
import { formatEUR } from "../../helpers/currencyFormatter";
import { calculeCoupon } from "../../helpers/CalculeCoupon";
import { Link } from "react-router-dom";
import useShippingRate from "../../hooks/useShipingRate";
import { AiOutlineLoading } from "react-icons/ai";

export function CartTotals({
  Mycontext,
  setcheckBoxState,
  setStorage,
  UserData,
  isLogged,
}) {
  const URI = process.env.REACT_APP_SERVER_URI;

  // fraislivraison state
  const [FraisLivraison, setFraisLivraison] = useState(0);
  const {
    setSelectedShippingRateObject,
    shippingRates,
    selectedShippingRate,
    loading,
    error,
  } = useShippingRate();

  const [isPlace, setPlace] = React.useState(false);
  const [isEmporter, setEmporter] = React.useState(false);
  const [isDelivery, setDelivery] = React.useState(false);
  const [GetTotalPrice, setGetTotalPrice] = React.useState(0);
  const [CammndType, setCammndType] = useState([]);
  const [promotionTotal, setPromotionTotal] = useState(0);

  const [Note, setNote] = useState("");
  let DamandeType = [
    { id: 1, type: "sur place", bol: isPlace },
    { id: 2, type: "à Emporter", bol: isEmporter },
    { id: 3, type: "En livraison", bol: isDelivery },
  ];
  const SurPlace = () => {
    setPlace(true);
    setEmporter(false);
    setDelivery(false);
  };
  const emporter = () => {
    setPlace(false);
    setEmporter(true);
    setDelivery(false);
  };
  const delivery = () => {
    setPlace(false);
    setEmporter(false);
    setDelivery(true);
  };

  useEffect(() => {
    localStorage.setItem(
      "DamandeType",
      JSON.stringify(DamandeType.filter((el) => el.bol === true)[0]?.id)
    );
  }, [DamandeType]);

  useEffect(() => {
    localStorage.setItem("Note", JSON.stringify(Note));
  }, [Note]);

  const getTotalPrice = (data) => {
    let spliceToCategories = data
      .map((el) => el.category)
      .filter((el, i, arr) => arr.indexOf(el) === i);
    let FinalData = spliceToCategories.map((el) => {
      let obj = {
        category: el,
        listItems: data
          .map((_el) => {
            if (_el.category === el) return _el;
          })
          .filter((el) => el !== undefined),
      };

      el = obj;
      return el;
    });

    let FinalTotal = [0];
    FinalData.map((el) => {
      let categorySum = el.listItems.map((el) => {
        let [price, amount, isMenu, supp, cutting_off, cutting_off_status] = [
          Math.abs(el.prix),
          el.amount,
          el.isMenu,
          el.supplement !== null && el.supplement.length > 0
            ? el.supplement
                .map((el) => el.price)
                .reduce((curr, next) => curr + next)
            : [],
          el.cutting_off,
          el.cutting_off_status,
        ];
        let sum = isMenu
          ? (price + 2 + supp) * amount
          : (price + supp) * amount;

        // sum = cutting_off_status ? calculeCoupon(sum, cutting_off) : sum;
        return {
          sum,
          cutting_off,
          cutting_off_status,
        };
      });

      if (categorySum[0].cutting_off_status) {
        FinalTotal.push(
          calculeCoupon(
            categorySum.map((el) => el.sum).reduce((curr, next) => curr + next),
            categorySum[0].cutting_off
          )
        );
      } else {
        FinalTotal.push(
          categorySum.map((el) => el.sum).reduce((curr, next) => curr + next)
        );
      }
    });
    if (FinalTotal.length > 0)
      return FinalTotal.reduce((curr, next) => curr + next);
  };
  useEffect(() => {
    setGetTotalPrice(getTotalPrice(Mycontext));
  }, [isPlace, isEmporter, isDelivery, Mycontext, GetTotalPrice]);

  useEffect(() => {
    fetch(`${URI}/CommandType`, {
      method: "GET",
      cors: "no-cors",
    })
      .then((res) => res.json())
      .then((data) => {
        setCammndType(data);
      })
      .catch((err) => console.log(err));
  }, [URI]);
  useEffect(() => {
    fetch(`${URI}/settings/api/globalPromotion`, {
      method: "GET",
      cors: "no-cors",
    })
      .then((res) => res.json())
      .then((data) => {
        setPromotionTotal(data);
      })
      .catch((err) => console.log(err));
  }, [isLogged, Mycontext, UserData]);

  return (
    <div className="flex flex-col md:flex-row items-stratch justify-between my-6">
      <div className="w-full text-white  text-sm  lg:text-xl flex md:flex-col items-center lg:items-start justify-around  p-4 md:gap-6">
        {CammndType.map((el) => {
          if (el.id === 1 && el.isCheked) {
            return (
              <ApplyMethode
                key={el.id}
                isActive={isPlace}
                SetActive={SurPlace}
                type="place"
                text={"Sur Place"}
              />
            );
          } else if (el.id === 2 && el.isCheked) {
            return (
              <ApplyMethode
                key={el.id}
                isActive={isEmporter}
                SetActive={emporter}
                type="emporter"
                text={"à Emporter"}
              />
            );
          } else if (el.id === 3 && el.isCheked) {
            return (
              <ApplyMethode
                key={el.id}
                isActive={isDelivery}
                SetActive={delivery}
                type="livraison"
                text={"En livraison"}
              />
            );
          }
          return "";
        })}
      </div>

      <div className="flex flex-col gap-4  w-full px-5">
        <div className="flex gap-2 justify-between">
          <p className="text-info">CART TOTALS</p>
          <p>{formatEUR(GetTotalPrice)}</p>
        </div>
        <div className="flex gap-2 justify-between">
          <p className="text-info">
            Subtotal
            {promotionTotal.value > 0 && (
              <span className="ml-2 badge badge-success">
                -{promotionTotal.value}%
              </span>
            )}
          </p>
          <p>
            {promotionTotal.value > 0
              ? formatEUR(calculeCoupon(GetTotalPrice, promotionTotal.value))
              : formatEUR(GetTotalPrice)}
          </p>
        </div>
        {isDelivery && (
          <>
            {DamandeType.filter((el) => el.bol === true)[0]?.id === 3 && (
              <label className="input-group input-group-vertical">
                <span className="text-info">
                  Veuillez sélectionner une adresse de livraison
                </span>
                {
                  loading ? (
                    <div className="flex gap-2 alert alert-info shadow-lg w-full">
                      <AiOutlineLoading className="text-5xl animate-spin h-5 w-5 mr-3 ..." />
                      <p>Chargement des adresses de livraison...</p>
                    </div>
                  ) : error ? (
                    <div className="alert alert-error shadow-lg w-full">
                      {error}
                    </div>
                  ) : (
                    ""
                  ) // <div className="alert alert-error shadow-lg w-full">{error}</div>
                }
                <select
                  onChange={(e) => {
                    setFraisLivraison(e.target.value);
                    setSelectedShippingRateObject(
                      shippingRates.filter(
                        (el) =>
                          el.fixed_amount.amount === parseFloat(e.target.value)
                      )[0]
                    );
                  }}
                  className="input input-bordered"
                >
                  <option value="0">Choisir une adresse</option>
                  {shippingRates.map((el) => {
                    return (
                      <option
                        id={el.id}
                        key={el.id}
                        value={el.fixed_amount.amount}
                      >
                        {el.display_name}
                      </option>
                    );
                  })}
                </select>
              </label>
            )}

            <div className="flex gap-2 justify-between">
              <p className="text-info">Frais de livraison </p>
              <p>{formatEUR(parseFloat(FraisLivraison / 100))}</p>
            </div>
          </>
        )}
        <div className="flex gap-2 justify-between">
          <p className="text-info">Total</p>
          <p>
            {
              isDelivery
                ? promotionTotal.value > 0
                  ? formatEUR(
                      calculeCoupon(GetTotalPrice, promotionTotal.value) +
                        FraisLivraison / 100
                    )
                  : formatEUR(GetTotalPrice + FraisLivraison / 100) //formatEUR(GetTotalPrice + FraisLivraison.fixed_amount.amount/100)
                : promotionTotal.value > 0
                ? formatEUR(calculeCoupon(GetTotalPrice, promotionTotal.value))
                : formatEUR(GetTotalPrice) //formatEUR(GetTotalPrice)
            }
          </p>
        </div>

        <div className="flex flex-col gap-2 justify-between">
          <p>Laissez-nous une note (optionnel)</p>
          <textarea
            onChange={(e) => {
              setNote(e.target.value);
            }}
            className="textarea textarea-bordered"
            placeholder="Bio"
          ></textarea>
        </div>

        {DamandeType.filter((el) => el.bol === true)[0]?.id === 3 &&
          selectedShippingRate !== null && (
            <Fragment>
              {!selectedShippingRate?.active ? (
                <div className="alert alert-warning shadow-lg w-full">
                  La livraison à {selectedShippingRate?.display_name} n'est pas
                  disponible actuellement
                </div>
              ) : selectedShippingRate?.active &&
                GetTotalPrice < selectedShippingRate?.metadata?.price ? (
                <div className="flex gap-2 alert alert-warning shadow-lg w-full">
                  Note : Grâce à votre adresse{" "}
                  {selectedShippingRate?.display_name}, le minimum Prix pour la
                  livraison est à partir de{" "}
                  {formatEUR(selectedShippingRate?.metadata.price)}
                </div>
              ) : !isLogged ? (
                <div className="flex flex-col gap-10">
                  <p className="text-info">
                    Vous devez d'abord vous connecter à votre compte pour
                    pouvoir commander la livraison
                  </p>
                  <Link
                    to="/profile"
                    className="btn btn-primary  right-2 top-2"
                  >
                    cliquez ici pour vous connecter
                  </Link>
                </div>
              ) : (
                <OrderNow
                  setStorage={setStorage}
                  setcheckBoxState={setcheckBoxState}
                  DamandeType={DamandeType}
                  Note={Note}
                  selectedShippingRate={selectedShippingRate}
                />
              )}
            </Fragment>
          )}

        {DamandeType.filter((el) => el.bol === true)[0]?.id !== 3 && (
          <OrderNow
            setStorage={setStorage}
            setcheckBoxState={setcheckBoxState}
            DamandeType={DamandeType}
            Note={Note}
          />
        )}
      </div>
    </div>
  );
}

function ApplyMethode({ text, type, isActive, SetActive }) {
  let SurPlaceIco = (
    <svg
      className={`w-[20px] h-[20px] ${
        isActive ? "fill-warning " : "fill-white"
      }`}
      viewBox="0 0 31 31"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M30.1667 7.39581C30.1667 3.77706 23.4467 0.833313 15.1667 0.833313C6.88667 0.833313 0.166672 3.77706 0.166672 7.39581C0.166672 10.7896 6.09167 13.6021 13.6667 13.9208V21.4583H9.16667L6.16667 30.8333H9.16667L10.9667 25.2083H19.3667L21.1667 30.8333H24.1667L21.1667 21.4583H16.6667V13.9208C24.2417 13.6021 30.1667 10.7896 30.1667 7.39581Z" />
    </svg>
  );
  let EmporterFoodIco = (
    <svg
      className={`w-[20px] h-[20px]  ${
        isActive ? "fill-warning " : "fill-white"
      }`}
      viewBox="0 0 26 27"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M25.1815 3.4065C24.739 3.0225 22.3225 0.81 21.871 0.42C21.4225 0.0315 20.737 0 20.218 0H5.782C5.2645 0 4.579 0.0315 4.129 0.42C3.6775 0.81 1.261 3.024 0.8185 3.4065C0.373 3.7905 0.0040004 4.371 0.1225 5.1945C0.241 6.021 2.9575 25.686 3.028 26.154C3.06521 26.3866 3.18292 26.5987 3.36057 26.7533C3.53822 26.9079 3.76453 26.9952 4 27H22C22.2357 26.9952 22.4622 26.9076 22.6399 26.7527C22.8175 26.5978 22.9351 26.3853 22.972 26.1525C23.0425 25.686 25.759 6.0195 25.879 5.193C25.996 4.371 25.627 3.7905 25.1815 3.4065ZM13 16.4595C8.128 16.4595 7.0855 9.5655 6.8695 8.145H9.625C10.039 10.2165 10.981 13.761 13 13.761C15.019 13.761 15.9625 10.2165 16.375 8.145H19.132C18.9145 9.5655 17.872 16.4595 13 16.4595ZM2.755 4.509L5.5 1.5H20.5L23.245 4.509H2.755Z" />
    </svg>
  );
  let DeliveryIco = (
    <svg
      className={`w-[20px] h-[20px] ${
        isActive ? "fill-warning " : "fill-white"
      }`}
      viewBox="0 0 30 31"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11.25 6.125H7.5V2.375H5.625V6.125H1.875V8H5.625V11.75H7.5V8H11.25V6.125Z" />
      <path d="M28.0491 16.0681L25.2366 9.50563C25.1644 9.33695 25.0443 9.19319 24.8911 9.09219C24.7379 8.99119 24.5585 8.9374 24.375 8.9375H21.5625V7.0625C21.5625 6.81386 21.4637 6.5754 21.2879 6.39959C21.1121 6.22377 20.8736 6.125 20.625 6.125H14.0625V8H19.6875V19.7712C19.2603 20.0193 18.8865 20.3495 18.5875 20.7427C18.2885 21.136 18.0704 21.5845 17.9456 22.0625H12.0544C11.8504 21.2579 11.384 20.5443 10.729 20.0345C10.0739 19.5248 9.26754 19.248 8.4375 19.248C7.60746 19.248 6.80111 19.5248 6.14604 20.0345C5.49096 20.5443 5.02456 21.2579 4.82063 22.0625H3.75V13.625H1.875V23C1.875 23.2486 1.97377 23.4871 2.14959 23.6629C2.3254 23.8387 2.56386 23.9375 2.8125 23.9375H4.82063C5.02456 24.7421 5.49096 25.4557 6.14604 25.9655C6.80111 26.4752 7.60746 26.752 8.4375 26.752C9.26754 26.752 10.0739 26.4752 10.729 25.9655C11.384 25.4557 11.8504 24.7421 12.0544 23.9375H17.9456C18.1496 24.7421 18.616 25.4557 19.271 25.9655C19.9261 26.4752 20.7325 26.752 21.5625 26.752C22.3925 26.752 23.1989 26.4752 23.854 25.9655C24.509 25.4557 24.9754 24.7421 25.1794 23.9375H27.1875C27.4361 23.9375 27.6746 23.8387 27.8504 23.6629C28.0262 23.4871 28.125 23.2486 28.125 23V16.4375C28.125 16.3105 28.0992 16.1848 28.0491 16.0681ZM8.4375 24.875C8.06666 24.875 7.70415 24.765 7.39581 24.559C7.08746 24.353 6.84714 24.0601 6.70523 23.7175C6.56331 23.3749 6.52618 22.9979 6.59853 22.6342C6.67087 22.2705 6.84945 21.9364 7.11167 21.6742C7.3739 21.412 7.70799 21.2334 8.07171 21.161C8.43542 21.0887 8.81242 21.1258 9.15503 21.2677C9.49764 21.4096 9.79048 21.65 9.99651 21.9583C10.2025 22.2666 10.3125 22.6292 10.3125 23C10.3118 23.4971 10.114 23.9735 9.7625 24.325C9.41103 24.6765 8.93455 24.8743 8.4375 24.875ZM21.5625 10.8125H23.7563L25.7662 15.5H21.5625V10.8125ZM21.5625 24.875C21.1917 24.875 20.8291 24.765 20.5208 24.559C20.2125 24.353 19.9721 24.0601 19.8302 23.7175C19.6883 23.3749 19.6512 22.9979 19.7235 22.6342C19.7959 22.2705 19.9745 21.9364 20.2367 21.6742C20.4989 21.412 20.833 21.2334 21.1967 21.161C21.5604 21.0887 21.9374 21.1258 22.28 21.2677C22.6226 21.4096 22.9155 21.65 23.1215 21.9583C23.3275 22.2666 23.4375 22.6292 23.4375 23C23.437 23.4971 23.2393 23.9738 22.8878 24.3253C22.5363 24.6768 22.0596 24.8745 21.5625 24.875ZM26.25 22.0625H25.1794C24.9729 21.2595 24.5057 20.5477 23.8512 20.0387C23.1966 19.5297 22.3917 19.2523 21.5625 19.25V17.375H26.25V22.0625Z" />
    </svg>
  );
  const icon =
    type === "place"
      ? SurPlaceIco
      : type === "emporter"
      ? EmporterFoodIco
      : type === "livraison"
      ? DeliveryIco
      : "";
  return (
    <>
      <label
        onClick={SetActive}
        className={`
            ${
              isActive
                ? "border-warning text-warning fill-warning"
                : "border-[#969696] fill-white"
            }
            btn 
            btn-xs
            btn-outline 
            md:btn-md
            lg:btn-lg
            capitalize
            h-fit
            w-fit
            transition-all duration-300
            flex items-center justify-center  gap-2 border-2  rounded-md 
            p-1 cursor-pointer
          `}
      >
        {icon}
        <p>{text}</p>
      </label>
    </>
  );
}
