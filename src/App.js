import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./header/Header";
import Menu from "./menu/Menu";
import Footer from "./footer/Footer";
import Home from "./home/Home";
import Contact from "./contact/Contact";
import Cart from "./checkout/Cart";


function App() {
  const [isVisisble, setCartVisisble] = React.useState(false);

  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <BrowserRouter>
        <Header setCartVisisble={setCartVisisble} />
        <Cart isVisisble={isVisisble} setCartVisisble={setCartVisisble} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/menu" element={<Menu />} />
          <Route exact path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
