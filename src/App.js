import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./header/Header";
import Menu from "./menu/Menu";
import Footer from "./footer/Footer";
import Home from "./home/Home";
import Contact from "./contact/Contact";
import Cart from "./checkout/Cart";
import Catergory from "./menu/components/Catergory";
import { SupplementCard } from "./menu/components/SupplementCard";

function App() {
  const [isVisisble, setCartVisisble] = React.useState(false);
  const [isSupplementCardVisisble, setSupplementCard] = React.useState(true);
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <BrowserRouter>
        <SupplementCard
          isSupplementCardVisisble={isSupplementCardVisisble}
          setSupplementCard={setSupplementCard}
        />
        <Header setCartVisisble={setCartVisisble} />
        <Cart isVisisble={isVisisble} setCartVisisble={setCartVisisble} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/menu/category" element={<Catergory />} />
          <Route exact path="/menu" element={<Menu />} />
          <Route exact path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
