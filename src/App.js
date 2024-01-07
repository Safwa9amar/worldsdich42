import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./header/Header";
import Menu from "./menu/Menu";
import Footer from "./footer/Footer";
import Home from "./home/Home";
import Contact from "./contact/Contact";
import Cart from "./checkout/Cart";
import Checkout from "./checkout/Checkout";
import Catergory from "./menu/components/Catergory";
import ScrollToTop from "./helpers/ScrollToTop";
import { Categories } from "./context/categorycontext";
import SupplementContextProvider from "./context/suplementContext";
import CartDataContextProvider from "./context/LocalStorageContext";
import CheckoutDataContextProvider from "./context/checkoutContext";
// import CredentielModel from "./helpers/CredentielModel";
import Profile from "./profile/Profile";
import Error404 from "./404/404";
import ChargeSuccess from "./checkout/ChargeSuccess";

function App() {
  const CategoryContext = React.useContext(Categories);
  const [isVisisble, setCartVisisble] = React.useState(false);
  const [isAdedTocart, setIsAdedTocart] = React.useState(false);
  const [checkBoxState, setcheckBoxState] = React.useState(false);
  const [Storage, setStorage] = React.useState(
    localStorage.getItem("cartData") !== null
      ? localStorage.getItem("cartData")
      : "[]"
  );
  const [isDeletetedFromTocart, setIsDeletetedFromTocart] =
    React.useState(false);

  const [hybrid_idFroDeletion, sethybrid_idFroDeletion] = React.useState();
  const handleAdedTocart = () => {
    setIsAdedTocart(!isAdedTocart);
  };
  const [getCartBoudaries, setgetCartBoudaries] = React.useState();

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

  return (
    <>
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
                basename={process.env.REACT_APP_ROOT_PATH_BASENAME}
              >
                <ScrollToTop>
                  <>
                    <Header
                      setCartVisisble={setCartVisisble}
                      isAdedTocart={isAdedTocart}
                      isDeletetedFromTocart={isDeletetedFromTocart}
                      handleCartBoudries={handleCartBoudries}
                      // locations={locations}
                    />
                    <Cart
                      isVisisble={isVisisble}
                      setCartVisisble={setCartVisisble}
                      isAdedTocart={isAdedTocart}
                      handleDeletetedFromTocart={handleDeletetedFromTocart}
                      handleStorageEdit={handleStorageEdit}
                    />

                    <Routes>
                      <Route path="*" element={<Error404 />} />

                      <Route exact path="/" element={<Home />} />
                      <Route
                        exact
                        path="/menu/category"
                        element={
                          <Catergory
                            handleStorageEdit={handleStorageEdit}
                            handleAdedTocart={handleAdedTocart}
                            isDeletetedFromTocart={isDeletetedFromTocart}
                            hybrid_idFroDeletion={hybrid_idFroDeletion}
                            getCartBoudaries={getCartBoudaries}
                            setcheckBoxState={setcheckBoxState}
                            // setErorPage={setErorPage}
                          />
                        }
                      />
                      <Route
                        exact
                        path="/checkout"
                        element={
                          <Checkout
                            setcheckBoxState={setcheckBoxState}
                            checkBoxState={checkBoxState}
                            setStorage={setStorage}
                          />
                        }
                      />
                      <Route
                        exact
                        path="/success"
                        element={
                          <ChargeSuccess
                            Storage={Storage}
                            setStorage={setStorage}
                          />
                        }
                      />

                      <Route exact path="/menu" element={<Menu />} />
                      <Route exact path="/contact" element={<Contact />} />
                      <Route exact path="/profile" element={<Profile />} />
                    </Routes>
                  </>
                </ScrollToTop>
                <Footer />
              </BrowserRouter>
            </div>
          </CheckoutDataContextProvider>
        </CartDataContextProvider>
      </SupplementContextProvider>
    </>
  );
}

export default App;
