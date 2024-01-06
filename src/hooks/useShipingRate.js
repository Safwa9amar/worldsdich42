import { useState, useEffect } from "react";
const useShippingRate = () => {
  const [selectedShippingRate, setSelectedShippingRate] = useState(null);
  const [shippingRates, setShippingRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = process.env.REACT_APP_STRIPE_API_KEY;
  const fetchUrl = process.env.REACT_APP_STRIP_API_URL;
  // Function to fetch shipping rates from the Stripe API
  const fetchShippingRates = async () => {
    try {
      // Replace 'YOUR_STRIPE_API_KEY' with your actual Stripe API key
      const response = await fetch(`${fetchUrl}shipping_rates`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      });

      const data = await response.json();

      // Assuming the API response contains an array of shipping rates
      // active shiping rates
      const activeShippingRates = data.data.filter((rate) => rate.active);
      setShippingRates(activeShippingRates);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Function to set the user-selected shipping rate in sessionStorage
  const setSelectedShippingRateObject = (shippingRate) => {
    sessionStorage.setItem(
      "selectedShippingRate",
      JSON.stringify(shippingRate)
    );
    setSelectedShippingRate(shippingRate);
  };

  // Function to clear the user-selected shipping rate from sessionStorage
  const clearSelectedShippingRate = () => {
    sessionStorage.removeItem("selectedShippingRate");
    setSelectedShippingRate(null);
  };

  // Effect to initialize the user-selected shipping rate from sessionStorage on component mount
  useEffect(() => {
    const storedShippingRate = sessionStorage.getItem("selectedShippingRate");
    if (storedShippingRate !== "undefined") {
      setSelectedShippingRate(JSON.parse(storedShippingRate));
    }
  }, []);

  // Effect to fetch shipping rates from the API on component mount
  useEffect(() => {
    fetchShippingRates();
  }, []);

  // Return the state and functions to set/clear the user-selected shipping rate
  // as well as the list of shipping rates from the API
  return {
    selectedShippingRate,
    setSelectedShippingRateObject,
    clearSelectedShippingRate,
    shippingRates,
    loading,
    error,
  };
};

export default useShippingRate;
