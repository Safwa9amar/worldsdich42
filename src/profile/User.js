import React, { useContext } from "react";
import { BiLogOut } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { Credentiel } from "../context/CredentielContext";

export default function User() {
  const { isLogged, setIsLogged, userData } = useContext(Credentiel);

  return (
    <div className="w-11/12 my-10 ">
      {isLogged && (
        <>
          <div className="text-white w-full flex items-center justify-between gap-2 py-4 px-8  rounded-lg border-t-2 border-t-blue-600 bg-[#252C30] ">
            <span className="w-fit flex items-center gap-4">
              <FaRegUser /> Bienvenue {userData.Nom}
            </span>
            <button
              className="text-error cursor-pointer flex items-center"
              onClick={() => {
                sessionStorage.removeItem("refrech");
                localStorage.removeItem("refrech");
                sessionStorage.removeItem("jwt");
                localStorage.removeItem("jwt");
                setIsLogged(false);
              }}
            >
              <BiLogOut className="mx-2" />
              (déconnexion)
            </button>
          </div>
          {/* <OrderStatus userData={userData} /> */}
        </>
      )}
      <br />

      <h1 className="text-lg md:text-2xl font-extrabold lg:text-3xl">
        Personnel
      </h1>
      <div className="divider"></div>
      <div className="">
        <div className="font-bold">
          Nom d'utilisateur :
          <span className="text-slate-300 font-medium ">
            {userData.username}{" "}
          </span>
        </div>
        <div className="font-bold">
          Prénom :{" "}
          <span className="text-slate-300 font-medium">{userData.Prenom} </span>
        </div>
        <div className="font-bold">
          Nom :{" "}
          <span className="text-slate-300 font-medium">{userData.Nom} </span>
        </div>
      </div>
      <br />

      <h1 className="text-lg md:text-2xl font-extrabold lg:text-3xl">
        Contact
      </h1>
      <div className="divider"></div>
      <div className="">
        <div className="font-bold">
          Email :{" "}
          <span className="text-slate-300 font-medium">{userData.email} </span>
        </div>
        <div className="font-bold">
          Numéro :{" "}
          <span className="text-slate-300 font-medium">{userData.Tel} </span>
        </div>
        <div className="font-bold">
          L'adresse :{" "}
          <span className="text-slate-300 font-medium">
            {userData.adress?.name}{" "}
          </span>{" "}
        </div>
      </div>
      <br />

      <h1 className="text-lg md:text-2xl font-extrabold lg:text-3xl">
        Informations de livraison
      </h1>
      <div className="divider"></div>
      <div className="grid grid-cols-2">
        <div>
          <div className="font-bold">Quartier :</div>
          <div className="font-bold">Adresse :</div>
          <div className="font-bold">Bâtiment :</div>
          <div className="font-bold">Étage :</div>
          <div className="font-bold">Sonnerie :</div>
          <div className="font-bold">Code :</div>
        </div>
        <div>
          <div className="text-slate-300">{userData.adress.name} </div>
          <div className="text-slate-300">{userData.adress_exct}</div>
          <div className="text-slate-300">{userData.batiment}</div>
          <div className="text-slate-300">{userData.etage}</div>
          <div className="text-slate-300">
            {userData.sonnerie ? (
              <span className="badge badge-success">Oui</span>
            ) : (
              <span className="badge badge-success">Non</span>
            )}
          </div>
          <div className="text-slate-300">{userData.code}</div>
        </div>
      </div>
    </div>
  );
}

// const GridData = function ({title, objData }) {
//   // create a list of keys from the object passed
//   const keys = Object.keys(objData);
//   // create a list of values from the object passed
//   const values = Object.values(objData);
//   // create a list of jsx elements from the keys and values
//   const list = keys.map((key, index) => (
//     <div key={index}>
//       <div className="font-bold">{key}</div>
//       <div className="text-slate-300">{values[index]}</div>
//     </div>
//   ));
//   // return the jsx elements

//   return (
//     <>
//     <h1 className="text-lg md:text-2xl lg:text-4xl">{title}</h1>
//       <div className="divider"></div>
//     <div className="grid grid-cols-2">
//         <div>
//           <div className="font-bold">Nom d'utilisateur</div>
//           <div className="font-bold">Prénom</div>
//           <div className="font-bold">Nom</div>
//         </div>
//         <div>
//           <div className="text-slate-300">{userData.username}</div>
//           <div className="text-slate-300">{userData.Prenom}</div>
//           <div className="text-slate-300">{userData.Nom} </div>
//         </div>
//       </div>
//     </>

//   );
// };

// Path: client\src\profile\Profile.js
