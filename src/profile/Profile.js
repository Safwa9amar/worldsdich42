import React, { useContext, useEffect, useState } from "react";
import CredentielClient from "../helpers/Credentiel";
import { Credentiel } from "../context/CredentielContext";
import User from "./User";

export default function Profile() {
  const [HeaderText, setHeaderText] = useState("S'identifier");
  const { isloged, setiLoged, UserData } = useContext(Credentiel);

  console.log(UserData);
  useEffect(() => {
    if (isloged) {
      setHeaderText("Mon Compte");
    } else {
      setHeaderText("S'identifier");
    }
  }, [isloged]);
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex items-center justify-center relative z-[1] bg-store-img bg-cover bg-no-repeat h-[35vh] w-full after:absolute after:w-full after:-z-[1] after:h-full after:bg-black after:opacity-80">
        <div className="text-6xl font-DancingScript">{HeaderText}</div>
      </div>
      <div className="md:w-4/5">
        {isloged ? (
          <User />
        ) : (
          <CredentielClient
            HeaderText={HeaderText}
            setHeaderText={setHeaderText}
          />
        )}
      </div>
    </div>
  );
}
