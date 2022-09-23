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
import CategoryContextProvider from "./context/category";
import SupplementContextProvider from "./context/suplement";

function App() {
  const [isVisisble, setCartVisisble] = React.useState(false);

  return (
    <SupplementContextProvider>
      <CategoryContextProvider>
        <div
          id="scroller"
          className="w-screen h-screen overflow-x-hidden md:scrollbar md:scrollbar-thumb-gray-900 md:scrollbar-track-gray-100"
        >
          <BrowserRouter>
            <ScrollToTop>
              <Header setCartVisisble={setCartVisisble} />
              <Cart isVisisble={isVisisble} setCartVisisble={setCartVisisble} />
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/menu/category" element={<Catergory />} />
                <Route exact path="/checkout" element={<Checkout />} />
                <Route exact path="/menu" element={<Menu />} />
                <Route exact path="/contact" element={<Contact />} />
              </Routes>
            </ScrollToTop>
            <Footer />
          </BrowserRouter>
        </div>
      </CategoryContextProvider>
    </SupplementContextProvider>
  );
}

export default App;
