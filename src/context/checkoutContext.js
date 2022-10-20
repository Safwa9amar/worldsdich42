import React, { createContext, useState, useEffect } from "react";

export const Checkout = createContext();

const CheckoutDataContextProvider = (props) => {
  const [Cartdata, setCartdata] = useState(
    retriveCartData(JSON.parse(props.Storage), props.CategoryContext) || []
  );

  useEffect(() => {
    // console.log(props.Storage, props.CategoryContext);
    setCartdata(
      retriveCartData(JSON.parse(props.Storage), props.CategoryContext) || []
    );
  }, [
    props.cleanCartData,
    props.isAdedTocart,
    props.isVisisble,
    props.isDeletetedFromTocart,
    props.Storage,
    props.CategoryContext,
  ]);

  return (
    <Checkout.Provider value={Cartdata}>{props.children}</Checkout.Provider>
  );
};
export default CheckoutDataContextProvider;

const retriveCartData = (_storageData, categoriesContext) => {
  let arr = [];
  _storageData?.map((el) => {
    categoriesContext.map((_el) => {
      if (_el.id === el.category) {
        _el.list.forEach((__el) => {
          if (el.id === __el.id) {
            Object.assign(__el, { isMenu: el.isMenu });
            Object.assign(__el, { amount: el.amount });
            Object.assign(__el, { unSelectedRecipes: el.optionData });
            Object.assign(__el, { supplement: el.suppData });
            arr.push(__el);
          }
        });
      }
      return false;
    });
    return false;
  });
  return arr;
};
