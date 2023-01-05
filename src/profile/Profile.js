import React, { useState } from "react";
import CredentielClient from "../helpers/Credentiel";

export default function Profile() {
  const [HeaderText, setHeaderText] = useState("S'identifier");

    // Créer un nouveau compte
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex items-center justify-center relative z-[1] bg-store-img bg-cover bg-no-repeat h-[35vh] w-full after:absolute after:w-full after:-z-[1] after:h-full after:bg-black after:opacity-80">
        <div className="text-6xl font-DancingScript">{HeaderText}</div>
      </div>
      <div className="md:w-4/5">
      <CredentielClient HeaderText={HeaderText} setHeaderText={setHeaderText} />
    </div>
    </div>
  );
}
