import React, { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { SERVER_URI } from "../helpers/UrlProvider";

export const Supplement = createContext();

const SupplementContextProvider = (props) => {
  const SUPP_SERVER_URI = useContext(SERVER_URI);
  const socket = io(SUPP_SERVER_URI);
  const [supp, setSupp] = useState([]);

  useEffect(() => {
    socket.on("getSuppdata", (data) => {
      console.log("after");

      try {
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
      } catch (error) {
        console.log("sipp data err", error);
      }
    });

    return () => {
      try {
        socket.emit("getSuppdata", { id: -1 });
        socket.off("getSuppdata");
      } catch (error) {
        console.log("zeaze", error);
      }
    };
  });

  return (
    <Supplement.Provider value={supp}>{props.children}</Supplement.Provider>
  );
};
export default SupplementContextProvider;
