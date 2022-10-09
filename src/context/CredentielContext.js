import React, { createContext, useState, useEffect, useContext } from "react";
import { SERVER_URI } from "../helpers/UrlProvider";

export const Credentiel = createContext();

const CredentielContextProvider = (props) => {
  const [iLoged, setiLoged] = useState(false);
  const [UserData, setUserData] = useState([]);
  const REGISTRE_SERVER_URI = useContext(SERVER_URI);

  // const url = "https://myworlddwich.herokuapp.com/registre";
  const url = `${REGISTRE_SERVER_URI}/registre`;

  useEffect(() => {
    try {
      fetch(url, {
        mode: "cors", // no-cors, *cors, same-origin
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refrech: localStorage.getItem("refrech") }),
      })
        .then((response) => {
          let code = response.status;
          code === 200 && setiLoged(true);
          return response.json();
        })
        .then((data) => setUserData(data));
    } catch (error) {}
  }, [iLoged, url]);

  return (
    <Credentiel.Provider
      value={{
        isloged: iLoged,
        UserData: UserData,
        setiLoged: setiLoged,
        setUserData: setUserData,
      }}
    >
      {props.children}
    </Credentiel.Provider>
  );
};
export default CredentielContextProvider;
