import React, { useCallback, useContext, useEffect, useState } from "react";
import checked from "../asstes/checked.gif";
import { SERVER_URI } from "../helpers/UrlProvider";
import { Checkout } from "../context/checkoutContext";
import { Link } from "react-router-dom";
export default function ChargeSuccess({ handleStorageEdit }) {
  const BUY_SERVER_URI = useContext(SERVER_URI);
  const CheckoutData = useContext(Checkout);
  const command_type = localStorage.getItem("DamandeType");
  const Note = localStorage.getItem("Note");
  const [orderSuccess, setorderSuccess] = useState(false);
  const [facture, setfacture] = useState(false);
  const [order_id, setorder_id] = useState(null);

  const sendBuyData = () => {
    fetch(BUY_SERVER_URI + "/get_client_order", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user:
          localStorage.getItem("refrech") || sessionStorage.getItem("refrech"),
        DamandeType: command_type,
        Note: Note,
        order: CheckoutData,
      }),
    })
      .then((res) => {
        if (res.ok && res.status === 200) {
          res.json().then((data) => {
            console.log(data);
            getPaymentBill(data.OrderNum);
            setorder_id(data.OrderNum);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getPaymentBill = (id) => {
    fetch(BUY_SERVER_URI + "/get_payment_bill", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user:
          localStorage.getItem("refrech") || sessionStorage.getItem("refrech"),
        order_id: id,
      }),
    })
      .then((res) => {
        return res.blob();
      })
      .finally(() => {
        setorderSuccess(true);
      });
  };
  useEffect(() => {
    sendBuyData();
  }, []);

  useEffect(() => {
    if (CheckoutData.length === 0 && order_id !== null) {
      window.location.href = "/store/menu";
    }
  }, [CheckoutData]);

  return (
    <div className="h-3/4 w-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
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
          <div className="text-white flex flex-col items-center">
            <img src={checked} alt="checked" className="w-20 h-20" />
            <h1 className="text-3xl font-bold">
              Votre commande est enregistrée avec succès
            </h1>
            <Link to="/store/menu" className="text-2xl font-bold">
              go to menu
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
