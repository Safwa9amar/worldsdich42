import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
// import io from "socket.io-client";
import { SERVER_URI } from "../helpers/UrlProvider";

export const Supplement = createContext();

const SupplementContextProvider = ({ URI, children }) => {
  const SUPP_SERVER_URI = useContext(SERVER_URI);
  // const socket = io(SUPP_SERVER_URI);
  const [supp, setSupp] = useState([]);

  let getCaegories = useCallback(async () => {
    const data = await fetch(`${SUPP_SERVER_URI}/getSuppdata`).then((res) =>
      res.json()
    );

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

      setSupp(finalData);
    } catch (error) {
      console.log("sipp data err", error);
    }
  }, [SUPP_SERVER_URI]);
  useEffect(() => {
    getCaegories();
    console.log(supp);
    // socket.on("getSuppdata", (data) => {
    //   console.log("after");
    // return () => {
    //   try {
    //     socket.emit("getSuppdata", { id: -1 });
    //     socket.off("getSuppdata");
    //   } catch (error) {
    //     console.log("zeaze", error);
    //   }
    // };
  }, [getCaegories]);

  return <Supplement.Provider value={supp}>{children}</Supplement.Provider>;
};
export default SupplementContextProvider;
