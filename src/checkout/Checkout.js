import React from "react";
import { FaRegUser } from "react-icons/fa";
import { RiCoupon3Line } from "react-icons/ri";
import burger from "../menu/images/burger.png";
import surPlaceIco from "../icons/table_food.svg";
import EmporterFoodIco from "../icons/emporter_food.svg";
import DeliveryIco from "../icons/delivery.svg";
import { CheckOutTable } from "./components/CheckOutTable";
import { CartTotals } from "./components/CartTotals";



const Checkout = () => {
    const [showTable, setshowTable] = React.useState(false);
  return (
    <div className="flex-col md:w-[95vw] md:mx-[2.5vw] bg-[#28231B] lg:p-14">
        
      <div className="flex items-center justify-between w-full my-6">
        <div className="text-white w-full flex items-center justify-center gap-2 p-4 px-6 lg:m-2 rounded-lg border-t-2 border-t-blue-600 bg-[#252C30] ">
          <FaRegUser />
          <p>Déjà client? </p>
          <p className="text-warning">Cliquez ici pour vous identifier</p>
        </div>
        <div className="text-white hidden w-full lg:flex items-center justify-center gap-2 p-4 px-6 m-2 rounded-lg border-t-2 border-t-blue-600 bg-[#252C30] ">
          <RiCoupon3Line />
          <p>Avez-vous un coupon?</p>
          <p className="text-warning">Cliquez ici pour entrer votre code</p>
        </div>
      </div>

      <CheckOutTable showTable={showTable} burger={burger} />

      <CartTotals
        surPlaceIco={surPlaceIco}
        EmporterFoodIco={EmporterFoodIco}
        DeliveryIco={DeliveryIco}
        subTotal="13"
        total="26"
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
