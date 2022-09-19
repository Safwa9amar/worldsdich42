import React from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import "./App.css";
import Header from "./header/Header";
import ErrorPage from "./404/404";
import Menu from "./menu/Menu";
import Footer from "./footer/Footer";
import Home from "./home/Home";
import Contact from "./contact/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "menu",
    element: <Menu />,
    errorElement: <ErrorPage />,
  },
  {
    path: "contact",
    element: <Contact />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <>
      {/* <Header /> */}
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;
