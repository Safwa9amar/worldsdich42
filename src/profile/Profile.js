import React, { useContext, useEffect, useState } from "react";
import CredentielClient from "../helpers/Credentiel";
import { Credentiel } from "../context/CredentielContext";
import User from "./User";

export default function Profile() {
  const [HeaderText, setHeaderText] = useState("S'identifier");
  const [isLogged, setIsLogged] = useState(false);
  const [loginData, setLoginData] = useState([]);
  const { userData, setUserData } = useContext(Credentiel);

  useEffect(() => {
    if (isLogged) {
      setHeaderText("Mon Compte");
      if (userData) {
        setUserData(loginData);
      }
    } else {
      setHeaderText("S'identifier");
    }
  }, [isLogged, loginData, setUserData, userData]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex items-center justify-center relative z-[1] bg-store-img bg-cover bg-no-repeat h-[35vh] w-full after:absolute after:w-full after:-z-[1] after:h-full after:bg-black after:opacity-80">
        <div className="text-6xl font-DancingScript">{HeaderText}</div>
      </div>
      <div className="mx-4 md:w-4/5">
        {isLogged && userData ? (
          <User
            loginData={loginData}
            isLogged={isLogged}
            setIsLogged={setIsLogged}
          />
        ) : (
          <CredentielClient
            setIsLogged={setIsLogged}
            setLoginData={setLoginData}
            setHeaderText={setHeaderText}
            userData={userData}
          />
        )}
      </div>
    </div>
  );
}
