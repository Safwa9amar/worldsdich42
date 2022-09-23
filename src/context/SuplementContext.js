import React, { createContext, useState, useEffect } from "react";
import imgTest from "../asstes/supplement/cheddar.png";
import boursin from "../asstes/supplement/boursin.png";
import champignon from "../asstes/supplement/champignon.png";
import chevre from "../asstes/supplement/chevre.png";
export const Supplement = createContext();

const data = [
  {
    id: 1,
    img: imgTest,
    text: "Cheddar",
    isAvaliable: true,
  },
  {
    id: 2,
    img: boursin,
    text: "boursin",
    isAvaliable: false,
  },
  {
    id: 3,
    img: champignon,
    text: "champignon",
    isAvaliable: false,
  },
  {
    id: 4,
    img: chevre,
    text: "chevre",
    isAvaliable: true,
  },
  {
    id: 5,
    img: imgTest,
    text: "Cheddar",
    isAvaliable: true,
  },
  {
    id: 6,
    img: imgTest,
    text: "Cheddar",
    isAvaliable: true,
  },
  {
    id: 7,
    img: imgTest,
    text: "Cheddar",
    isAvaliable: true,
  },
];

const SupplementContextProvider = (props) => {
  const [Supplement, setSupplement] = useState(data);
  useEffect(() => {
    // getNotioPage();
    setSupplement(data);
  }, []);

  //   async function getNotioPage() {
  //     const data = await fetch("./data.json").then((res) => console.log(res));
  //     setSupplement(data);
  //   }
  return (
    <Supplement.Provider value={Supplement}>
      {props.children}
    </Supplement.Provider>
  );
};
export default SupplementContextProvider;
