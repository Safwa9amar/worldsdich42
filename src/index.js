import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";
import "./index.css";
import "./loader.css";
import Loader from "./asstes/loader.gif";
import CategoryContextProvider from "./context/categorycontext";
import CredentielContextProvider from "./context/CredentielContext";
import URLContextProvider from "./helpers/UrlProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
const App = lazy(() => import("./App"));

// generate sipper for suspense fallback
const SuspenseFallback = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#1b1d21]">
      <img className="w-[600px] h-[500px]" src={Loader} alt="loading...." />
    </div>
  );
};

root.render(
  <React.StrictMode>
    <URLContextProvider>
      <CredentielContextProvider>
        <CategoryContextProvider>
          <Suspense fallback={<SuspenseFallback />}>
            <App />
          </Suspense>
        </CategoryContextProvider>
      </CredentielContextProvider>
    </URLContextProvider>
  </React.StrictMode>
);
