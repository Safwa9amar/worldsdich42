import React, { createContext, useState, useEffect } from "react";
import io from "socket.io-client";

export const Supplement = createContext();

const SupplementContextProvider = (props) => {
  const socket = io("https://myworlddwich.herokuapp.com");
  const [supp, setSupp] = useState([]);

  useEffect(() => {
    socket.on("getSuppdata", (data) => {
      const { itemSuppData, suppData } = data;

      const finalData = suppData.map((el) => {
        let new_item_supplement = [];
        for (const item of el.item_supplement) {
          for (const _item of itemSuppData) {
            if (item === _item.id) {
              new_item_supplement.push(_item);
            }
          }
        }
        el.item_supplement = new_item_supplement;
        return el;
      });

      console.log(finalData);

      setSupp(finalData);
    });

    return () => {
      socket.emit("getSuppdata", { id: -1 });
      socket.off("getSuppdata");
    };
  });

  return (
    <Supplement.Provider value={supp}>{props.children}</Supplement.Provider>
  );
};
export default SupplementContextProvider;
