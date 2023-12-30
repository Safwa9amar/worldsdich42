import { useState, useEffect } from "react";

const useShippingRate = () => {
  const [selectedShippingRate, setSelectedShippingRate] = useState(null);
  const [shippingRates, setShippingRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch shipping rates from the Stripe API
  const fetchShippingRates = async () => {
    try {
      // Replace 'YOUR_STRIPE_API_KEY' with your actual Stripe API key
      const response = await fetch(`https://api.stripe.com/v1/shipping_rates`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer sk_test_51NIB1DG5waCNLkzT7xtBN724M9XSxDD83ZktBJT2IXVo3OaP7FKH0mE5TbY2868iFlwG7O0BG5gOGHq3rMol9Emu00lT3iNh8n`,
        },
      });

      const data = await response.json();

      // Assuming the API response contains an array of shipping rates
      setShippingRates(data.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Function to set the user-selected shipping rate in localStorage
  const setSelectedShippingRateObject = (shippingRate) => {
    localStorage.setItem("selectedShippingRate", JSON.stringify(shippingRate));
    setSelectedShippingRate(shippingRate);
  };

  // Function to clear the user-selected shipping rate from localStorage
  const clearSelectedShippingRate = () => {
    localStorage.removeItem("selectedShippingRate");
    setSelectedShippingRate(null);
  };

  // Effect to initialize the user-selected shipping rate from localStorage on component mount
  useEffect(() => {
    const storedShippingRate = localStorage.getItem("selectedShippingRate");
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
