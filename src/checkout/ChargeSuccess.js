import React, { useCallback, useContext, useEffect, useState } from "react";
import { SERVER_URI } from "../helpers/UrlProvider";
import { Checkout } from "../context/checkoutContext";
import { Link } from "react-router-dom";
import order_success from "../images/order_success.gif";
import useShippingRate from "../hooks/useShipingRate";
export default function ChargeSuccess({ Storage, setStorage }) {
  const BUY_SERVER_URI = useContext(SERVER_URI);
  const CheckoutData = useContext(Checkout);
  const command_type = localStorage.getItem("DamandeType");
  const Note = localStorage.getItem("Note");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [gettingFacture, setGettingFacture] = useState(false);
  const [order_id, setOrderId] = useState(
    sessionStorage.getItem("order_id") || ""
  );
  const { selectedShippingRate, clearSelectedShippingRate } = useShippingRate();
  console.log(selectedShippingRate);
  const sendBuyData = useCallback(async () => {
    try {
      const res = await fetch(BUY_SERVER_URI + "/get_client_order", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user:
            localStorage.getItem("refrech") ||
            sessionStorage.getItem("refrech"),
          DamandeType: command_type,
          Note: Note,
          order: CheckoutData,
          selectedShippingRate: selectedShippingRate,
        }),
      });

      if (res.ok && res.status === 200) {
        const data = await res.json();
        console.log(data);
        setOrderId(data.OrderNum);
        sessionStorage.setItem("order_id", data.OrderNum);
        setOrderSuccess(true);
        setStorage("[]");
        clearSelectedShippingRate();
      }
    } catch (err) {
      console.error(err);
    }
  }, [BUY_SERVER_URI, command_type, Note, CheckoutData, selectedShippingRate]);

  const getPaymentBill = async (id) => {
    try {
      setGettingFacture(true);
      const res = await fetch(BUY_SERVER_URI + "/get_payment_bill", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user:
            localStorage.getItem("refrech") ||
            sessionStorage.getItem("refrech"),
          order_id: id,
        }),
      });

      if (res.ok) {
        setGettingFacture(false);
        await res.blob();
      }
    } catch (err) {
      setGettingFacture(false);
      console.error(err);
    }
  };

  useEffect(() => {
    CheckoutData.length > 0 ? sendBuyData() : setOrderSuccess(true);
  }, [selectedShippingRate]);

  return (
    <div className=" w-screen flex justify-center items-center">
      <div className="border-2 border-slate-600 rounded-md m-10 md:w-1/2 p-5 flex gap-2  justify-center flex-wrap ">
        {!orderSuccess ? (
          <div className="text-white flex flex-col items-center">
            <h1 className="text-3xl font-bold">
              Finalisation de votre commande...
            </h1>
            <div
              className="animate-spin h-20 w-20 m-6  border-b-2 border-white rounded-full"
              viewBox="0 0 24 24"
            ></div>
          </div>
        ) : (
          <>
            <img
              src={order_success}
              alt="checked"
              className="w-60 h-60 md:w-full rounded-xl"
            />
            <div>
              <h1 className="text-xl text-primary font-semibold">
                Votre commande #
                {<span className="text-2xl font-bold">{order_id}</span>} est
                enregistrée avec succès
              </h1>
              <p className=" text-justify">
                Nous vous remercions de votre commande auprès de notre world's
                dwich. Nous espérons que vous apprécierez nos délicieux plats et
                attendons avec impatience de vous servir à nouveau toujours !
              </p>
              <Link
                to="/store/menu"
                className="capitalize  p-4 w-fit h-fit m-2 font-bold btn btn-sm btn-outline btn-primary "
              >
                Retour au menu
              </Link>
              <button
                onClick={() => {
                  getPaymentBill(order_id);
                }}
                className="capitalize  p-4 w-fit h-fit m-2 font-bold btn btn-sm btn-outline btn-accent "
              >
                {/* spinner */}
                {gettingFacture ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                ) : (
                  ""
                )}
                Télécharger votre facture
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
