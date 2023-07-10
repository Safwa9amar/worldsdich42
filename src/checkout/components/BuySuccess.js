import order_confirmed from "../../icons/order_confirmed.svg";
import React, { useState, useEffect, useContext, useCallback } from "react";
// import io from "socket.io-client";
import { AiOutlineLoading } from "react-icons/ai";
import { Checkout } from "../../context/checkoutContext";
import { Credentiel } from "../../context/CredentielContext";
import { SERVER_URI } from "../../helpers/UrlProvider";

export default function BuySuccess({
  setcheckBoxState,
  DamandeType,
  setStorage,
  Note,
}) {
  const BUY_SERVER_URI = useContext(SERVER_URI);
  const user = useContext(Credentiel);
  // const socket = io(`${BUY_SERVER_URI}/test`);

  // const userCredentiel = useContext(Credentiel);
  const { isloged } = useContext(Credentiel);
  const [finaLoggin, setfinaLoggin] = useState(false);
  const [ok, setOk] = useState(false);
  const [req, setReq] = useState(false);
  const [startReq, setstartReq] = useState(false);
  const [finalResResult, setfinalResResult] = useState(false);
  const [orderNum, setorderNum] = useState();
  const CheckoutData = useContext(Checkout);
  const command_type = DamandeType.filter((el) => el.bol === true)[0];
  const [orderSuccess, setorderSuccess] = useState(false);
  const [chargeData, setchargeData] = useState(false);
  const handleClick = () => {
    if (isloged) {
      setfinaLoggin(true);
      sendBuyData();
    } else {
      setcheckBoxState(true);
    }

    // socket.emit("message", "hello");
  };

  const sendBuyData = useCallback(async () => {
    let data = await fetch(BUY_SERVER_URI + "/get_client_order", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user:
          localStorage.getItem("refrech") || sessionStorage.getItem("refrech"),
        order: CheckoutData,
        DamandeType: command_type,
        Note: Note,
      }),
    })
      .then(setstartReq(true))
      .then((res) => {
        if (res.ok && res.status === 200) {
          return res.json();
        }
      })
      .then(async (res) => {
        const order_id = res.OrderNum;
        const data = await fetch(BUY_SERVER_URI + `/charge/${order_id}`, {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user:
              localStorage.getItem("refrech") ||
              sessionStorage.getItem("refrech"),
            email: user.email,
          }),
        });
        if (data.ok && data.status === 200) {
          setorderSuccess(true);
          setchargeData(data.json());
          setReq(true);
          setstartReq(false);
        }
      });
    if (data?.isConfirmed === true) {
      setReq(false);
      setOk(true);
      setorderNum(data.OrderNum);
    }
  }, [CheckoutData, command_type, BUY_SERVER_URI]);

  useEffect(() => {
    const timer = setTimeout(() => {
      orderSuccess && chargeData.then((res) => (window.location = res.url));
    }, 3000);
    return () => clearTimeout(timer);
  }, [orderSuccess, chargeData]);

  return (
    <>
      {command_type?.bol && (
        <label
          onClick={handleClick}
          htmlFor="my-modal-3"
          className="btn rounded-md bg-[#5B6D5B] w-1/2 mb-4 modal-button text-white"
        >
          Commandez maintenant
        </label>
      )}
      <input
        readOnly
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
              setOk(false);
              setfinalResResult(true);
              setStorage("[]");
              localStorage.removeItem("cartData");
            }}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Votre Order N°:#{orderNum}</h3>
          <img src={order_confirmed} alt="order confrimed" />
          <div className="py-4 flex justify-center">
            {startReq && (
              <AiOutlineLoading className="text-5xl animate-spin h-5 w-5 mr-3 ..." />
            )}
            {req && <AlertInfo />}
            {ok && <AlertSuccess />}
            {finalResResult && <AlertWarning />}
          </div>
          {finalResResult && (
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
          )}
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
        <span>
          Votre commande a été envoyée avec succès <br /> Merci d'utiliser notre
          service 😇
        </span>
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
