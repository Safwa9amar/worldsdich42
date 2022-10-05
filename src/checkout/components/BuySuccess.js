import order_confirmed from "../../icons/order_confirmed.svg";
import React, { useState, useEffect, useContext } from "react";

import io from "socket.io-client";
import { Checkout } from "../../context/checkoutContext";
import { Credentiel } from "../../context/CredentielContext";

// const socket = io("http://localhost:5000/");

export default function BuySuccess({ setcheckBoxState }) {
  const { isloged } = useContext(Credentiel);
  const [finaLoggin, setfinaLoggin] = useState(false);
  // const CheckoutData = useContext(Checkout);
  //  const [isConnected, setIsConnected] = useState(socket.connected);
  //  const [lastPong, setLastPong] = useState(null);

  const handleClick = () => {
    console.log(isloged);
    if (isloged) {
      setfinaLoggin(true);
    } else {
      setcheckBoxState(true);
    }
    //    socket.emit("message", JSON.stringify(CheckoutData));
  };
  // useEffect(() => {
  //   socket.on("message", (data) => {
  //     console.log(data)
  //   });
  //   socket.on("connect", () => {
  //     setIsConnected(true);
  //   });

  //   socket.on("disconnect", () => {
  //     setIsConnected(false);
  //   });

  //   socket.on("pong", () => {
  //     setLastPong(new Date().toISOString());
  //   });

  //   return () => {
  //     socket.off("connect");
  //     socket.off("disconnect");
  //     socket.off("pong");
  //   };
  // }, []);

  return (
    <>
      <label
        onClick={handleClick}
        htmlFor="my-modal-3"
        className="btn rounded-md bg-[#5B6D5B] w-1/2 mb-4 modal-button text-white"
      >
        Commandez maintenant
      </label>
      <input
        type="checkbox"
        checked={finaLoggin}
        id="my-modal-3"
        className="modal-toggle"
      />
      <div className="modal ">
        <div className="modal-box relative">
          <label
            onClick={() => {
              setfinaLoggin(false);
            }}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Votre Order N°: 135</h3>
          <img src={order_confirmed} alt="order confrimed" />
          <div className="py-4">
            <AlertInfo />
            <AlertSuccess />
            <AlertWarning />
          </div>
          <ul className="flex gap-6 justify-center items-center">
            <li>
              <a href="/">Accueil</a>
            </li>
            <li>
              <a href="/menu">Menu</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

function AlertInfo() {
  return (
    <div className="alert alert-info shadow-lg">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-current flex-shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>Votre commande est en cours... </span>
      </div>
    </div>
  );
}

function AlertSuccess() {
  return (
    <div className="alert alert-success shadow-lg">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current flex-shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span> Votre commande a été confirmée</span>
      </div>
    </div>
  );
}

function AlertWarning() {
  return (
    <div className="alert alert-warning shadow-lg">
      <div>
        😇
        <span>
          Veuillez enregistrer le numéro de commande , Merci d'avoir choisi nos
          services
        </span>
      </div>
    </div>
  );
}
