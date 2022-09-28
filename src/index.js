import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import CategoryContextProvider from "./context/categorycontext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CategoryContextProvider>
      <App />
    </CategoryContextProvider>
  </React.StrictMode>
);
