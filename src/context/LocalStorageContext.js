import React, { createContext, useState, useEffect } from "react";

export const Cartstorage = createContext();

const CartDataContextProvider = (props) => {
  let data = localStorage.getItem("cartData");
  const [storage, setStorage] = useState(data !== null ? data : "[]");
  // const [PasedStorage, setPasedStorage] = useState();
  useEffect(() => {
    setStorage(props.data);
    localStorage.setItem("cartData", props.data);
    // setPasedStorage(JSON.parse(appstorage));

  }, [props.data]);

  return (
    <Cartstorage.Provider value={storage}>
      {props.children}
    </Cartstorage.Provider>
  );
};
export default CartDataContextProvider;
