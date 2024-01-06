import React, { createContext, useState, useEffect, useCallback } from "react";

export const AddressContext = createContext();

const AddressContextProvider = ({ children }) => {
  // const Address_SERVER_URI = process.env.REACT_APP_SERVER_URI;
  const stripe_api_url = process.env.REACT_APP_STRIP_API_URL;
  const stripe_key = process.env.REACT_APP_STRIPE_API_KEY;

  const [addresses, setAddresses] = useState(
    JSON.parse(localStorage.getItem("addresses")) || []
  );

  const fetchShippingRates = useCallback(async () => {
    try {
      const response = await fetch(`${stripe_api_url}/shipping_rates`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${stripe_key}`,
        },
      });
      const data = await response.json();
      setAddresses(data);
      localStorage.setItem("addresses", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching shipping rates:", error);
    }
  }, [stripe_api_url, stripe_key]);

  useEffect(() => {
    fetchShippingRates();
  }, [fetchShippingRates]);

  useEffect(() => {
    // Fetch data on DOMContentLoaded event
    document.addEventListener("DOMContentLoaded", fetchShippingRates);
    return () => {
      document.removeEventListener("DOMContentLoaded", fetchShippingRates);
    };
  }, [fetchShippingRates]);

  return (
    <AddressContext.Provider value={addresses}>
      {children}
    </AddressContext.Provider>
  );
};

export default AddressContextProvider;
