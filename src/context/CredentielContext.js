import React, { createContext, useState, useEffect, useContext } from "react";
import { SERVER_URI } from "../helpers/UrlProvider";

export const Credentiel = createContext();

const CredentielContextProvider = ({ URI, children }) => {
  const CC_SERVER_URI = useContext(SERVER_URI);

  const [iLoged, setiLoged] = useState(false);
  const [UserData, setUserData] = useState([]);

  const url = `${CC_SERVER_URI}/registre`;

  useEffect(() => {
    try {
      fetch(url, {
        mode: "cors", // no-cors, *cors, same-origin
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refrech:
            localStorage.getItem("refrech") ||
            sessionStorage.getItem("refrech"),
        }),
      })
        .then((response) => {
          let code = response.status;
          if (code === 200) setiLoged(true);
          return response.json();
        })
        .then((data) => setUserData(data));
    } catch (error) {}
  }, [url]);

  return (
    <Credentiel.Provider
      value={{
        isloged: iLoged,
        UserData: UserData,
        setiLoged: setiLoged,
        setUserData: setUserData,
      }}
    >
      {children}
    </Credentiel.Provider>
  );
};
export default CredentielContextProvider;
