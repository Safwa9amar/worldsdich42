import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import CategoryContextProvider from "./context/categorycontext";
import CredentielContextProvider from "./context/CredentielContext";
import URLContextProvider from "./helpers/UrlProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <URLContextProvider>
      <CredentielContextProvider>
        <CategoryContextProvider>
          <App />
        </CategoryContextProvider>
      </CredentielContextProvider>
    </URLContextProvider>
  </React.StrictMode>
);
