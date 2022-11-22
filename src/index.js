import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";
import "./index.css";
import CategoryContextProvider from "./context/categorycontext";
import CredentielContextProvider from "./context/CredentielContext";
import URLContextProvider from "./helpers/UrlProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
const App = lazy(() => import('./App'));

// generate sipper for suspense fallback
const SuspenseFallback = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 " role="status">
      <span className="text-3xl">Loading...</span>
    </div>
  );
};

root.render(
  <React.StrictMode>
    <URLContextProvider>
      <CredentielContextProvider>
        <CategoryContextProvider>
          <Suspense fallback = { <SuspenseFallback/> }>
          <App />
          </Suspense>
        </CategoryContextProvider>
      </CredentielContextProvider>
    </URLContextProvider>
  </React.StrictMode>
);
