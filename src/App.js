import React, { useState, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./layout/header/Header";
import Footer from "./layout/footer/Footer";
import Cart from "./pages/checkout/Cart";
import ScrollToTop from "./helpers/ScrollToTop";
import { Categories } from "./context/categorycontext";
import SupplementContextProvider from "./context/suplementContext";
import CartDataContextProvider from "./context/LocalStorageContext";
import CheckoutDataContextProvider from "./context/checkoutContext";
import CredentielContextProvider from "./context/CredentielContext";
import { generateRoutes } from "./helpers/routesGenerator";
const App = () => {
  // State and context hooks
  const CategoryContext = useContext(Categories);
  const [isVisisble, setCartVisisble] = useState(false);
  const [isAdedTocart, setIsAdedTocart] = useState(false);
  const [checkBoxState, setcheckBoxState] = useState(false);
  const [Storage, setStorage] = useState(
    localStorage.getItem("cartData") !== null
      ? localStorage.getItem("cartData")
      : "[]"
  );
  const [isDeletetedFromTocart, setIsDeletetedFromTocart] = useState(false);
  const [hybrid_idFroDeletion, sethybrid_idFroDeletion] = useState();
  const [getCartBoudaries, setgetCartBoudaries] = useState();

  // Event handlers
  const handleAdedTocart = () => {
    setIsAdedTocart(!isAdedTocart);
  };

  const handleCartBoudries = (data) => {
    setgetCartBoudaries(data);
  };

  const handleDeletetedFromTocart = (hybrid_id) => {
    setIsDeletetedFromTocart(!isDeletetedFromTocart);
    sethybrid_idFroDeletion(hybrid_id);
  };

  const handleStorageEdit = (data) => {
    setStorage(JSON.stringify(data));
  };
  // Separate function to generate routes

  const customProps = {
    // Your custom props here
  };

  const defaultProps = {
    categoryProps: {
      // Category-specific props
      handleStorageEdit,
      handleAdedTocart,
      isDeletetedFromTocart,
      hybrid_idFroDeletion,
      getCartBoudaries,
      setcheckBoxState,
    },
    checkoutProps: {
      // Checkout-specific props
      setcheckBoxState,
      checkBoxState,
      setStorage,
    },
    chargeSuccessProps: {
      // ChargeSuccess-specific props
    },
    menuProps: {
      // Menu-specific props
    },
    contactProps: {
      // Contact-specific props
    },
    profileProps: {
      // Profile-specific props
    },
  };

  const routes = generateRoutes(
    (Component, props) => <Component {...props} />,
    {
      ...customProps,
      ...defaultProps,
    }
  );

  return (
    <CredentielContextProvider>
      <SupplementContextProvider>
        <CartDataContextProvider data={Storage}>
          <CheckoutDataContextProvider
            isAdedTocart={isAdedTocart}
            isVisisble={isVisisble}
            isDeletetedFromTocart={isDeletetedFromTocart}
            Storage={Storage}
            CategoryContext={CategoryContext}
          >
            <div
              data-theme="dracula"
              id="scroller"
              className="w-screen h-screen overflow-x-hidden md:scrollbar md:scrollbar-thumb-gray-900 md:scrollbar-track-gray-100"
            >
              <BrowserRouter
                basename={
                  process.env.NODE_ENV === "production"
                    ? process.env.REACT_APP_PROD_ROOT_PATH_BASENAME
                    : process.env.REACT_APP_DEV_ROOT_PATH_BASENAME
                }
              >
                <ScrollToTop>
                  <>
                    <Header
                      setCartVisisble={setCartVisisble}
                      isAdedTocart={isAdedTocart}
                      isDeletetedFromTocart={isDeletetedFromTocart}
                      handleCartBoudries={handleCartBoudries}
                    />
                    <Cart
                      isVisisble={isVisisble}
                      setCartVisisble={setCartVisisble}
                      isAdedTocart={isAdedTocart}
                      handleDeletetedFromTocart={handleDeletetedFromTocart}
                      handleStorageEdit={handleStorageEdit}
                    />
                    <Routes>
                      {routes.map((route, index) => (
                        <Route
                          key={index}
                          path={route.path}
                          element={route.element}
                        />
                      ))}
                    </Routes>
                  </>
                </ScrollToTop>
                <Footer />
              </BrowserRouter>
            </div>
          </CheckoutDataContextProvider>
        </CartDataContextProvider>
      </SupplementContextProvider>
    </CredentielContextProvider>
  );
};

export default App;
