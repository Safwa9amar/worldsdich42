import React, { useContext } from "react";
import { FaRegUser } from "react-icons/fa";
// import { RiCoupon3Line } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import burger from "../menu/images/burger.png";
import surPlaceIco from "../icons/table_food.svg";
import EmporterFoodIco from "../icons/emporter_food.svg";
import DeliveryIco from "../icons/delivery.svg";
import { CheckOutTable } from "./components/CheckOutTable";
import { CartTotals } from "./components/CartTotals";
import { Checkout as Mycheckout } from "../context/checkoutContext";
import { Credentiel } from "../context/CredentielContext";
// import { SERVER_URI } from "../helpers/UrlProvider";
import { motion } from "framer-motion";
import CredentielClient from "../helpers/Credentiel";

const Checkout = ({ setcheckBoxState, setStorage }) => {
  const Mycontext = useContext(Mycheckout);
  const { isloged, setiLoged, UserData } = useContext(Credentiel);
  const [showTable, setshowTable] = React.useState(false);

  return (
    <motion.div
      animate={{
        opacity: [0, 0.7, 0.9, 1],
        translateY: ["50px", "0px"],
      }}
      className="flex-col md:w-[95vw] md:mx-[2.5vw] lg:p-14"
    >
      {isloged && (
        <>
          <div className="text-white w-full flex items-center justify-center gap-2 p-4 px-6 lg:m-2 rounded-lg border-t-2 border-t-blue-600 bg-[#252C30] ">
            <FaRegUser />
            Bienvenue <p>{UserData.Nom}</p>
            <button
              className="text-error cursor-pointer flex items-center"
              onClick={() => {
                sessionStorage.removeItem("refrech");
                localStorage.removeItem("refrech");
                sessionStorage.removeItem("jwt");
                localStorage.removeItem("jwt");
                setiLoged(false);
                setcheckBoxState(false);
              }}
            >
              <BiLogOut className="mx-2" />
              (déconnexion)
            </button>
          </div>
          {/* <OrderStatus UserData={UserData} /> */}
        </>
      )}
      {!isloged && <CredentielClient />}
      {Mycontext.length > 0 ? (
        <>
          {isloged && (
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
                UserData={UserData}
                isloged={isloged}
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
          )}
        </>
      ) : (
        <>
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
              <span>Vous n'avez pas ajouté d'articles</span>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Checkout;

// function OrderStatus({ UserData }) {
//   let url = useContext(SERVER_URI);
//   const [startCheck, setstartCheck] = useState(false);
//   const [orderStatus, setOrderStatus] = useState(false);
//   const [DamandeType, setDamandeType] = useState();

//   const handleDelivredclick = () => {
//     fetch(`${url}/confirmer_deliver`, {
//       mode: "cors",
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         id: UserData.last_order.id,
//         refrech:
//           localStorage.getItem("refrech") || sessionStorage.getItem("refrech"),
//       }),
//     }).then((res) => console.log(res));
//   };
//   useEffect(() => {
//     // if (startCheck) {
//     if (UserData.id === undefined) window.location.reload();
//     fetch(`${url}/checkOrderStatus/${UserData.id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         let damndType = JSON.parse(
//           data.DamandeType.replace("True", true).replaceAll(`'`, `"`)
//         );
//         setDamandeType(damndType.id);
//         setOrderStatus(data.status);
//         setstartCheck(false);
//       });

//     // }
//   }, [startCheck, url, UserData, orderStatus]);

//   return (
//     <div className="text-white  w-full flex items-center justify-center gap-2 p-4 px-6 m-2 rounded-lg border-b-2 border-b-blue-600 bg-[#252C30] ">
//       {orderStatus && (
//         <>
//           <div className="flex flex-col w-full lg:flex-row">
//             <div className="grid flex-grow bg-base-300 rounded-box place-items-center">
//               {orderStatus === 1 && (
//                 <div className="stat">
//                   <div className="stat-title">Votre dernière dammande est </div>
//                   <div className="stat-value text-warning">En attendant</div>
//                 </div>
//               )}
//               {orderStatus === 2 && (
//                 <div className="stat">
//                   {DamandeType === 3 && (
//                     <div className="stat-figure text-primary">
//                       <button
//                         onClick={() => {
//                           handleDelivredclick();
//                           setstartCheck(true);
//                         }}
//                         className="btn btn-xs btn-outline btn-primary my-2"
//                       >
//                         confirmer l'arrivée
//                       </button>
//                     </div>
//                   )}
//                   <div className="stat-title">Votre dernière dammande est </div>
//                   <div className="stat-value text-primary">Approuvé</div>
//                   {DamandeType === 3 && (
//                     <div className="stat-desc">
//                       Lorsque votre dernière commande arrive veuillez confirmer
//                       l'arrivée
//                     </div>
//                   )}
//                 </div>
//               )}
//               {orderStatus === 3 && (
//                 <div className="stat">
//                   <div className="stat-title">Votre dernière dammande est </div>
//                   <div className="stat-value text-success">Livré</div>
//                 </div>
//               )}
//               {orderStatus === 4 && (
//                 <div className="p-4 flex flex-col justify-center ">
//                   <div className="stat-title">Votre dernière dammande est </div>
//                   <div className="stat-value text-secondary">Annulé</div>
//                 </div>
//               )}
//             </div>
//             {orderStatus !== 3 && orderStatus !== 4 ? (
//               <>
//                 <div className="divider lg:divider-horizontal">ou</div>
//                 <div className="grid flex-grow  card bg-base-300 rounded-box place-items-center">
//                   <label
//                     onClick={() => setstartCheck(true)}
//                     className="text-warning cursor-pointer"
//                   >
//                     {startCheck && (
//                       <div className="btn cursor-wait btn-sm loading w-full px-2 capitalize">
//                         En cours...
//                       </div>
//                     )}
//                     {!startCheck && "Réessayer !"}
//                   </label>
//                 </div>
//               </>
//             ) : (
//               ""
//             )}
//           </div>
//         </>
//       )}
//       {!startCheck && !orderStatus && (
//         <>
//           <RiCoupon3Line />
//           <p>Voir le statut de votre dernière commande !</p>
//           <label
//             onClick={() => setstartCheck(true)}
//             htmlFor="applycopon"
//             className="text-warning cursor-pointer"
//           >
//             Cliquez ici
//           </label>
//         </>
//       )}
//       {startCheck && !orderStatus && (
//         <div className="btn cursor-wait btn-xs loading w-fit px-2 capitalize">
//           Chargement en cours...
//         </div>
//       )}
//     </div>
//   );
// }
