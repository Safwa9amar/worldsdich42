import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";
import "./index.css";
import "./loader.css";
import Loader from "./asstes/loader.gif";
import CategoryContextProvider from "./context/categorycontext";
import CredentielContextProvider from "./context/CredentielContext";
import URLContextProvider from "./helpers/UrlProvider";
import ClientStatusContextProvider from "./context/CientStatus";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51NIB1DG5waCNLkzTOjvSqTTba8YBge2kQb5Cbf9k4Am0tufEghZ0Q7MZJ4Aj23Wi3UNzmQOuohpK623yyUZNm4un00yuNmPaIt"
);
const root = ReactDOM.createRoot(document.getElementById("root"));
const App = lazy(() => import("./App"));

// generate sipper for suspense fallback
const SuspenseFallback = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#1b1d21]">
      <img
        className="w-[600px] h-[350px] md:h-[500px]"
        src={Loader}
        alt="loading...."
      />
    </div>
  );
};
const options = {
  mode: "payment",
  amount: 1099,
  currency: "usd",
  // Fully customizable with appearance API.
  appearance: {
    theme: "stripe",
    locale: "auto",

    /*...*/
  },
};

root.render(
  <React.StrictMode>
    <Elements options={options} stripe={stripePromise}>
      <URLContextProvider>
        <ClientStatusContextProvider>
          <CredentielContextProvider>
            <CategoryContextProvider>
              <Suspense fallback={<SuspenseFallback />}>
                <App />
              </Suspense>
            </CategoryContextProvider>
          </CredentielContextProvider>
        </ClientStatusContextProvider>
      </URLContextProvider>
    </Elements>
  </React.StrictMode>
);
