import React, { createContext, useState, useEffect } from "react";

export const Credentiel = createContext();

const CredentielContextProvider = (props) => {
  const [iLoged, setiLoged] = useState(false);
  const [UserData, setUserData] = useState([]);

  const url = "http://astrobdaboy.pythonanywhere.com/registre";

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
  }, [iLoged]);

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
