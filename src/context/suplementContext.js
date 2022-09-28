import React, { createContext, useState, useEffect } from "react";
import imgTest from "../asstes/supplement/cheddar.png";
import boursin from "../asstes/supplement/boursin.png";
import champignon from "../asstes/supplement/champignon.png";
import chevre from "../asstes/supplement/chevre.png";


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

export const Supplement = createContext();


const SupplementContextProvider = (props) => {
  const [supp, setSupp] = useState(data);
  useEffect(() => {
    // getNotioPage();
    setSupp(data);
  }, []);

  //   async function getNotioPage() {
  //     const data = await fetch("./data.json").then((res) => console.log(res));
  //     setCategories(data);
  //   }
  return (
    <Supplement.Provider value={supp}>{props.children}</Supplement.Provider>
  );
};
export default SupplementContextProvider;
