import React, { createContext, useState, useEffect } from "react";

export const Credentiel = createContext();

const CredentielContextProvider = ({ children }) => {
  const CC_SERVER_URI =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_PROD_SERVER_URI
      : process.env.REACT_APP_DEV_SERVER_URI;
  const refrechToken =
    localStorage.getItem("refrech") || sessionStorage.getItem("refrech");

  const [isLogged, setIsLogged] = useState(false);
  const [userData, setUserData] = useState([]);
  const [isLoading, setIisLoading] = useState(false);

  const url = `${CC_SERVER_URI}/registre`;

  useEffect(() => {
    const fetchData = async () => {
      setIisLoading(true);
      try {
        const response = await fetch(url, {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refrech: refrechToken,
          }),
        });

        const code = response.status;
        if (code === 200) {
          setIsLogged(true);
        }

        const data = await response.json();
        setUserData(data);
        setIisLoading(false);
        // getRating(data.id);
      } catch (error) {
        // Handle error if needed
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [url, refrechToken]);

  return (
    <Credentiel.Provider
      value={{
        isLogged,
        userData,
        setIsLogged,
        setUserData,
        refrechToken,
        isLoading,
        setIisLoading,
      }}
    >
      {children}
    </Credentiel.Provider>
  );
};

export default CredentielContextProvider;
