import React, { useState, useEffect, useContext } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { Checkout } from "../../context/checkoutContext";
import { Credentiel } from "../../context/CredentielContext";
import useShippingRate from "../../hooks/useShipingRate";
import delivery from "../../asstes/delivery.gif";
import { useNavigate } from "react-router-dom";
export default function OrderNow({ DamandeType, Note }) {
  const navigate = useNavigate();
  const user = useContext(Credentiel);
  const { selectedShippingRate } = useShippingRate();
  const [ShowModel, setShowModel] = useState(false);
  const [ok, setOk] = useState(false);
  const [req, setReq] = useState(false);
  const [startReq, setstartReq] = useState(false);
  const [finalResResult, setfinalResResult] = useState(false);
  const CheckoutData = useContext(Checkout);
  const command_type = DamandeType.filter((el) => el.bol === true)[0];
  const [orderSuccess, setorderSuccess] = useState(false);
  const [chargeData, setchargeData] = useState(false);

  const handleClick = async () => {
    setShowModel(true);
    setstartReq(true);
    if (command_type.id === 1 || command_type.id === 2) {
      navigate("/success");
    } else {
      const data = await fetch(process.env.REACT_APP_SERVER_URI + "/charge", {
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
          order: CheckoutData,
          DamandeType: command_type,
          Note: Note,
          selectedShippingRate: selectedShippingRate || null,
        }),
      });
      if (data.ok && data.status === 200) {
        setorderSuccess(true);
        setchargeData(data.json());
        setReq(true);
        setstartReq(false);
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      orderSuccess &&
        chargeData.then((res) => {
          localStorage.setItem("charge_id", JSON.stringify(res.id));
          window.location = res.url !== undefined ? res.url : "";
        });
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
        checked={ShowModel}
        id="my-modal-3"
        className="modal-toggle "
      />
      <div className="modal ">
        <div className="modal-box relative">
          <label
            onClick={() => {
              setShowModel(false);
              setOk(false);
              setfinalResResult(true);
              // setStorage("[]");
              // localStorage.removeItem("cartData");
            }}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          <>
            <img
              src={delivery}
              alt="order confrimed"
              className="rounded-md shadow-lg"
            />

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
          </>
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
