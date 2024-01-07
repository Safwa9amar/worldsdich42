import React, { useContext } from "react";
// import { FaRegUser } from "react-icons/fa";
// import { RiCoupon3Line } from "react-icons/ri";
// import { BiLogOut } from "react-icons/bi";
import emptyCart from "../asstes/emptyCart.png";
import burger from "../menu/images/burger.png";
import surPlaceIco from "../icons/table_food.svg";
import EmporterFoodIco from "../icons/emporter_food.svg";
import DeliveryIco from "../icons/delivery.svg";
import { CheckOutTable } from "./components/CheckOutTable";
import { CartTotals } from "./components/CartTotals";
import { Checkout as Mycheckout } from "../context/checkoutContext";
import { Credentiel } from "../context/CredentielContext";
import { motion } from "framer-motion";
// import CredentielClient from "../helpers/Credentiel";
import ErrorPage from "../404/OutOfServices";
import { ClientStatus } from "../context/CientStatus";
import { Link } from "react-router-dom";
const Checkout = ({ setcheckBoxState, setStorage }) => {
  const Mycontext = useContext(Mycheckout);
  const clientStatus = useContext(ClientStatus);
  const { isLogged, userData } = useContext(Credentiel);
  const [showTable, setshowTable] = React.useState(false);
  return (
    <motion.div
      animate={{
        opacity: [0, 0.7, 0.9, 1],
        translateY: ["50px", "0px"],
      }}
      className="flex-col md:w-[95vw] md:mx-[2.5vw] lg:p-14"
    >
      {clientStatus.isActivated ? (
        <>
          {Mycontext.length > 0 ? (
            <>
              <>
                <CheckOutTable
                  showTable={showTable}
                  burger={burger}
                  data={Mycontext}
                />
                <CartTotals
                  surPlaceIco={surPlaceIco}
                  EmporterFoodIco={EmporterFoodIco}
                  DeliveryIco={DeliveryIco}
                  subTotal="13"
                  total="26"
                  Mycontext={Mycontext}
                  setcheckBoxState={setcheckBoxState}
                  setStorage={setStorage}
                  userData={userData}
                  isLogged={isLogged}
                />

                <label className="btn btn-circle swap swap-rotate fixed bottom-0 right-10 z-50 md:hidden">
                  <input
                    onChange={() => setshowTable(!showTable)}
                    type="checkbox"
                  />

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
              </>
            </>
          ) : (
            <>
              <div className="text-white flex flex-col items-center">
                <h1 className="text-3xl font-bold">Votre panier est vide...</h1>
                <img src={emptyCart} alt="empty cart" className="w-60 h-60" />
                <Link
                  to="/menu"
                  className="capitalize p-4 w-fit h-fit m-2 font-bold btn btn-sm btn-outline btn-primary"
                >
                  Menu
                </Link>
              </div>
            </>
          )}
        </>
      ) : (
        <ErrorPage />
      )}
    </motion.div>
  );
};

export default Checkout;
