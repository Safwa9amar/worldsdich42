import React, { createContext, useState, useEffect, useContext } from "react";
import { SERVER_URI } from "../helpers/UrlProvider";

export const Credentiel = createContext();

const CredentielContextProvider = ({ URI, children }) => {
  const CC_SERVER_URI = useContext(SERVER_URI);

  const [iLoged, setiLoged] = useState(false);
  const [UserData, setUserData] = useState([]);
  // const [RatingData, setRatingData] = useState(0);
  // const [MaxRating, setMaxRating] = useState(0);

  const url = `${CC_SERVER_URI}/registre`;

  // let getRating = useCallback(async () => {
  //   let data = await fetch(`${CC_SERVER_URI}rating`, {
  //     mode: "cors", // no-cors, *cors, same-origins
  //     method: "GET",
  //   }).then((res) => res.json());
  //   setRatingData(data);
  //   // console.log(data);
  //   let maxRate = data.rating.filter((el) => Math.max(Object.values(el)))[0];
  //   setMaxRating({
  //     stars: parseInt(Object.keys(maxRate)[0]),
  //     rate: Math.ceil((Object.values(maxRate) / data.tatalRating) * 100),
  //     count: Object.values(maxRate),
  //   });
  //   return data;
  // }, [CC_SERVER_URI]);

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
        .then((data) => {
          setUserData(data);
          // getRating(data.id);
        });
    } catch (error) {}
    // getRating();
  }, [url, iLoged]);

  return (
    <Credentiel.Provider
      value={{
        isloged: iLoged,
        UserData: UserData,
        setiLoged: setiLoged,
        setUserData: setUserData,
        // RatingData: RatingData,
        // MaxRating: MaxRating,
      }}
    >
      {children}
    </Credentiel.Provider>
  );
};
export default CredentielContextProvider;
