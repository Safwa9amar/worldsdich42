import React, { useContext } from "react";
import { FaRegUser } from "react-icons/fa";
import { RiCoupon3Line } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import burger from "../menu/images/burger.png";
import surPlaceIco from "../icons/table_food.svg";
import EmporterFoodIco from "../icons/emporter_food.svg";
import DeliveryIco from "../icons/delivery.svg";
import { CheckOutTable } from "./components/CheckOutTable";
import { CartTotals } from "./components/CartTotals";
import { Checkout as Mycheckout } from "../context/checkoutContext";
import { Credentiel } from "../context/CredentielContext";

const Checkout = ({setcheckBoxState, checkBoxState}) => {
  const Mycontext = useContext(Mycheckout);
  const { isloged, setiLoged, UserData } = useContext(Credentiel);
  const [showTable, setshowTable] = React.useState(false);
  return (
    <div className="flex-col md:w-[95vw] md:mx-[2.5vw] bg-[#28231B] lg:p-14">
      <div className="flex items-center justify-between w-full my-6">
        <div className="text-white w-full flex items-center justify-center gap-2 p-4 px-6 lg:m-2 rounded-lg border-t-2 border-t-blue-600 bg-[#252C30] ">
          <FaRegUser />
          {isloged && (
            <>
              Bienvenue <p>{UserData.username}</p>
              <button
                className="text-error cursor-pointer flex items-center"
                onClick={() => {
                  localStorage.removeItem("refrech");
                  localStorage.removeItem("jwt");
                  setiLoged(false);
                }}
              >
                <BiLogOut className="mx-2" />
                (déconnexion)
              </button>
            </>
          )}
          {!isloged && (
            <>
              <p>Déjà client? </p>
              <button
                onClick={() => {
                  setcheckBoxState(true);
                }}
                className="text-warning"
              >
                <label
                  htmlFor="loginModel"
                  className="text-warning cursor-pointer"
                >
                  Cliquez ici pour identifier
                </label>
              </button>
            </>
          )}
        </div>
        <div className="text-white hidden w-full lg:flex items-center justify-center gap-2 p-4 px-6 m-2 rounded-lg border-t-2 border-t-blue-600 bg-[#252C30] ">
          <RiCoupon3Line />
          <p>Avez-vous un coupon?</p>
          <label htmlFor="applycopon" className="text-warning cursor-pointer">
            Cliquez ici pour entrer votre code
          </label>
        </div>
      </div>
      <CheckOutTable showTable={showTable} burger={burger} data={Mycontext} />
      <CartTotals
        surPlaceIco={surPlaceIco}
        EmporterFoodIco={EmporterFoodIco}
        DeliveryIco={DeliveryIco}
        subTotal="13"
        total="26"
        Mycontext={Mycontext}
        setcheckBoxState={setcheckBoxState}
      />
      <label className="btn btn-circle swap swap-rotate fixed bottom-5 right-10 z-50 md:hidden">
        <input onChange={() => setshowTable(!showTable)} type="checkbox" />

        <svg
          className="swap-off fill-curren"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512"
        >
          <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
        </svg>

        <svg
          className="swap-on fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512"
        >
          <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
        </svg>
      </label>
    </div>
  );
};

export default Checkout;
